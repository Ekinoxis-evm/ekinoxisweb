import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { notifyTelegram, sendConfirmationEmail, sendBookingToTeam, type LeadNotification } from '@/lib/notify';
import { isBookableSlot } from '@/lib/booking';
import { MULTI_KEYS, OPTIONS, TOPIC_KEYS, clampHours, detailLabel, estimateUsd, type DetailKey, type LeadDetails } from '@/lib/leadForms';

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

/**
 * Only a production deployment may write to `public.leads`. Local dev (`next dev`
 * after `vercel env pull`) and preview deployments carry the same service-role
 * key as production, so without this guard every test booking lands in the real
 * table (that is how the localhost lead of 2026-10-25 got there).
 *
 * - VERCEL_ENV is set by Vercel: 'production' | 'preview' | 'development'.
 *   It is unset under a plain `next dev`.
 * - LEADS_WRITE_ENABLED=true is the explicit opt-in for a separate dev database.
 */
function leadsWritesEnabled(): boolean {
  return process.env.VERCEL_ENV === 'production' || process.env.LEADS_WRITE_ENABLED === 'true';
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]', '::1']);

/** True when the form was submitted from a local dev server (Origin or Referer). */
function fromLocalhost(request: NextRequest): boolean {
  for (const h of [request.headers.get('origin'), request.headers.get('referer')]) {
    if (!h) continue;
    try {
      if (LOCAL_HOSTS.has(new URL(h).hostname)) return true;
    } catch {
      /* not a URL — ignore */
    }
  }
  return false;
}

function clean(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, max);
}

/**
 * The qualifying answers. Only the keys this topic asks are kept, a choice
 * must be one of the options the form offers, hours are clamped and the
 * estimate is recomputed here — the browser's number is never trusted.
 */
function cleanDetails(raw: unknown, topic: Topic): LeadDetails {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const input = raw as Record<string, unknown>;
  const out: LeadDetails = {};
  for (const key of TOPIC_KEYS[topic]) {
    const v = input[key];
    if (v === undefined || v === null || v === '') continue;
    const options = OPTIONS[key as DetailKey];
    if (options && MULTI_KEYS.includes(key)) {
      const picked = (Array.isArray(v) ? v : [v]).map(String).filter((x) => options.some((o) => o.value === x));
      if (picked.length) out[key] = Array.from(new Set(picked)).slice(0, options.length);
    } else if (options) {
      if (options.some((o) => o.value === String(v))) out[key] = String(v);
    } else if (key === 'hours') {
      const n = Number(v);
      if (Number.isFinite(n)) out.hours = clampHours(n);
    } else if (key === 'organization') {
      const t = clean(v, 160);
      if (t) out.organization = t;
    }
  }
  // The visitor's PostHog session replay, sent by the form; only a PostHog URL is kept.
  const replay = clean(input.replay_url, 400);
  if (replay && /^https:\/\/(us|eu)\.posthog\.com\//.test(replay)) out.replay = replay;
  if (out.hours !== undefined) out.estimate_usd = estimateUsd(Number(out.hours));
  // Hours only make sense for the hourly format
  if (topic === 'consultation' && out.format && out.format !== 'hourly') {
    delete out.hours;
    delete out.estimate_usd;
  }
  return out;
}

/** The free-text budget band the admin list and Telegram already print. */
function budgetFrom(details: LeadDetails, topic: Topic): string | null {
  if (topic === 'consultation' && details.estimate_usd !== undefined) {
    return `$${details.estimate_usd} est. · ${details.hours}h`;
  }
  if (topic === 'app' && details.budget_band) return detailLabel('budget_band', details.budget_band, 'en');
  return null;
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
  // The form no longer asks for a message — it books a call. leads.message is
  // NOT NULL, so a lead without one records what they asked for.
  const message =
    clean(body.message, LIMITS.message) ?? (body.language === 'es' ? 'Pidió una llamada gratis.' : 'Requested a free call.');

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  // A booked slot must be one the form offers right now — never a time the
  // browser made up, a weekend, or one already in the past.
  const meetingAt = typeof body.meeting_at === 'string' && body.meeting_at ? body.meeting_at : null;
  if (meetingAt && !isBookableSlot(meetingAt)) {
    return NextResponse.json({ error: 'That time is no longer available. Pick another.' }, { status: 409 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email does not look right.' }, { status: 400 });
  }

  const language = body.language === 'es' ? 'es' : 'en';
  const details = cleanDetails({ ...(body.details as object | null ?? {}), replay_url: body.replay_url }, topic);
  const row = {
    topic,
    name,
    email,
    whatsapp: clean(body.whatsapp, LIMITS.whatsapp),
    company: clean(body.company, LIMITS.company),
    message,
    budget: budgetFrom(details, topic) ?? clean(body.budget, LIMITS.budget),
    // Taken from the referer, never from the client body — it is attribution
    // data and the browser should not get to write whatever it likes into it.
    source_path: clean(request.headers.get('referer'), 300),
    language,
    meeting_at: meetingAt,
  };

  // Dev / preview / localhost: validate as usual, but never touch the production
  // table or ping Telegram. The form still sees a success so it can be tested.
  if (!leadsWritesEnabled() || fromLocalhost(request)) {
    console.info('[contact] dry run, lead not saved:', { env: process.env.VERCEL_ENV ?? 'local', topic, language, source_path: row.source_path });
    return NextResponse.json({ ok: true, dryRun: true });
  }

  const db = createServiceClient();
  let { data, error } = await db.from('leads').insert({ ...row, details }).select('id').single();
  // The details column arrives with the 20261101130000 migration. Until it is
  // applied, Postgres (42703) or the PostgREST cache (PGRST204) rejects the
  // column — save the lead without it rather than lose it.
  if (error && (error.code === '42703' || error.code === 'PGRST204')) {
    console.error('[contact] leads.details missing — run supabase/migrations/20261101130000_leads_details.sql');
    ({ data, error } = await db.from('leads').insert(row).select('id').single());
  }

  // 23505 = the unique index on meeting_at: someone booked this slot a moment ago
  if (error?.code === '23505') {
    return NextResponse.json(
      { error: language === 'es' ? 'Alguien acaba de tomar ese horario. Elige otro.' : 'Someone just took that time. Pick another.' },
      { status: 409 },
    );
  }
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
    meetingAt,
    details,
  };

  // Saved already — from here on, failures are logged and swallowed.
  const [notified] = await Promise.all([
    notifyTelegram(lead),
    sendConfirmationEmail(lead),
    sendBookingToTeam(lead),
  ]);

  if (notified) {
    await db.from('leads').update({ notified_at: new Date().toISOString() }).eq('id', data.id);
  }

  return NextResponse.json({ ok: true, id: data.id });
}
