import { buildSessionIcs } from '@/lib/acciones/onboarding';

/** The workshop session as a calendar file; the same event (same UID) as the one in the onboarding email. */
export function GET() {
  return new Response(buildSessionIcs(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="taller-acciones-tokenizadas.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
