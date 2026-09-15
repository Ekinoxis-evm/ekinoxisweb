import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { notifyTelegram, sendConfirmationEmail, type LeadNotification } from '@/lib/notify';

/**
 * POST /api/contact — the only way a contact form reaches the database.
 *
 * The browser never writes to `public.leads` directly: the table has RLS on
 * with no policies, so the anon key cannot touch it. Everything is validated
 * here and inserted with the service role.
 *
 * Order matters — the lead is saved first, then we try to notify. A dead
 * Telegram token or a Resend outage must never cost a lead.
 */

export const runtime = 'nodejs';

const TOPICS = ['consultation', 'web', 'app', 'course', 'talk', 'general'] as const;
type Topic = (typeof TOPICS)[number];

const LIMITS = { name: 120, email: 254, whatsapp: 40, company: 160, message: 4000, budget: 60 };

/** In-memory throttle. Per instance, so it is a speed bump, not a wall — but it
 *  stops the obvious case of one bot hammering the form from a single address. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude ceiling; this map is not a database
  return false;
}

function clean(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Try again later.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  // Honeypot: a field hidden from people and irresistible to bots. Answer 200
  // so the bot believes it worked and does not come back to probe.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const topic = (TOPICS as readonly string[]).includes(String(body.topic))
    ? (body.topic as Topic)
    : 'general';

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email does not look right.' }, { status: 400 });
  }

  const language = body.language === 'es' ? 'es' : 'en';
  const row = {
    topic,
    name,
    email,
    whatsapp: clean(body.whatsapp, LIMITS.whatsapp),
    company: clean(body.company, LIMITS.company),
    message,
    budget: clean(body.budget, LIMITS.budget),
    // Taken from the referer, never from the client body — it is attribution
    // data and the browser should not get to write whatever it likes into it.
    source_path: clean(request.headers.get('referer'), 300),
    language,
  };

  const db = createServiceClient();
  const { data, error } = await db.from('leads').insert(row).select('id').single();

  if (error || !data) {
    console.error('[contact] insert failed:', error?.message);
    return NextResponse.json({ error: 'Could not save your message.' }, { status: 500 });
  }

  const lead: LeadNotification = {
    id: data.id,
    topic,
    name,
    email,
    whatsapp: row.whatsapp,
    company: row.company,
    message,
    budget: row.budget,
    sourcePath: row.source_path,
    language,
  };

  // Saved already — from here on, failures are logged and swallowed.
  const [notified] = await Promise.all([
    notifyTelegram(lead),
    sendConfirmationEmail(lead),
  ]);

  if (notified) {
    await db.from('leads').update({ notified_at: new Date().toISOString() }).eq('id', data.id);
  }

  return NextResponse.json({ ok: true });
}
