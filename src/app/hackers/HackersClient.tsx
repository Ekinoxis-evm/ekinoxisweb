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
              <span className="border border-primary/30 px-2 py-1">{language === 'en' ? 'Our team' : 'Nuestro equipo'}</span>
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
            {hackers.map((hacker) => {
              const initials = hacker.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
              return (
                <motion.article
                  key={hacker.id}
                  variants={fadeInUp}
                  className="relative bg-surface-container-low group overflow-hidden flex flex-col"
                >
                  {/* One treatment for every portrait: same crop, toned black-and-white, colour on hover */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {hacker.image_url ? (
                      <>
                        <Image
                          src={hacker.image_url}
                          alt={hacker.name}
                          fill
                          className="object-cover object-top grayscale contrast-[1.08] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-700"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          unoptimized={hacker.image_url.startsWith('http')}
                        />
                        <div className="absolute inset-0 bg-primary/15 mix-blend-color group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-container via-surface-container-low to-black">
                        <div className="absolute w-2/3 h-2/3 bg-primary/10 blur-[60px] pointer-events-none" style={{ borderRadius: '50%' }} />
                        <span className="relative font-headline text-7xl md:text-8xl font-bold tracking-tighter text-primary/80 group-hover:text-primary transition-colors duration-500">
                          {initials}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-container-low to-transparent pointer-events-none" />
                  </div>

                  <div className="relative flex flex-col flex-1 px-6 pb-6 -mt-6">
                    <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300">
                      {hacker.name}
                    </h3>
                    {profile(hacker) && (
                      <p className="font-body text-sm text-on-surface-variant leading-snug mt-1">{profile(hacker)}</p>
                    )}
                    {hacker.university && hacker.university !== 'Anon' && (
                      <p className="font-mono text-[11px] text-outline uppercase tracking-widest mt-2">{hacker.university}</p>
                    )}
                    <div className="mt-auto pt-5">
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
                </motion.article>
              );
            })}

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
