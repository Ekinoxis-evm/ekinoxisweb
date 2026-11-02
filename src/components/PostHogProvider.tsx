'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { INGEST_PATH, POSTHOG_HOST, POSTHOG_KEY } from '@/lib/analytics';

/**
 * Starts PostHog once per page load and records a pageview on every App Router
 * navigation (the SDK's automatic pageview only fires on full loads).
 *
 * Session replay masks every input: the booking form holds names, emails and
 * phones, and none of that may land in a recording. Admin pages are not tracked.
 */
export default function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY || pathname?.startsWith('/admin')) return;
    if (posthog.__loaded) return;
    posthog.init(POSTHOG_KEY, {
      api_host: INGEST_PATH,
      ui_host: POSTHOG_HOST.replace('.i.posthog.com', '.posthog.com'),
      person_profiles: 'identified_only',
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-ph-mask]',
      },
    });
  }, [pathname]);

  useEffect(() => {
    if (!POSTHOG_KEY || !posthog.__loaded || !pathname || pathname.startsWith('/admin')) return;
    const query = searchParams?.toString();
    posthog.capture('$pageview', { $current_url: window.origin + pathname + (query ? `?${query}` : '') });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
