'use client';

import { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import LocalizedLink from '@/components/LocalizedLink';
import ScanBadge from '@/components/ui/ScanBadge';
import { track } from '@/lib/analytics';
import { ACCIONES as R } from '@/lib/recursos';
import { PREP_PAGE, PREP_PATH } from '@/lib/acciones/onboarding';

/** Where the Stripe Payment Link sends the buyer. The receipt and the record live in Stripe. */
export default function GraciasClient() {
  const t = R.thanks;
  // session_id only marks that Stripe sent the visitor here; it is not proof of payment (no webhook yet).
  useEffect(() => {
    track('checkout_success', { resource: R.slug, from_stripe: new URLSearchParams(window.location.search).has('session_id') });
  }, []);
  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen px-4 py-24 sm:px-6 md:py-32">
        <div className="rise mx-auto flex max-w-2xl flex-col items-start border border-tertiary-dim bg-surface-container-low p-6 md:p-10">
          <ScanBadge variant="tertiary">{R.session.line(R.session.date, R.session.time)}</ScanBadge>
          <h1 className="mt-6 font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface md:text-5xl">{t.title}</h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-on-surface-variant">{t.body}</p>
          <p className="mt-6 border-l-2 border-outline-variant pl-4 font-body text-base leading-relaxed text-on-surface">{R.custody}</p>
          <p className="mt-4 font-body text-[15px] text-on-surface-variant">{R.disclaimer}</p>
          <LocalizedLink
            href={PREP_PATH}
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 font-body text-[15px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-150 hover:decoration-primary"
          >
            {PREP_PAGE.fromThanks}
            <ArrowRight size={14} aria-hidden />
          </LocalizedLink>
          <LocalizedLink
            href={R.path}
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 font-body text-[15px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-150 hover:decoration-primary"
          >
            <ArrowLeft size={14} aria-hidden />
            {t.back}
          </LocalizedLink>
        </div>
      </div>
    </AnimatedBackground>
  );
}
