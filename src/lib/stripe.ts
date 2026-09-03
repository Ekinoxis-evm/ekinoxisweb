import Stripe from 'stripe';

let cached: Stripe | null = null;

/** Server-only Stripe client. Throws if STRIPE_SECRET_KEY is missing. */
export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  cached = new Stripe(key, { apiVersion: '2026-08-27.basil' as Stripe.LatestApiVersion });
  return cached;
}

/** Public site origin used for Checkout redirect URLs. */
export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ekinoxis.xyz').replace(/\/$/, '');
}
