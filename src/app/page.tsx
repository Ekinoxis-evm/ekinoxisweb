'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BrandMark } from '@/components/ui/BrandLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const stats = [
  {
    num: '01',
    label: 'FIRST',
    value: '1ST',
    desc: { en: 'The first innovation lab on the Colombian Pacific coast.', es: 'El primer laboratorio de innovación de la costa Pacífica colombiana.' },
  },
  {
    num: '02',
    label: 'FOCUS',
    value: 'A.I.',
    desc: { en: 'We put AI to work inside real businesses.', es: 'Ponemos la IA a trabajar dentro de negocios reales.' },
  },
  {
    num: '03',
    label: 'TRUST',
    value: 'CRPT',
    desc: { en: 'Your data stays yours. Cryptography first, always.', es: 'Tus datos siguen siendo tuyos. Criptografía primero, siempre.' },
  },
  {
    num: '04',
    label: 'SINCE',
    value: '2024',
    desc: { en: 'Building from the global South, for the world.', es: 'Construyendo desde el sur global, para el mundo.' },
  },
];

export default function Home() {
  const { language } = useLanguage();
  const t = content[language];
  const coreRef = useRef<HTMLVideoElement>(null);

  // `autoPlay` ignores prefers-reduced-motion — CSS can't pause a <video>, so
  // freeze it on the poster frame ourselves when the viewer asked for stillness.
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const v = coreRef.current;
      if (!v) return;
      if (still.matches) v.pause();
      else void v.play().catch(() => {});
    };
    apply();
    still.addEventListener('change', apply);
    return () => still.removeEventListener('change', apply);
  }, []);

  return (
    <AnimatedBackground variant="ambient">
      {/* ── Hero ── */}
      <section className="relative z-10 container mx-auto px-6 pt-12 md:pt-24 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* Content column */}
          <div className="lg:col-span-7 space-y-8">

            {/* Metadata badges */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <ScanBadge variant="primary">{language === 'en' ? 'SINCE 2024' : 'DESDE 2024'}</ScanBadge>
              <ScanBadge variant="outline">CALI, COLOMBIA</ScanBadge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface uppercase"
            >
              {t.hero.titleLines.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {i === 1 ? (
                    <span className="text-primary text-glow italic">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-xl text-lg md:text-xl text-on-surface-variant font-light leading-relaxed"
            >
              {language === 'en' ? (
                <>The first <span className="text-primary">innovation lab</span> on Colombia&apos;s Pacific coast. We build with AI, blockchain and crypto.</>
              ) : (
                <>El primer <span className="text-primary">laboratorio de innovación</span> del Pacífico colombiano. Construimos con IA, blockchain y cripto.</>
              )}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2"
            >
              <Link href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  {t.hero.contactUs}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </Button>
              </Link>
              <div className="flex flex-col font-mono text-[11px] text-outline tracking-tighter">
                <span>{language === 'en' ? 'WE REPLY ON TELEGRAM' : 'RESPONDEMOS POR TELEGRAM'}</span>
                <span className="text-primary">{language === 'en' ? 'USUALLY WITHIN THE DAY' : 'NORMALMENTE EL MISMO DÍA'}</span>
              </div>
            </motion.div>
          </div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative flex justify-center items-center py-12"
          >
            {/* Glow backdrops */}
            <div className="absolute w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none" style={{ borderRadius: '50%' }} />
            <div className="absolute w-[500px] h-[500px] bg-secondary/10 blur-[120px] pointer-events-none" style={{ borderRadius: '50%' }} />

            {/* Core loop — the reactor ring, with the equinox mark at its centre.
                No stacking context on the wrapper: `mix-blend-screen` on the video
                only reaches the page behind it while nothing above isolates it. */}
            <div className="relative w-72 h-72 md:w-full md:aspect-square max-w-[440px]">
              <div className="absolute inset-0">
                {/* Compositor-friendly glow — opacity animates instead of drop-shadow */}
                <div className="absolute inset-[12%] rounded-full bg-primary/30 blur-[60px] animate-hero-glow pointer-events-none" />
                {/* Shot on black. `screen` drops most of the matte; the radial mask
                    kills the frame's corners so no video box edge is ever visible. */}
                <video
                  ref={coreRef}
                  className="absolute inset-0 w-full h-full object-contain mix-blend-screen pointer-events-none"
                  style={{
                    maskImage: 'radial-gradient(circle closest-side at 50% 50%, #000 82%, transparent 99%)',
                    WebkitMaskImage: 'radial-gradient(circle closest-side at 50% 50%, #000 82%, transparent 99%)',
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/video/hero-core-poster.jpg"
                  aria-hidden="true"
                >
                  <source src="/video/hero-core.webm" type="video/webm" />
                  <source src="/video/hero-core.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrandMark
                    size={88}
                    className="animate-hero-breathe drop-shadow-[0_0_24px_rgba(143,245,255,0.45)]"
                  />
                </div>
              </div>

              {/* One readout, and it says something true */}
              <div className="absolute top-0 right-0 bg-surface-container/80 backdrop-blur-md p-3 border-l-2 border-primary">
                <p className="font-mono text-[10px] text-primary">CALI, COLOMBIA</p>
                <p className="font-mono text-[9px] text-outline">3.4516° N // 76.5320° W</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats grid ── */}
      <section className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-px bg-primary/10 border border-primary/10"
        >
          {stats.map((s) => (
            <motion.div
              key={s.num}
              variants={fadeInUp}
              className="bg-black p-10 lg:p-12 group hover:bg-surface-container transition-colors duration-500"
            >
              <span className="font-mono text-primary text-sm mb-4 block">{s.num} / {s.label}</span>
              <h3 className="font-headline text-4xl font-bold text-on-surface mb-4">{s.value}</h3>
              <p className="font-label text-xs text-outline uppercase tracking-widest leading-relaxed">
                {s.desc[language]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </AnimatedBackground>
  );
}
