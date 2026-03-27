'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function CulturePage() {
  const { language } = useLanguage();
  const t = content[language].culture;

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
              <span className="border border-primary/30 px-2 py-1">CULTURE_V3.2</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10"
          >
            {t.values.map((value: any, idx: number) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="relative bg-surface-container-low p-10 group hover:bg-surface-container transition-colors duration-500"
              >
                {/* UID top-right */}
                <div className="absolute top-4 right-4">
                  <ScanBadge variant="muted">
                    VAL_{String(idx + 1).padStart(2, '0')}
                  </ScanBadge>
                </div>

                {/* Index */}
                <span className="font-mono text-primary text-sm mb-4 block">
                  {String(idx + 1).padStart(2, '0')} / {language === 'en' ? 'VALUE' : 'VALOR'}
                </span>

                {/* Title */}
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h2>

                {/* Description */}
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                  {value.description}
                </p>

                {/* Details */}
                {value.details?.length ? (
                  <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                    {value.details.map((item: string) => (
                      <div key={item} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-[11px] mt-0.5">{'>'}</span>
                        <span className="font-mono text-[11px] text-outline uppercase tracking-wider leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-px bg-surface-container-low border-t border-primary/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10"
          >
            <div className="p-10">
              <span className="font-mono text-primary text-xs mb-2 block">SYSTEM_STATUS</span>
              <p className="font-headline text-2xl font-bold text-on-surface">FRONTIER_ACTIVE</p>
              <p className="font-label text-xs text-outline uppercase tracking-widest mt-2">
                {language === 'en' ? 'Innovation by default' : 'Innovación por defecto'}
              </p>
            </div>
            <div className="p-10">
              <span className="font-mono text-primary text-xs mb-2 block">OPERATOR_COUNT</span>
              <p className="font-headline text-2xl font-bold text-on-surface">10+</p>
              <p className="font-label text-xs text-outline uppercase tracking-widest mt-2">
                {language === 'en' ? 'The frontier of LATAM devs' : 'La frontera de los devs LATAM'}
              </p>
            </div>
            <div className="p-10">
              <span className="font-mono text-primary text-xs mb-2 block">LOCATION_VECTOR</span>
              <p className="font-headline text-2xl font-bold text-on-surface">CALI // WY</p>
              <p className="font-label text-xs text-outline uppercase tracking-widest mt-2">
                {language === 'en' ? 'Pacific coast origin' : 'Origen costa pacífica'}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
