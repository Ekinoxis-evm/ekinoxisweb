'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import PanelBackdrop from '@/components/ui/PanelBackdrop';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ClientCard from '@/components/portfolio/ClientCard';
import { useBookCall } from '@/components/BookCall';
import { EASE_SETTLE, fadeInUp } from '@/lib/animations';
import { PHASES, phaseForStatus, type PhaseKey } from '@/lib/portfolio';
import { PHASE_RULE } from '@/components/portfolio/PhaseTag';
import type { ProductWithRelations } from '@/lib/supabase/types';

interface Props {
  products: ProductWithRelations[]
}

const PHASE_TEXT: Record<PhaseKey, string> = {
  live: 'text-tertiary-dim',
  beta: 'text-secondary',
  alpha: 'text-primary',
  idea: 'text-on-surface-variant',
};
const PHASE_STEP: Record<PhaseKey, number> = { idea: 1, alpha: 2, beta: 3, live: 4 };
const PHASE_FILL: Record<PhaseKey, string> = {
  live: 'bg-tertiary-dim',
  beta: 'bg-secondary',
  alpha: 'bg-primary',
  idea: 'bg-outline',
};
// Reading order: the furthest along first.
const ORDER: PhaseKey[] = ['live', 'beta', 'alpha', 'idea'];

// Columns follow the card count, so a short group never leaves an empty tinted cell.
const GRID_COLS = ['max-w-xl', 'md:grid-cols-2 max-w-4xl', 'md:grid-cols-2 lg:grid-cols-3'];

type Tab = 'products' | 'clients';

export default function PortfolioClient({ products }: Props) {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const reduce = useReducedMotion();
  const t = content[language].portfolio;

  const [tab, setTab] = useState<Tab>('products');

  // /portfolio#clients opens the Clients tab.
  useEffect(() => {
    if (window.location.hash === '#clients') setTab('clients');
  }, []);

  const select = (next: Tab) => {
    setTab(next);
    history.replaceState(null, '', next === 'clients' ? '#clients' : window.location.pathname);
  };

  const { builds, clients } = useMemo(
    () => ({
      builds: products.filter((p) => p.project_type !== 'client'),
      clients: products.filter((p) => p.project_type === 'client'),
    }),
    [products],
  );

  const list = tab === 'products' ? builds : clients;
  const groups = ORDER.map((key) => ({
    phase: PHASES.find((p) => p.key === key)!,
    items: list
      .filter((p) => phaseForStatus(p.status).key === key)
      .sort((a, b) => a.display_order - b.display_order),
  })).filter((g) => g.items.length > 0);

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

        {/* Tabs: Products and Clients share one page, one tab at a time */}
        <div className="sticky top-16 z-30 bg-black/80 backdrop-blur-xl">
          <div role="tablist" aria-label={t.sectionsLabel} className="max-w-screen-2xl mx-auto px-6 flex items-center gap-2">
            {([
              ['products', t.navProducts, builds.length],
              ['clients', t.navClients, clients.length],
            ] as const).map(([id, label, count]) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={tab === id}
                aria-controls="portfolio-panel"
                onClick={() => select(id)}
                className={`relative min-h-[48px] inline-flex items-center gap-2 px-4 font-label text-[13px] font-bold uppercase tracking-widest transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                  tab === id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {label}
                <span className="font-mono text-[12px] text-outline">{String(count).padStart(2, '0')}</span>
                {tab === id && (
                  <motion.span
                    layoutId="portfolio-nav-marker"
                    transition={{ duration: 0.5, ease: EASE_SETTLE as unknown as number[] }}
                    className="absolute inset-x-2 bottom-0 h-[2px] bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <section id="portfolio-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="px-6 pt-16 pb-28">
          <div className="max-w-screen-2xl mx-auto">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
              >
                <p className="mb-14 max-w-xl font-body text-lg text-on-surface-variant leading-relaxed">
                  {tab === 'products' ? t.productsDesc : t.clientsDesc}
                </p>

                {groups.map(({ phase: ph, items }) => (
                  <div key={ph.key} className="mb-14 last:mb-10">
                    {/* Phase header: one quiet row. Ladder, label, count; the meaning sits on the right */}
                    <div className="relative mb-6 flex flex-col gap-2 pt-5 md:flex-row md:items-center md:justify-between md:gap-8">
                      <span aria-hidden className={`absolute inset-x-0 top-0 h-px ${PHASE_RULE[ph.variant]}`} />
                      <div className="flex items-center gap-4">
                        <div aria-hidden className="flex gap-0.5">
                          {[1, 2, 3, 4].map((n) => (
                            <span key={n} className={`h-1 w-5 ${n <= PHASE_STEP[ph.key] ? PHASE_FILL[ph.key] : 'bg-outline-variant/40'}`} />
                          ))}
                        </div>
                        <h2 className={`font-mono text-base font-bold uppercase tracking-[0.3em] ${PHASE_TEXT[ph.key]}`}>
                          {ph[language].label}
                        </h2>
                        <span className="font-mono text-[12px] uppercase tracking-widest text-outline">
                          {String(items.length).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="font-body text-sm text-on-surface-variant md:text-right">{ph[language].hint}</p>
                    </div>

                    <div
                      className={`grid grid-cols-1 gap-px bg-primary/10 ${GRID_COLS[Math.min(items.length, 3) - 1]}`}
                    >
                      {items.map((p, i) =>
                        tab === 'clients' ? (
                          <ClientCard key={p.id} client={p} language={language} uid={`${ph.key}-${i}`} />
                        ) : (
                          <ProjectCard
                            key={p.id}
                            product={p}
                            language={language}
                            modulesLabel={t.modulesLabel}
                            compact={ph.key !== 'live'}
                          />
                        ),
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => bookCall()}
                  className="group relative flex min-h-[220px] w-full flex-col justify-end gap-4 overflow-hidden bg-surface-container-low p-8 text-left transition-colors duration-500 hover:bg-surface-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:p-10"
                >
                  <PanelBackdrop name="horizon" />
                  <h3 className="relative max-w-xl font-headline text-3xl font-bold leading-[0.95] tracking-tighter text-on-surface transition-colors group-hover:text-primary md:text-4xl">
                    {tab === 'products' ? t.ideaTitle : t.clientsCtaTitle}
                  </h3>
                  {tab === 'products' && <p className="relative max-w-md font-body text-sm leading-relaxed text-on-surface-variant">{t.ideaBody}</p>}
                  <span className="relative inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-primary">
                    {t.ideaCta} →
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </AnimatedBackground>
  );
}
