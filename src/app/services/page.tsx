'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const SERVICE_TRACKS = {
  en: [
    {
      id: 'consultation',
      code: '01',
      type: 'CONSULTANCY_TRACK',
      title: 'Consultation',
      tagline: 'Blockchain, crypto & AI guidance.',
      price: 'FROM $50',
      href: '/services/consultation',
      badgeVariant: 'primary' as const,
    },
    {
      id: 'web',
      code: '02',
      type: 'DEVELOPMENT_TRACK',
      title: 'Web Development',
      tagline: 'Online business live in 5 days.',
      price: 'FROM $300',
      href: '/services/web-development',
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'app',
      code: '03',
      type: 'ENGINEERING_TRACK',
      title: 'App Building',
      tagline: 'Custom apps with blockchain & AI.',
      price: 'ENTERPRISE',
      href: '/services/app-building',
      badgeVariant: 'tertiary' as const,
    },
  ],
  es: [
    {
      id: 'consultation',
      code: '01',
      type: 'CONSULTANCY_TRACK',
      title: 'Consultoría',
      tagline: 'Orientación en blockchain, cripto e IA.',
      price: 'DESDE $50',
      href: '/services/consultation',
      badgeVariant: 'primary' as const,
    },
    {
      id: 'web',
      code: '02',
      type: 'DEVELOPMENT_TRACK',
      title: 'Desarrollo Web',
      tagline: 'Negocio online en 5 días.',
      price: 'DESDE $300',
      href: '/services/web-development',
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'app',
      code: '03',
      type: 'ENGINEERING_TRACK',
      title: 'Desarrollo de Apps',
      tagline: 'Apps a medida con blockchain e IA.',
      price: 'ENTERPRISE',
      href: '/services/app-building',
      badgeVariant: 'tertiary' as const,
    },
  ],
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = content[language].services;
  const tracks = SERVICE_TRACKS[language];

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
              <span className="border border-primary/30 px-2 py-1">SERVICES_CATALOG</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed"
            >
              {language === 'en' ? 'Pick a track. We deploy from there.' : 'Elige un track. Desplegamos desde ahí.'}
            </motion.p>
          </motion.div>

          {/* Service Tracks */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-primary/10 mb-px"
          >
            {tracks.map((track) => (
              <motion.div key={track.id} variants={fadeInUp}>
                <Link href={track.href} className="block group">
                  <div className="relative h-full bg-surface-container-low p-12 hover:bg-surface-container transition-colors duration-500">
                    {/* Track type badge */}
                    <div className="mb-8">
                      <ScanBadge variant={track.badgeVariant}>{track.type}</ScanBadge>
                    </div>

                    {/* Code */}
                    <span className="font-mono text-primary text-sm mb-4 block">{track.code} / SVC</span>

                    {/* Title */}
                    <h2 className="font-headline text-4xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-4">
                      {track.title}
                    </h2>

                    {/* Tagline */}
                    <p className="font-body text-on-surface-variant leading-relaxed mb-8">
                      {track.tagline}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-outline uppercase tracking-widest">{track.price}</span>
                      <span className="font-mono text-primary text-xs group-hover:translate-x-1 transition-transform duration-200">
                        {language === 'en' ? 'ENTER →' : 'ENTRAR →'}
                      </span>
                    </div>

                    {/* Hover bottom line */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-surface-container-low border-t border-primary/10 p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-1">
                UNSURE_WHICH_TRACK?
              </p>
              <p className="font-body text-on-surface-variant text-sm">
                {language === 'en' ? 'Talk to us first. Free preliminary diagnosis.' : 'Habla con nosotros primero. Diagnóstico preliminar gratis.'}
              </p>
            </div>
            <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                {language === 'en' ? 'Contact Us' : 'Contáctanos'}
              </Button>
            </a>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
