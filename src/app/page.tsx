'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const stats = [
  {
    num: '01',
    label: 'ORIGIN',
    value: '1ST',
    desc: { en: 'Innovation Lab specialized in emerging tech in the Colombian Pacific.', es: 'Laboratorio de innovación especializado en tecnología emergente en el Pacífico colombiano.' },
  },
  {
    num: '02',
    label: 'FOCUS',
    value: 'A.I.',
    desc: { en: 'Pushing frontiers in neural networks and ethical computation models.', es: 'Empujando fronteras en redes neuronales y modelos de computación ética.' },
  },
  {
    num: '03',
    label: 'TRUST',
    value: 'CRPT',
    desc: { en: 'Cryptography-first approach for sovereign data and blockchain infrastructure.', es: 'Enfoque criptografía primero para datos soberanos e infraestructura blockchain.' },
  },
  {
    num: '04',
    label: 'TIMELINE',
    value: '2024',
    desc: { en: 'Founded as a beacon for decentralized innovation from the South.', es: 'Fundado como un faro de innovación descentralizada desde el Sur.' },
  },
];

export default function Home() {
  const { language } = useLanguage();
  const t = content[language];

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
              <ScanBadge variant="primary">SYS_ACTIVE: 2024</ScanBadge>
              <ScanBadge variant="outline">LOC: PACIFIC_COAST_COL</ScanBadge>
              <ScanBadge variant="outline">LVL: ROOT_LAB</ScanBadge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface uppercase"
            >
              INNOVATION<br />
              <span className="text-primary text-glow italic">WITHOUT</span><br />
              FRONTIERS
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-xl text-lg md:text-xl text-on-surface-variant font-light leading-relaxed"
            >
              {language === 'en' ? (
                <>We are the first <span className="text-primary">Innovation Laboratory</span> from the Colombian Pacific specialized in <span className="text-secondary">Blockchain</span>, <span className="text-tertiary-dim">Cryptography</span> and <span className="text-secondary">Artificial Intelligence</span>.</>
              ) : (
                <>Somos el primer <span className="text-primary">Laboratorio de Innovación</span> del Pacífico Colombiano especializado en <span className="text-secondary">Blockchain</span>, <span className="text-tertiary-dim">Criptografía</span> e <span className="text-secondary">Inteligencia Artificial</span>.</>
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
                <span>DIRECT_CHANNEL://TELEGRAM_BOT</span>
                <span className="text-primary">UPLINK_STATUS: SECURE_CONNECTED</span>
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

            {/* Logo with sphere animation */}
            <div className="relative w-72 h-72 md:w-full md:aspect-square max-w-[440px] hero-visual-glitch">
              <Image
                src="/logo/logo.png"
                alt="Ekinoxis"
                fill
                className="object-contain animate-hero-core"
                priority
              />

              {/* Floating readout — top right */}
              <div className="absolute top-0 right-0 bg-surface-container/80 backdrop-blur-md p-3 border-l-2 border-primary">
                <p className="font-mono text-[10px] text-primary">PROJECT: EKX_LAB_01</p>
                <p className="font-mono text-[9px] text-outline">LAT: 3.4516° N // LON: 76.5320° W</p>
              </div>

              {/* Floating readout — bottom left */}
              <div className="absolute bottom-10 -left-8 bg-surface-container/80 backdrop-blur-md p-3 border-r-2 border-tertiary-dim">
                <p className="font-mono text-[10px] text-tertiary-dim">DATA_STREAM: ENCRYPTED</p>
                <p className="font-mono text-[9px] text-outline">BIT_RATE: 1.2 GBPS</p>
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
