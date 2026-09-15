'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import ProjectCard from '@/components/portfolio/ProjectCard';
import ClientCard from '@/components/portfolio/ClientCard';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { DIVISIONS, type Division } from '@/lib/portfolio';
import type { ProductWithRelations } from '@/lib/supabase/types';

interface Props {
  division: Division
  items: ProductWithRelations[]
}

export default function DivisionClient({ division, items }: Props) {
  const { language } = useLanguage();
  const t = content[language].portfolio;
  const copy = division[language];
  const others = DIVISIONS.filter((d) => d.slug !== division.slug);

  return (
    <AnimatedBackground variant="grid">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-16">
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <Link href="/portfolio" className="border border-primary/30 px-2 py-1 hover:bg-primary/10 transition-colors duration-200">
                PORTFOLIO
              </Link>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1 bg-primary/10">{division.uid}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface">
                {copy.title}
              </h1>
              <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
                {copy.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Grid */}
          {items.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px ${division.accent}`}
            >
              {items.map((item, idx) => {
                const uid = `${division.uid}_${String(idx + 1).padStart(2, '0')}`;
                return division.layout === 'client' ? (
                  <ClientCard key={item.id} client={item} language={language} uid={uid} />
                ) : (
                  <ProjectCard
                    key={item.id}
                    product={item}
                    language={language}
                    modulesLabel={t.modulesLabel}
                    uid={uid}
                  />
                );
              })}
            </motion.div>
          ) : (
            <div className="bg-surface-container-low p-16 text-center">
              <span className="font-mono text-[10px] text-outline/40 uppercase tracking-widest">
                {t.empty}
              </span>
            </div>
          )}

          {/* Jump to the other three divisions */}
          <motion.nav
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24"
          >
            <p className="font-mono text-[10px] text-outline/60 uppercase tracking-widest mb-4">
              {t.otherDivisions}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-primary/10">
              {others.map((d) => (
                <Link
                  key={d.slug}
                  href={`/portfolio/${d.slug}`}
                  className="relative bg-surface-container-low p-6 group hover:bg-surface-container transition-colors duration-500"
                >
                  <div className="absolute top-4 right-4">
                    <ScanBadge variant="muted">{d.uid}</ScanBadge>
                  </div>
                  <span className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300">
                    {d[language].title}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              ))}
            </div>
          </motion.nav>

          {/* Counter */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-outline tracking-widest uppercase">
            <span>{division.uid}_COUNT: {items.length}</span>
            <span>REGISTRY: EKINOXIS_LABS</span>
          </div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
