'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { DIVISIONS } from '@/lib/portfolio';
import type { ProductWithRelations } from '@/lib/supabase/types';

interface Props {
  products: ProductWithRelations[]
}

export default function PortfolioClient({ products }: Props) {
  const { language } = useLanguage();
  const t = content[language].portfolio;

  const byType = (type: string) =>
    products.filter((p) => (p.project_type ?? 'product') === type);

  return (
    <AnimatedBackground variant="grid">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-16">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">PORTFOLIO</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface">
                {t.title}
              </h1>
              <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
                {t.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Four divisions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10"
          >
            {DIVISIONS.map((division, idx) => {
              const items = byType(division.type);
              const copy = division[language];
              return (
                <motion.div key={division.slug} variants={fadeInUp}>
                  <Link
                    href={`/portfolio/${division.slug}`}
                    className="relative flex flex-col h-full bg-surface-container-low p-8 sm:p-10 group hover:bg-surface-container transition-colors duration-500"
                  >
                    <div className="absolute top-4 right-4">
                      <ScanBadge variant="muted">
                        {division.uid}_{String(items.length).padStart(2, '0')}
                      </ScanBadge>
                    </div>

                    <p className="font-mono text-[10px] text-primary/50 tracking-widest uppercase mb-4">
                      {String(idx + 1).padStart(2, '0')} · {division.uid}
                    </p>

                    <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tighter leading-[0.95] text-on-surface group-hover:text-primary transition-colors duration-300 mb-4">
                      {copy.title}
                    </h2>

                    <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
                      {copy.description}
                    </p>

                    {/* Roster — the names are the proof, so show them up front */}
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
                      {items.map((p) => (
                        <li
                          key={p.id}
                          className="font-mono text-[10px] text-outline group-hover:text-on-surface-variant uppercase tracking-widest transition-colors duration-300"
                        >
                          {p.name}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto flex items-center gap-2 font-mono text-[10px] text-primary/60 group-hover:text-primary uppercase tracking-widest transition-colors duration-300">
                      {t.viewDivision}
                      <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>

                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-outline tracking-widest uppercase"
          >
            <span>
              {DIVISIONS.map((d) => `${d.uid}: ${byType(d.type).length}`).join(' / ')}
            </span>
            <span>TOTAL: {products.length}</span>
            <span>IP_STATUS: IN_HOUSE_GENERATED</span>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
