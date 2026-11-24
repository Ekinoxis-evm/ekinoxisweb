'use client';

import { useEffect, useState } from 'react';

import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBookCall } from '@/components/BookCall';
import { workshops, type CourseStatus, type CourseLevel } from '@/lib/courses';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { ArrowRight, Hand, Radio, Wrench } from 'lucide-react';
import CourseFacts from '@/components/courses/CourseFacts';
import PanelBackdrop from '@/components/ui/PanelBackdrop';

const coursesContent = {
  en: {
    title: 'WORKSHOPS',
    description: 'Live, in small groups. You leave having done it yourself, not with a certificate for watching videos.',
    status: { open: 'Enrolling now', waitlist: 'Waitlist', coming_soon: 'Coming soon' } as Record<CourseStatus, string>,
    level: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' } as Record<CourseLevel, string>,
    priceTbd: 'Price TBA',
    open: 'See the workshop',
    more: 'See details',
    others: 'Coming next',
    principles: {
      heading: 'How we teach',
      items: [
        { icon: 'hands', title: 'You do it, you don’t watch', desc: 'Every block ends with something you did yourself: a purchase, a contract, a connected store.' },
        { icon: 'live', title: 'Live, with questions', desc: 'Small groups, questions answered in the moment.' },
        { icon: 'tools', title: 'Real tools', desc: 'The ones we use with clients: OKX, Uniswap, Stripe, Shopify, Next.js and Claude.' },
      ],
    },
    company: {
      label: 'For companies',
      title: 'Train your whole team, on your own business.',
      text: 'Any workshop as a private cohort, in English or Spanish, with your data and your goals.',
      cta: 'Ask about a private cohort',
    },
  },
  es: {
    title: 'TALLERES',
    description: 'En vivo y en grupos pequeños. Sales habiéndolo hecho tú, no con un certificado por ver videos.',
    status: { open: 'Inscripciones abiertas', waitlist: 'Lista de espera', coming_soon: 'Muy pronto' } as Record<CourseStatus, string>,
    level: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' } as Record<CourseLevel, string>,
    priceTbd: 'Precio por anunciar',
    open: 'Ver el taller',
    more: 'Ver detalles',
    others: 'Lo que viene',
    principles: {
      heading: 'Cómo enseñamos',
      items: [
        { icon: 'hands', title: 'Lo haces tú, no lo miras', desc: 'Cada bloque termina con algo hecho por ti: una compra, un contrato, una tienda conectada.' },
        { icon: 'live', title: 'En vivo, con preguntas', desc: 'Grupos pequeños y preguntas respondidas al momento.' },
        { icon: 'tools', title: 'Herramientas reales', desc: 'Las que usamos con clientes: OKX, Uniswap, Stripe, Shopify, Next.js y Claude.' },
      ],
    },
    company: {
      label: 'Para empresas',
      title: 'Entrena a todo tu equipo, sobre tu propio negocio.',
      text: 'Cualquier taller como cohorte privada, en inglés o español, con tus datos y tus metas.',
      cta: 'Pregunta por una cohorte privada',
    },
  },
};

/** Shows the build-time price, then the price for the visitor's date once mounted (no hydration mismatch). */
function LivePrice({ initial, get }: { initial: string; get: () => string }) {
  const [price, setPrice] = useState(initial);
  useEffect(() => setPrice(get()), [get]);
  return <>{price}</>;
}

const PRINCIPLE_ICONS = { hands: Hand, live: Radio, tools: Wrench } as const;

type Workshop = (typeof workshops)[number];

/** The workshop's tools as full-colour logo tiles (wordmarks get a wider tile). */
function Tools({ course, big = false }: { course: Workshop; big?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={course.tools.map((x) => x.name).join(', ')}>
      {course.tools.map((tool) => (
        <li key={tool.name} title={tool.name} className={`relative bg-surface-container-high ${big ? 'h-16 w-28' : 'h-12 w-24'}`}>
          <Image src={tool.logo} alt="" fill className="object-contain p-3" sizes="112px" />
        </li>
      ))}
    </ul>
  );
}

function Price({ course, tbd }: { course: Workshop; tbd: string }) {
  if ('livePrice' in course && course.livePrice) return <LivePrice initial={course.price ?? ''} get={course.livePrice} />;
  return <>{course.price ?? <span className="font-body text-base font-normal text-on-surface-variant">{tbd}</span>}</>;
}

function Status({ status, label }: { status: CourseStatus; label: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-body text-[15px] font-bold ${status === 'open' ? 'text-tertiary-dim' : status === 'waitlist' ? 'text-primary' : 'text-on-surface-variant'}`}>
      <span aria-hidden className={`h-2 w-2 rounded-full ${status === 'open' ? 'bg-tertiary-dim' : status === 'waitlist' ? 'bg-primary' : 'bg-outline'}`} />
      {label}
    </span>
  );
}

export default function CoursesPage() {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const t = coursesContent[language];
  const featured = workshops.find((w) => w.status === 'open') ?? null;
  const rest = workshops.filter((w) => w !== featured);
  const href = (w: Workshop) => ('href' in w ? w.href : `/workshops/${w.slug}`);

  return (
    <AnimatedBackground variant="ambient" banner="/media/banners/workshops.webp">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <header className="rise mb-10 md:mb-16">
            <h1 className="mb-6 font-headline text-5xl font-bold leading-[0.9] tracking-tighter text-on-surface sm:text-6xl md:text-8xl">{t.title}</h1>
            <p className="max-w-2xl font-body text-lg leading-relaxed text-on-surface md:text-xl">{t.description}</p>
          </header>

          {/* The open workshop, featured; the rest and the company offer in a row below. */}
          {featured && (
            <Link href={href(featured)} className="rise group block">
              <article className="grid grid-cols-1 gap-8 border border-tertiary-dim/40 bg-surface-container-low p-6 transition-colors duration-300 hover:bg-surface-container md:p-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
                <div className="flex flex-col items-start gap-5">
                  <Status status={featured.status} label={t.status[featured.status]} />
                  <h2 className="font-headline text-4xl font-bold leading-[0.95] tracking-tighter text-on-surface md:text-6xl">{featured.title[language]}</h2>
                  <p className="max-w-xl font-body text-lg leading-relaxed text-on-surface">{featured.tagline[language]}</p>
                  <CourseFacts course={featured} level={t.level[featured.level]} />
                </div>
                <div className="flex flex-col justify-between gap-8">
                  <Tools course={featured} big />
                  <div className="flex flex-col gap-4">
                    <span className="font-headline text-5xl font-bold tracking-tighter text-on-surface [font-variant-numeric:tabular-nums]">
                      <Price course={featured} tbd={t.priceTbd} />
                    </span>
                    <span className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-primary px-8 font-headline text-sm font-bold text-on-primary transition-colors duration-150 group-hover:bg-primary-dim sm:w-auto sm:self-start">
                      {t.open}
                      <ArrowRight size={18} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          <h2 className="mb-6 mt-16 font-headline text-2xl font-bold tracking-tight text-on-surface md:mt-24 md:text-3xl">{t.others}</h2>
          <div className="grid grid-cols-1 gap-px bg-primary/10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((course) => (
              <Link key={course.slug} href={href(course)} className="group block">
                <article className="flex h-full flex-col gap-5 bg-surface-container-low p-6 transition-colors duration-300 hover:bg-surface-container md:p-8">
                  <Status status={course.status} label={t.status[course.status]} />
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface transition-colors duration-200 group-hover:text-primary md:text-3xl">{course.title[language]}</h3>
                  <p className="font-body text-base leading-relaxed text-on-surface-variant">{course.tagline[language]}</p>
                  <Tools course={course} />
                  <CourseFacts course={course} level={t.level[course.level]} />
                  <span className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-headline text-2xl font-bold text-on-surface">
                      <Price course={course} tbd={t.priceTbd} />
                    </span>
                    <span className="inline-flex items-center gap-2 font-body text-[15px] font-bold text-primary">
                      {t.more}
                      <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </span>
                </article>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => bookCall('course', { who: 'team' })}
              className="group relative flex min-h-[320px] flex-col justify-end gap-4 overflow-hidden bg-surface-container-low p-6 text-left transition-colors duration-300 hover:bg-surface-container focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary md:p-8"
            >
              <PanelBackdrop name="fog" />
              <span className="relative font-body text-[15px] font-bold text-secondary">{t.company.label}</span>
              <span className="relative font-headline text-3xl font-bold leading-tight tracking-tighter text-on-surface transition-colors group-hover:text-primary">{t.company.title}</span>
              <span className="relative max-w-sm font-body text-base leading-relaxed text-on-surface-variant">{t.company.text}</span>
              <span className="relative inline-flex items-center gap-2 font-body text-[15px] font-bold text-primary">
                {t.company.cta}
                <ArrowRight size={16} aria-hidden />
              </span>
            </button>
          </div>

          {/* How we teach */}
          <section aria-labelledby="teach-heading" className="mt-16 md:mt-24">
            <h2 id="teach-heading" className="mb-6 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{t.principles.heading}</h2>
            <ul className="grid grid-cols-1 gap-px bg-primary/10 md:grid-cols-3">
              {t.principles.items.map((p) => {
                const Icon = PRINCIPLE_ICONS[p.icon as keyof typeof PRINCIPLE_ICONS];
                return (
                  <li key={p.title} className="flex gap-4 bg-surface-container-low p-6 md:p-8">
                    <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center bg-surface-container-high text-primary">
                      <Icon size={22} />
                    </span>
                    <span>
                      <span className="block font-headline text-lg font-bold text-on-surface">{p.title}</span>
                      <span className="mt-1 block font-body text-base leading-relaxed text-on-surface-variant">{p.desc}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

        </div>
      </div>
    </AnimatedBackground>
  );
}
