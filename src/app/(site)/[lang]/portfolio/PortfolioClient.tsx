'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import PanelBackdrop from '@/components/ui/PanelBackdrop';
import ScanBadge from '@/components/ui/ScanBadge';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ClientCard from '@/components/portfolio/ClientCard';
import { useBookCall } from '@/components/BookCall';
import { EASE_SETTLE, fadeInUp, staggerContainer } from '@/lib/animations';
import { PHASES, phaseForStatus, type PhaseKey } from '@/lib/portfolio';
import type { ProductWithRelations } from '@/lib/supabase/types';

interface Props {
  products: ProductWithRelations[]
}

/** Counts up from 0 when it scrolls into view; shows the final number at once under reduced motion. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) { setN(value); return; }
    if (!inView) return;
    const from: number = 0;
    const controls = animate(from, value, {
      duration: 1.2,
      ease: [...EASE_SETTLE] as [number, number, number, number],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return <span ref={ref}>{String(n).padStart(2, '0')}</span>;
}

const PHASE_RANK: Record<PhaseKey, number> = { live: 3, beta: 2, alpha: 1, idea: 0 };

// Static class maps so Tailwind sees every class (no string-built names).
const LG_SPAN = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-1'];
const MD_SPAN = ['md:col-span-2', 'md:col-span-1'];

export default function PortfolioClient({ products }: Props) {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const reduce = useReducedMotion();
  const t = content[language].portfolio;

  const [phase, setPhase] = useState<PhaseKey | null>(null);
  const [section, setSection] = useState<'products' | 'clients'>('products');

  const clients = useMemo(() => products.filter((p) => p.project_type === 'client'), [products]);
  const builds = useMemo(
    () =>
      products
        .filter((p) => p.project_type !== 'client')
        .sort(
          (a, b) =>
            PHASE_RANK[phaseForStatus(b.status).key] - PHASE_RANK[phaseForStatus(a.status).key] ||
            a.display_order - b.display_order,
        ),
    [products],
  );

  const phaseCount = (key: PhaseKey) => builds.filter((p) => phaseForStatus(p.status).key === key).length;

  const visible = builds.filter((p) => phase === null || phaseForStatus(p.status).key === phase);

  // Which section the sticky nav marks as current.
  useEffect(() => {
    const ids = ['products', 'clients'] as const;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(e.target.id as 'products' | 'clients');
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Fill the last grid row with the "your idea" tile so no tinted hole is left.
  const lgFill = LG_SPAN[visible.length % 3] ?? LG_SPAN[0];
  const mdFill = MD_SPAN[visible.length % 2];

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <AnimatedBackground variant="grid" banner="/media/banners/portfolio.webp">
      <div className="min-h-screen pt-24">

        {/* Header */}
        <div className="px-6">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div className="rise mb-12">
              <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary tracking-widest uppercase mb-6">
                <span className="border border-primary/30 px-2 py-1">PORTFOLIO</span>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface">
                  {t.title}
                </h1>
                <p className="font-body text-lg text-on-surface max-w-md leading-relaxed bg-black/70 backdrop-blur-sm p-4">
                  {t.description}
                </p>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* Sticky section nav: one page, two sections, no navigating away */}
        <div className="sticky top-16 z-30 bg-black/80 backdrop-blur-xl">
          <nav aria-label={t.sectionsLabel} className="max-w-screen-2xl mx-auto px-6 flex items-center gap-2">
            {([
              ['products', t.navProducts, builds.length],
              ['clients', t.navClients, clients.length],
            ] as const).map(([id, label, count]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={jump(id)}
                aria-current={section === id ? 'true' : undefined}
                className={`relative min-h-[48px] inline-flex items-center gap-2 px-4 font-label text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                  section === id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {label}
                <span className="font-mono text-[12px] text-outline">{String(count).padStart(2, '0')}</span>
                {section === id && (
                  <motion.span
                    layoutId="portfolio-nav-marker"
                    transition={{ duration: 0.5, ease: EASE_SETTLE as unknown as number[] }}
                    className="absolute inset-x-2 bottom-0 h-[2px] bg-primary"
                  />
                )}
              </a>
            ))}
          </nav>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* PRODUCTS */}
        <section id="products" aria-labelledby="products-title" className="scroll-mt-32 px-6 pt-20 pb-24">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="mb-12"
            >
              <motion.h2 variants={fadeInUp} id="products-title" className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-on-surface">
                {t.productsTitle}
              </motion.h2>
            </motion.div>

            {/* Phase line: Idea → Alpha → Beta → Live. Doubles as the phase filter. */}
            <p className="mb-3 font-mono text-[12px] text-primary uppercase tracking-widest">{t.phasesLabel}</p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-px bg-primary/10"
            >
              {/* The Light Line: cyan, warming to lime at Live */}
              <motion.div
                aria-hidden="true"
                variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.4, ease: EASE_SETTLE as unknown as number[] } } }}
                style={{ originX: 0 }}
                className="hidden md:block absolute top-[27px] left-0 right-0 h-[2px] z-10 bg-gradient-to-r from-primary via-primary to-tertiary-dim"
              />
              {PHASES.map((p, i) => {
                const isIdea = p.key === 'idea';
                const count = phaseCount(p.key);
                const active = phase === p.key;
                const dot =
                  p.key === 'live' ? 'bg-tertiary-dim shadow-[0_0_20px_rgba(190,238,0,0.25)]' : isIdea ? 'bg-surface-container-highest border border-primary/50' : 'bg-primary shadow-[0_0_20px_rgba(143,245,255,0.2)]';
                return (
                  <motion.button
                    key={p.key}
                    type="button"
                    variants={fadeInUp}
                    aria-pressed={active}
                    onClick={() => setPhase(active ? null : p.key)}
                    className={`group relative text-left min-h-[44px] p-6 md:pt-14 md:p-8 transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                      active ? 'bg-surface-container' : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <span aria-hidden="true" className={`hidden md:block absolute z-20 top-5 left-8 h-4 w-4 rounded-full ${dot}`} />
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span aria-hidden="true" className={`md:hidden h-3 w-3 rounded-full ${dot}`} />
                        <span className={`font-headline text-2xl font-bold tracking-tighter uppercase transition-colors duration-300 ${active ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                          {p[language].label}
                        </span>
                      </span>
                      <span className="pt-2 font-mono text-[12px] text-outline uppercase tracking-widest">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-3 font-body text-sm text-on-surface-variant leading-relaxed max-w-[28ch]">{p[language].hint}</p>
                    <p className={`mt-5 font-headline text-5xl font-bold tracking-tighter ${p.key === 'live' ? 'text-tertiary-dim' : 'text-on-surface'}`}>
                      <CountUp value={count} />
                    </p>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="mt-6 mb-4 min-h-[44px] flex items-center gap-4 font-mono text-[12px] uppercase tracking-widest" aria-live="polite">
              {phase !== null && (
                <>
                  <span className="text-outline">{t.showing} {visible.length}/{builds.length}</span>
                  <button
                    type="button"
                    onClick={() => setPhase(null)}
                    className="min-h-[44px] px-2 text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {t.clearFilters}
                  </button>
                </>
              )}
            </div>

            <motion.div layout={!reduce} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((p) => (
                  <motion.div
                    key={p.id}
                    layout={!reduce}
                    variants={{ hidden: {}, visible: {} }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.6, ease: EASE_SETTLE as unknown as number[] }}
                    className="flex [&>*]:w-full"
                  >
                    <ProjectCard product={p} language={language} modulesLabel={t.modulesLabel} compact />
                  </motion.div>
                ))}
              </AnimatePresence>

              {visible.length === 0 && (
                <div className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-16 text-center">
                  <span className="font-mono text-[12px] text-outline uppercase tracking-widest">{t.noMatch}</span>
                </div>
              )}

              {/* Closing tile: fills the last row, and is the way in for the next project */}
              <motion.div layout={!reduce} className={`${mdFill} ${lgFill} flex bg-surface-container-low`}>
                <button
                  type="button"
                  onClick={() => bookCall()}
                  className="group relative flex w-full flex-col justify-end gap-4 p-8 md:p-10 min-h-[280px] overflow-hidden text-left hover:bg-surface-container transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <PanelBackdrop name="horizon" />
                  <h3 className="relative font-headline text-3xl md:text-4xl font-bold tracking-tighter text-on-surface leading-[0.95] max-w-md group-hover:text-primary transition-colors">
                    {t.ideaTitle}
                  </h3>
                  <p className="relative font-body text-sm text-on-surface-variant max-w-md leading-relaxed">{t.ideaBody}</p>
                  <span className="relative inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-primary">
                    {t.ideaCta} →
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CLIENTS */}
        <section id="clients" aria-labelledby="clients-title" className="scroll-mt-32 bg-black px-6 pt-20 pb-28">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            >
              <motion.h2 variants={fadeInUp} id="clients-title" className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-on-surface">
                {t.clientsTitle}
              </motion.h2>
              <motion.p variants={fadeInUp} className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
                {t.clientsDesc}
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-on-surface/10"
            >
              {clients.map((c, i) => (
                <ClientCard key={c.id} client={c} language={language} uid={String(i + 1)} />
              ))}
              {clients.length % 3 !== 0 && (
                <motion.div variants={fadeInUp} className={`hidden lg:flex ${LG_SPAN[clients.length % 3] ?? ''} bg-surface-container-low`}>
                  <button
                    type="button"
                    onClick={() => bookCall()}
                    className="group relative flex w-full flex-col justify-end gap-4 p-8 md:p-10 min-h-[240px] overflow-hidden text-left hover:bg-surface-container transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <PanelBackdrop name="horizon" />
                    <h3 className="relative font-headline text-3xl font-bold tracking-tighter text-on-surface leading-[0.95] group-hover:text-primary transition-colors">
                      {t.clientsCtaTitle}
                    </h3>
                    <span className="relative inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-primary">
                      {t.ideaCta} →
                    </span>
                  </button>
                </motion.div>
              )}
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-outline tracking-widest uppercase">
              <span>Ekinoxis Labs</span>
            </div>
          </div>
        </section>
      </div>
    </AnimatedBackground>
  );
}
