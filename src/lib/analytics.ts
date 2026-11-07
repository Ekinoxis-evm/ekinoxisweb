'use client';

/**
 * Product analytics (PostHog) behind one small API, so components never
 * import the SDK directly and everything is a no-op when the key is missing
 * (local dev, previews without env, a blocked script).
 *
 * Events are the booking funnel, in order:
 *   book_call_open       the popup opened            { topic }
 *   book_call_service    a service was picked        { topic }   (master form only)
 *   book_call_qualified  the questions were answered { topic }
 *   lead_sent            the form was submitted      { topic, slot, lead_id }
 *   book_call_close      the popup was closed        { topic }
 *
 * Free resources (/es/recursos/*):
 *   resource_prompt_copy   the main prompt was copied     { resource }
 *   resource_snippet_copy  an example prompt was copied   { resource, tool }
 *   resource_source_click  a source / Instagram link      { resource, tool, url }
 *
 * Names and property keys are stable; dashboards in PostHog depend on them.
 */

import posthog from 'posthog-js';

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '';
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
/** Same-origin path the SDK talks to; next.config.js forwards it to PostHog, past ad blockers. */
export const INGEST_PATH = '/ingest';

export const analyticsEnabled = () => Boolean(POSTHOG_KEY) && typeof window !== 'undefined';

type Props = Record<string, string | number | boolean | null | undefined>;

export function track(event: string, properties?: Props) {
  if (!analyticsEnabled()) return;
  try {
    posthog.capture(event, properties);
  } catch {
    /* analytics must never break the page */
  }
}

/** Link to this visitor's session replay, for the lead alert. Empty when recording is off. */
export function replayUrl(): string {
  if (!analyticsEnabled()) return '';
  try {
    return posthog.get_session_replay_url({ withTimestamp: true }) ?? '';
  } catch {
    return '';
  }
}

/**
 * Tie the anonymous session to the lead that was just saved, so a row in
 * /admin/leads maps to one person in PostHog. The lead id is our own uuid —
 * never the email or phone.
 */
export function identifyLead(leadId: string, props?: Props) {
  if (!analyticsEnabled()) return;
  try {
    posthog.identify(leadId, props);
  } catch {
    /* ignore */
  }
}
