import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ArrowLeft, Banknote, CalendarDays, CalendarPlus, Clock, Download, Hourglass, Languages, MonitorSmartphone, Video } from 'lucide-react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import LocalizedLink from '@/components/LocalizedLink';
import ScanBadge from '@/components/ui/ScanBadge';
import { langOf } from '@/lib/i18n';
import { ACCIONES } from '@/lib/recursos';
import { ICS_PATH, PREP_PAGE as COPY, PREP_PATH, PREP_STEPS, SAFETY, SESSION, sessionGoogleCalendarUrl, type PrepStep } from '@/lib/acciones/onboarding';


// For buyers, linked from the onboarding email and /gracias: like /gracias, kept out of search.
export const metadata: Metadata = {
  title: COPY.metaTitle,
  alternates: { canonical: `/es${PREP_PATH}` },
  robots: { index: false, follow: false },
};

const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const FACT_ICONS = { date: CalendarDays, time: Clock, length: Hourglass, place: Video, language: Languages } as const;
const ICONS: Partial<Record<PrepStep['id'], typeof Banknote>> = { cop: Banknote, ai: MonitorSmartphone };

function StepMark({ step }: { step: PrepStep }) {
  if (step.logos.length) {
    return (
      <div className="flex shrink-0 gap-px">
        {step.logos.map((l) => (
          // eslint-disable-next-line @next/next/no-img-element -- small local SVG marks; next/image adds nothing here
          <span key={l.src} className="flex h-12 min-w-12 items-center justify-center bg-surface-container-high px-3">
            <img src={l.src} alt="" className="h-6 w-auto max-w-20 object-contain" />
          </span>
        ))}
      </div>
    );
  }
  const Icon = ICONS[step.id] ?? Banknote;
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-surface-container-high text-on-surface">
      <Icon size={22} aria-hidden />
    </span>
  );
}

/** Spanish only, like the workshop page: the bare (English) address sends visitors to /es. */
export default function Page({ params }: { params: { lang: string } }) {
  if (langOf(params) !== 'es') redirect(`/es${PREP_PATH}`);

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen px-4 py-24 sm:px-6 md:py-32">
        <div className="rise mx-auto flex max-w-3xl flex-col items-start">
          <ScanBadge variant="primary">{COPY.badge}</ScanBadge>
          <h1 className="mt-6 font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface md:text-5xl">{COPY.title}</h1>

          <ul className="mt-8 flex flex-col gap-3">
            {SESSION.facts.map((f) => {
              const Icon = FACT_ICONS[f.icon as keyof typeof FACT_ICONS];
              return (
                <li key={f.icon} className="flex items-center gap-3 font-body text-lg text-on-surface">
                  <Icon size={20} aria-hidden className="shrink-0 text-primary" />
                  <span className="sr-only">{f.label}: </span>
                  {f.text}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 font-body text-base text-on-surface-variant">{SESSION.linkPending}</p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={sessionGoogleCalendarUrl(null)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-11 w-full items-center justify-center gap-2 bg-primary px-6 py-3 font-headline text-sm font-bold text-on-primary transition-colors duration-150 hover:bg-primary-dim sm:w-auto ${focus}`}
            >
              <CalendarPlus size={16} aria-hidden />
              {COPY.calendar}
            </a>
            <a
              href={ICS_PATH}
              download="taller-acciones-tokenizadas.ics"
              className={`inline-flex min-h-11 w-full items-center justify-center gap-2 border border-outline-variant px-6 py-3 font-headline text-sm font-bold text-on-surface-variant transition-colors duration-150 hover:border-on-surface hover:text-on-surface sm:w-auto ${focus}`}
            >
              <Download size={16} aria-hidden />
              {COPY.ics}
            </a>
          </div>

          <p className="mt-12 max-w-xl font-body text-lg leading-relaxed text-on-surface-variant">{COPY.lead}</p>

          <ol className="mt-6 grid w-full gap-px bg-primary/10">
            {PREP_STEPS.map((step) => (
              <li key={step.id} className="flex gap-4 bg-surface-container-low p-6 sm:gap-6 md:p-8">
                <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start">
                  <StepMark step={step} />
                  <div className="min-w-0">
                    <h2 className="font-headline text-lg font-bold leading-tight text-on-surface">{step.title}</h2>
                    <p className="mt-2 font-body text-base leading-relaxed text-on-surface-variant">{step.text}</p>
                    {step.link && (
                      <a
                        href={step.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-1 inline-flex min-h-11 items-center font-body text-base text-on-surface underline decoration-outline underline-offset-4 transition-colors duration-150 hover:decoration-on-surface ${focus}`}
                      >
                        {step.link.label}
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 border-l-2 border-outline-variant pl-4 font-body text-base leading-relaxed text-on-surface">{SAFETY.keys}</p>
          <p className="mt-4 font-body text-base text-on-surface-variant">{SAFETY.advice}</p>

          <LocalizedLink
            href={ACCIONES.path}
            className={`mt-8 inline-flex min-h-11 items-center gap-2 font-body text-base text-on-surface-variant underline decoration-outline underline-offset-4 transition-colors duration-150 hover:text-on-surface ${focus}`}
          >
            <ArrowLeft size={14} aria-hidden />
            {COPY.back}
          </LocalizedLink>
        </div>
      </div>
    </AnimatedBackground>
  );
}
