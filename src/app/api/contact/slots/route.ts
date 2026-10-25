import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { bookingDays } from '@/lib/booking';

/**
 * GET /api/contact/slots — which offered slots are already taken.
 *
 * Returns times only, never who booked them. Read with the service role because
 * `public.leads` has RLS on with no policies (the anon key sees nothing).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const days = bookingDays();
  const first = days[0]?.slots[0];
  const last = days[days.length - 1]?.slots.at(-1);
  if (!first || !last) return NextResponse.json({ taken: [] });

  const db = createServiceClient();
  const { data } = await db
    .from('leads')
    .select('meeting_at')
    .gte('meeting_at', first)
    .lte('meeting_at', last);

  const taken = (data ?? []).map((r) => new Date(r.meeting_at as string).toISOString());
  return NextResponse.json({ taken }, { headers: { 'Cache-Control': 'no-store' } });
}
