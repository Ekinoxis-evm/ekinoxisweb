import { createHash } from 'node:crypto';
import { META_PIXEL_ID } from './pixel';

/** Graph API version for the Conversions API; bump when Meta retires it. */
const GRAPH = 'https://graph.facebook.com/v23.0';

const sha = (v: string) => createHash('sha256').update(v.trim().toLowerCase()).digest('hex');

export type MetaPurchase = {
  /** Stripe Checkout Session id: the same event_id the thank-you page sends from the browser. */
  eventId: string;
  value: number;
  currency: string;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  sourceUrl: string;
  contentName: string;
};

/**
 * Sends one Purchase to the Conversions API. A silent no-op until META_CAPI_TOKEN is set in
 * Vercel; never throws (the caller has already saved the enrollment). Only hashed identifiers leave.
 */
export async function sendMetaPurchase(p: MetaPurchase): Promise<boolean> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return false;
  const userData: Record<string, string[]> = {};
  if (p.email) userData.em = [sha(p.email)];
  if (p.phone) {
    const digits = p.phone.replace(/\D/g, '');
    if (digits) userData.ph = [sha(digits)];
  }
  if (p.firstName) userData.fn = [sha(p.firstName)];
  const body = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: p.eventId,
        action_source: 'website',
        event_source_url: p.sourceUrl,
        user_data: userData,
        custom_data: { currency: p.currency.toUpperCase(), value: p.value, content_name: p.contentName },
      },
    ],
  };
  try {
    const res = await fetch(`${GRAPH}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error('[meta capi] purchase rejected', res.status, p.eventId);
    return res.ok;
  } catch {
    console.error('[meta capi] purchase not sent', p.eventId);
    return false;
  }
}
