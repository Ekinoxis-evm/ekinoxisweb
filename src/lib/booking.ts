/**
 * Free-call booking rules, shared by the form (to draw the slots) and
 * /api/contact (to refuse anything the form would not have offered).
 *
 * Slots are set in Colombia time. Colombia has no daylight saving, so COT is a
 * fixed UTC−5 and a slot is plain arithmetic — no timezone library needed.
 */

export const CALL_MINUTES = 30;
export const COT_OFFSET_HOURS = -5;
/** Start times, in Colombia time: mornings and afternoons, lunch kept free. */
export const SLOT_HOURS_COT = [9, 10, 11, 14, 15, 16, 17];
/** How far ahead the calendar opens, in business days. */
export const BOOKING_DAYS = 10;
/** No booking closer than this, so there is time to prepare. */
export const MIN_NOTICE_HOURS = 12;

export interface BookingDay {
  /** YYYY-MM-DD in Colombia time — a stable key for the day. */
  key: string;
  /** Slot start times as UTC ISO strings. */
  slots: string[];
}

/** UTC instant for `hour`:00 COT on the COT calendar day `y-m-d`. */
function cotToUtc(y: number, m: number, d: number, hour: number): Date {
  return new Date(Date.UTC(y, m, d, hour - COT_OFFSET_HOURS));
}

/** The next BOOKING_DAYS weekdays, each with the slots still far enough ahead. */
export function bookingDays(now: Date = new Date()): BookingDay[] {
  const earliest = now.getTime() + MIN_NOTICE_HOURS * 3600_000;
  // Today's calendar date in Colombia: shift the instant, then read UTC fields.
  const cot = new Date(now.getTime() + COT_OFFSET_HOURS * 3600_000);
  const days: BookingDay[] = [];
  for (let i = 0; days.length < BOOKING_DAYS && i < 30; i++) {
    const day = new Date(Date.UTC(cot.getUTCFullYear(), cot.getUTCMonth(), cot.getUTCDate() + i));
    const dow = day.getUTCDay();
    if (dow === 0 || dow === 6) continue;
    const slots = SLOT_HOURS_COT.map((h) => cotToUtc(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), h))
      .filter((s) => s.getTime() >= earliest)
      .map((s) => s.toISOString());
    if (slots.length) days.push({ key: day.toISOString().slice(0, 10), slots });
  }
  return days;
}

/** True only for a slot the form would offer right now. */
export function isBookableSlot(iso: string, now: Date = new Date()): boolean {
  return bookingDays(now).some((d) => d.slots.includes(iso));
}

/** "Tue, Oct 28 · 3:00 PM" in Colombia time — for emails and Telegram. */
export function formatCot(iso: string, language: 'en' | 'es'): string {
  return new Intl.DateTimeFormat(language === 'es' ? 'es-CO' : 'en-US', {
    timeZone: 'America/Bogota',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}
