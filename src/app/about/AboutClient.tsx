'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Boxes, Briefcase, FlaskConical, GraduationCap, MapPin, Users, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import BookCallPanel from '@/components/BookCallPanel';
import { PlacesBand } from '@/components/LogoBands';
import { staggerContainer, fadeInUp, EASE_SETTLE } from '@/lib/animations';
import type { Hacker } from '@/lib/supabase/types';

/** Products, clients, teaching, community, research — same order as the pillars copy. */
/** Laptop columns for the team row: every photo plus the closing link tile, one row, no empty cells. */
const TEAM_COLS: Record<number, string> = {
  4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 7: 'lg:grid-cols-7', 8: 'lg:grid-cols-8',
};

const PILLAR_ICONS: LucideIcon[] = [Boxes, Briefcase, GraduationCap, Users, FlaskConical];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: EASE_SETTLE },
} as const;

/** A photo that settles into place as it scrolls in. */
function Photo({ src, className = '' }: { src: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.4, ease: EASE_SETTLE }}
      className={`relative overflow-hidden ${className}`}
    >
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
    </motion.div>
  );
}

function SectionHead({ label, title, body }: { label: string; title: string; body?: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">{label}</p>
      <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface">{title}</h2>
      {body && <p className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed mt-4">{body}</p>}
    </div>
  );
}

export default function AboutClient({ hackers }: { hackers: Hacker[] }) {
  const { language } = useLanguage();
  const c = content[language];
  const t = c.about;
  // Up to 7 faces + the link tile; an odd count would leave a hole in the 2-up phone grid
  let team = hackers.filter((h) => h.image_url).slice(0, 7);
  if (team.length % 2 === 0 && team.length > 1) team = team.slice(0, -1);

  return (
    <AnimatedBackground variant="ambient" banner="/media/banners/about.webp">
      <div className="py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-20 md:mb-32 max-w-3xl">
            <motion.p variants={fadeInUp} className="font-mono text-[12px] text-primary tracking-widest uppercase mb-6">
              {t.eyebrow}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6">
              {t.title}
            </motion.h1>
            <motion.p variants={fadeInUp} className="font-headline text-xl md:text-2xl font-bold tracking-tight text-primary mb-6">
              {t.lead}
            </motion.p>
            <motion.p variants={fadeInUp} className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {t.description}
            </motion.p>
          </motion.div>

          {/* The name — the equinox */}
          <motion.section {...reveal} className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10">
            <div className="bg-surface-container-low p-8 md:p-12 flex flex-col justify-center">
              <SectionHead label={t.nameLabel} title={t.nameTitle} />
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">{c.brand.markMeaning}</p>
            </div>
            <Photo src="/media/about/pacific.webp" className="min-h-[280px] lg:min-h-[460px]" />
          </motion.section>

          {/* Where we come from */}
          <motion.section {...reveal} className="mt-px grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10">
            <Photo src="/media/about/lab.webp" className="min-h-[280px] lg:min-h-[460px] order-last lg:order-first" />
            <div className="bg-surface-container-low p-8 md:p-12 flex flex-col justify-center">
              <SectionHead label={t.originLabel} title={t.originTitle} body={t.originBody} />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10">
                {t.places.map((p) => (
                  <li key={p.city} className="bg-surface-container-lowest/70 p-5">
                    <MapPin size={18} className="text-primary mb-3" />
                    <p className="font-headline text-2xl font-bold tracking-tighter text-on-surface">{p.city}</p>
                    <p className="font-body text-sm text-on-surface-variant">{p.region}</p>
                    <p className="font-mono text-[11px] text-outline uppercase tracking-widest mt-2">{p.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* What we do */}
          <section className="mt-24 md:mt-32">
            <motion.div {...reveal}>
              <SectionHead label={t.doLabel} title={t.doTitle} />
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-primary/10"
            >
              {t.pillars.map((p, i) => {
                const Icon = PILLAR_ICONS[i] ?? Boxes;
                return (
                  <motion.div key={p.title} variants={fadeInUp}>
                    <Link
                      href={p.href}
                      className="group relative flex h-full flex-col bg-surface-container-low p-6 md:p-8 transition-colors duration-500 hover:bg-surface-container focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                    >
                      <div className="flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/5 text-primary mb-6 transition-shadow duration-500 group-hover:shadow-[0_0_20px_rgba(143,245,255,0.25)]">
                        <Icon size={22} strokeWidth={1.75} />
                      </div>
                      <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors mb-2">{p.title}</h3>
                      <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">{p.desc}</p>
                      <span className="mt-auto inline-flex items-center gap-2 font-mono text-[12px] text-primary uppercase tracking-widest">
                        {p.cta}
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* Culture — merged in from the old /culture page */}
          <section id="culture" className="mt-24 md:mt-32 scroll-mt-24">
            <motion.div {...reveal} className="relative overflow-hidden min-h-[320px] md:min-h-[420px] flex items-end">
              <Image src="/media/about/community.webp" alt="" fill sizes="100vw" className="object-cover object-[60%_50%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
              <div className="relative p-8 md:p-12">
                <SectionHead label={t.cultureLabel} title={t.cultureTitle} body={t.cultureBody} />
              </div>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10"
            >
              {c.culture.values.map((v, i) => (
                <motion.div key={v.title} variants={fadeInUp} className="group relative bg-surface-container-low p-6 md:p-10 transition-colors duration-500 hover:bg-surface-container">
                  <span className="font-mono text-[12px] text-primary tracking-widest block mb-4">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors mb-3">{v.title}</h3>
                  <p className="font-body text-[15px] text-on-surface leading-relaxed mb-6">{v.description}</p>
                  <ul className="space-y-2 border-l-2 border-primary/20 pl-4">
                    {v.details.map((d) => (
                      <li key={d} className="font-body text-sm text-on-surface-variant leading-relaxed">{d}</li>
                    ))}
                  </ul>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* The people */}
          {team.length > 0 && (
            <motion.section {...reveal} className="mt-24 md:mt-32">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">{t.teamLabel}</p>
                  <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface">{t.teamTitle}</h2>
                </div>
                <Link href="/hackers" className="inline-flex items-center gap-2 font-mono text-[12px] text-primary uppercase tracking-widest hover:text-primary-dim min-h-[44px]">
                  {t.teamCta} <ArrowRight size={14} />
                </Link>
              </div>
              <ul className={`grid grid-cols-2 sm:grid-cols-4 ${TEAM_COLS[team.length + 1] ?? 'lg:grid-cols-8'} gap-px bg-primary/10`}>
                {team.map((h) => (
                  <li key={h.id}>
                    <Link href="/hackers" className="group block bg-surface-container-low">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={h.image_url}
                          alt={h.name}
                          fill
                          sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 50vw"
                          unoptimized={h.image_url.startsWith('http')}
                          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                        />
                      </div>
                      <p className="px-3 py-3 font-label text-[13px] font-semibold text-on-surface-variant group-hover:text-primary transition-colors truncate">{h.name}</p>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/hackers" className="group flex h-full min-h-[160px] flex-col justify-between bg-surface-container-high p-4 transition-colors hover:bg-surface-container-highest">
                    <span className="font-mono text-[12px] text-outline uppercase tracking-widest">{hackers.length > team.length ? `+${hackers.length - team.length}` : ''}</span>
                    <span className="inline-flex items-center gap-2 font-headline text-[15px] font-bold leading-tight text-primary">
                      {t.teamCta} <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.section>
          )}
        </div>
      </div>

      {/* Where we have taught */}
      <PlacesBand />

      <div className="px-6 pb-12 md:pb-24">
        <div className="max-w-screen-2xl mx-auto">
          <BookCallPanel
            topic="consultation"
            copy={{
              en: { title: content.en.about.ctaTitle, text: content.en.about.ctaText },
              es: { title: content.es.about.ctaTitle, text: content.es.about.ctaText },
            }}
          />
        </div>
      </div>
    </AnimatedBackground>
  );
}
