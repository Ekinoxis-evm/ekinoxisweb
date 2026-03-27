'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { HackathonWithStatus } from '@/lib/supabase/types';

const STATUS_VARIANT: Record<string, 'primary' | 'tertiary' | 'muted'> = {
  incoming: 'primary',
  ongoing: 'tertiary',
  past: 'muted',
}

const STATUS_LABEL: Record<string, { en: string; es: string }> = {
  incoming: { en: 'INCOMING', es: 'PRÓXIMO' },
  ongoing: { en: 'ONGOING', es: 'EN_CURSO' },
  past: { en: 'PAST', es: 'PASADO' },
}

interface Props {
  hackathons: HackathonWithStatus[]
}

export default function HackerHouseClient({ hackathons }: Props) {
  const { language } = useLanguage();
  const t = content[language].hackerHouse;

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">EKX_ROOT</span>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">HACKER_HOUSE</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6">
                  {t.title}
                </h1>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8">
                  {t.description}
                </p>
                <Button variant="primary">{t.cta}</Button>
              </div>
              {/* Active OPS counter */}
              <div className="flex flex-col gap-4">
                <div className="bg-surface-container-low border border-primary/10 p-8">
                  <span className="font-mono text-primary text-xs mb-2 block">ACTIVE_OPS</span>
                  <p className="font-headline text-5xl font-bold text-on-surface">
                    {hackathons.length}
                  </p>
                  <p className="font-label text-xs text-outline uppercase tracking-widest mt-2">
                    {language === 'en' ? 'Hackathons participated' : 'Hackathons participados'}
                  </p>
                </div>
                <div className="bg-surface-container-low border border-primary/10 p-6 flex items-center gap-4">
                  <div className="w-2 h-2 bg-tertiary-dim animate-pulse flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] text-outline uppercase tracking-widest">STATUS</span>
                    <p className="font-mono text-xs text-tertiary-dim uppercase tracking-widest">ALWAYS_BUILDING</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hackathons grid */}
          <div className="mb-8">
            <div className="bg-surface-container-low border-b border-primary/10 px-8 py-5 flex items-center gap-4">
              <ScanBadge variant="primary">OPERATIONS_LOG</ScanBadge>
              <h2 className="font-headline text-xl font-bold tracking-tighter text-on-surface">
                {t.hackathons.title}
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10"
            >
              {hackathons.map((hackathon, idx) => (
                <motion.div
                  key={hackathon.id}
                  variants={fadeInUp}
                  className="relative bg-surface-container-low p-10 group hover:bg-surface-container transition-colors duration-500"
                >
                  {/* Status + UID */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <ScanBadge variant={STATUS_VARIANT[hackathon.hackathonStatus]}>
                      {STATUS_LABEL[hackathon.hackathonStatus][language]}
                    </ScanBadge>
                    <ScanBadge variant="muted">OP_{String(idx + 1).padStart(2, '0')}</ScanBadge>
                  </div>

                  {/* Logo */}
                  <div className="relative w-full h-32 mb-6">
                    {hackathon.logo_url ? (
                      <Image
                        src={hackathon.logo_url}
                        alt={hackathon.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={hackathon.logo_url.startsWith('http')}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="font-mono text-[10px] text-outline/40 uppercase tracking-widest">NO_LOGO</span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-secondary transition-colors duration-300 mb-2">
                    {hackathon.name}
                  </h3>

                  {/* Dates */}
                  {(hackathon.start_date || hackathon.end_date) && (
                    <p className="font-mono text-[9px] text-outline uppercase tracking-widest">
                      {hackathon.start_date && new Date(hackathon.start_date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-CO', { month: 'short', year: 'numeric' })}
                      {hackathon.start_date && hackathon.end_date && ' → '}
                      {hackathon.end_date && new Date(hackathon.end_date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-CO', { month: 'short', year: 'numeric' })}
                    </p>
                  )}

                  {/* Website link */}
                  {hackathon.website && (
                    <a
                      href={hackathon.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block font-mono text-[9px] text-outline hover:text-primary transition-colors uppercase tracking-widest"
                    >
                      {language === 'en' ? 'VIEW_EVENT →' : 'VER_EVENTO →'}
                    </a>
                  )}

                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom readout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-between font-mono text-[10px] text-outline tracking-widest uppercase"
          >
            <span>HACKATHON_COUNT: {hackathons.length}</span>
            <span>MODE: FRONTIER_BUILDERS</span>
            <span>PROTOCOL: ALWAYS_SHIPPING</span>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
