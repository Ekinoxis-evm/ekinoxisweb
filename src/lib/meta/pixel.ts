/**
 * Meta pixel (dataset «ekinoxis», business Ekinoxis Labs). The ID is public by design: it ships
 * in every page that loads the pixel. Browser events go through `fbq`; the Purchase is also sent
 * server side by the Stripe webhook (src/lib/meta/capi.ts) with the same event_id, so Meta
 * counts it once.
 */
export const META_PIXEL_ID = '2324952541576934';

type Fbq = (...args: unknown[]) => void;

/**
 * Calls the pixel; if its script has not loaded yet, retries for up to ~5 s (the base code loads
 * after the page is interactive). Blocked by an ad blocker = a silent no-op.
 */
export function fbq(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  let tries = 0;
  const run = () => {
    const f = (window as unknown as { fbq?: Fbq }).fbq;
    if (typeof f === 'function') return f(...args);
    if (++tries < 20) setTimeout(run, 250);
  };
  run();
}
