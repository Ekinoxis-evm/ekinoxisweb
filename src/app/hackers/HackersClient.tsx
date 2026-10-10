'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import SocialLinks from '@/components/ui/SocialLinks';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { Hacker } from '@/lib/supabase/types';

interface Props {
  hackers: Hacker[]
}

export default function HackersClient({ hackers }: Props) {
  const { language } = useLanguage();
  const t = content[language].hackers;

  const profile = (h: Hacker) => language === 'en' ? h.profile_en : h.profile_es;

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">OUR TEAM</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
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

          {/* Hackers Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-primary/10"
          >
            {hackers.map((hacker) => (
              <motion.div
                key={hacker.id}
                variants={fadeInUp}
                className="relative bg-surface-container-low group hover:bg-surface-container transition-colors duration-500 overflow-hidden"
              >
                {/* Photo */}
                <div className="relative w-full aspect-square overflow-hidden">
                  {hacker.image_url ? (
                    <Image
                      src={hacker.image_url}
                      alt={hacker.name}
                      fill
                      className="object-cover grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      unoptimized={hacker.image_url.startsWith('http')}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-surface-container">
                      <span className="font-mono text-[12px] text-outline/40 uppercase tracking-widest">{language === 'en' ? 'Photo soon' : 'Foto pronto'}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-headline text-base font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300 mb-1">
                    {hacker.name}
                  </h3>

                  {profile(hacker) && (
                    <p className="font-mono text-[11px] text-secondary/80 uppercase tracking-wide mb-1">
                      {profile(hacker)}
                    </p>
                  )}

                  {hacker.university && hacker.university !== 'Anon' && (
                    <p className="font-label text-[13px] font-medium text-outline uppercase tracking-widest">
                      {hacker.university}
                    </p>
                  )}

                  {/* Social Links */}
                  <div className="mt-4">
                    <SocialLinks
                      github={hacker.github}
                      linkedin={hacker.linkedin}
                      x={hacker.x}
                      telegram={hacker.telegram}
                      discord={hacker.discord}
                      website={hacker.website}
                      size={16}
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}

            {/* Open seat — a real way in, not a dashed placeholder */}
            <motion.a
              variants={fadeInUp}
              href="https://t.me/ekinoxis"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-surface-container-low group hover:bg-surface-container transition-colors duration-500 flex flex-col justify-end gap-3 p-6 min-h-[280px] overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/15 blur-[70px] pointer-events-none" style={{ borderRadius: '50%' }} />
              <span className="relative font-mono text-[12px] text-primary uppercase tracking-widest">{language === 'en' ? 'Open seat' : 'Cupo abierto'}</span>
              <p className="relative font-headline text-3xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors">
                {language === 'en' ? 'Could be you.' : 'Podrías ser tú.'}
              </p>
              <p className="relative font-body text-sm text-on-surface-variant leading-relaxed">
                {language === 'en' ? 'Build with us at the hacker house in Cali.' : 'Construye con nosotros en el hacker house de Cali.'}
              </p>
              <span className="relative font-mono text-[12px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                {language === 'en' ? 'Write us on Telegram' : 'Escríbenos por Telegram'} →
              </span>
            </motion.a>
          </motion.div>


        </div>
      </div>
    </AnimatedBackground>
  );
}
