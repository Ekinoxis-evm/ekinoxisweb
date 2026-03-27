'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const researchStreams = {
  en: [
    {
      code: 'AI_',
      title: 'AI & Agents',
      badge: 'STREAM_01',
      items: [
        'Copilots and agents that help developers ship faster.',
        'Experimenting with LLMs for automation and support.',
        'Evaluating model safety, latency and costs in real use cases.',
      ],
    },
    {
      code: 'CRP',
      title: 'Applied Cryptography',
      badge: 'STREAM_02',
      items: [
        'Identity and reputation systems resistant to Sybil attacks.',
        'Exploring zero-knowledge proofs and privacy-preserving flows.',
        'Secure design for wallets, signatures and data sharing.',
      ],
    },
    {
      code: 'BC3',
      title: 'Blockchain & Web3',
      badge: 'STREAM_03',
      items: [
        'Real-world asset tokenization and on-chain auctions.',
        'Smart contracts on Base and Ethereum for production products.',
        'Wallet experiences that feel like Web2 but stay non-custodial.',
      ],
    },
  ],
  es: [
    {
      code: 'AI_',
      title: 'IA y Agentes',
      badge: 'STREAM_01',
      items: [
        'Copilotos y agentes que ayudan a los desarrolladores a lanzar más rápido.',
        'Experimentando con LLMs para automatización y soporte.',
        'Evaluando seguridad, latencia y costos de modelos en casos de uso reales.',
      ],
    },
    {
      code: 'CRP',
      title: 'Criptografía Aplicada',
      badge: 'STREAM_02',
      items: [
        'Sistemas de identidad y reputación resistentes a ataques Sybil.',
        'Explorando pruebas de conocimiento cero y flujos que preservan la privacidad.',
        'Diseño seguro para wallets, firmas y compartición de datos.',
      ],
    },
    {
      code: 'BC3',
      title: 'Blockchain & Web3',
      badge: 'STREAM_03',
      items: [
        'Tokenización de activos del mundo real y subastas on-chain.',
        'Smart contracts en Base y Ethereum para productos en producción.',
        'Experiencias de wallet que se sienten como Web2 pero permanecen no-custodiadas.',
      ],
    },
  ],
};

export default function ResearchPage() {
  const { language } = useLanguage();
  const t = content[language].research;
  const streams = researchStreams[language];

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
              <span className="border border-primary/30 px-2 py-1">RESEARCH_LAB</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed">
                {t.description}
              </p>
              <p className="font-mono text-xs text-secondary/80 uppercase tracking-widest max-w-sm text-right">
                {t.focus}
              </p>
            </motion.div>
          </motion.div>

          {/* Research Streams */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-primary/10 mb-px"
          >
            {streams.map((stream) => (
              <motion.div
                key={stream.code}
                variants={fadeInUp}
                className="bg-surface-container-low p-10 group hover:bg-surface-container transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-8">
                  <ScanBadge variant="primary">{stream.code}</ScanBadge>
                  <ScanBadge variant="muted">{stream.badge}</ScanBadge>
                </div>
                <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-8">
                  {stream.title}
                </h2>
                <div className="space-y-4">
                  {stream.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="font-mono text-primary/40 text-xs mt-0.5 flex-shrink-0">{'>'}</span>
                      <span className="font-body text-sm text-on-surface-variant leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* Research → Products section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10"
          >
            <div className="bg-surface-container-low p-10">
              <div className="mb-6">
                <ScanBadge variant="secondary">R_AND_D → PRODUCTION</ScanBadge>
              </div>
              <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-4">
                {language === 'en' ? 'From experiments to live products' : 'De experimentos a productos en producción'}
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                {language === 'en'
                  ? 'Every research line is connected to a real deployment: hackathon projects, pilots with partners, or internal tools our hackers use every day.'
                  : 'Cada línea de investigación está conectada con un despliegue real: proyectos de hackathon, pilotos con aliados o herramientas internas que nuestros hackers usan a diario.'}
              </p>
              <div className="space-y-3">
                {[
                  language === 'en' ? 'Prototype fast in hacker houses, refine what works.' : 'Prototipamos rápido en hacker houses y refinamos lo que funciona.',
                  language === 'en' ? 'Document learnings openly for the LATAM builder community.' : 'Documentamos aprendizajes abiertamente para la comunidad LATAM.',
                  language === 'en' ? '"Innovation by default" as a practice, not a slogan.' : '"Innovación por defecto" como práctica, no como slogan.',
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-mono text-secondary/50 text-xs mt-0.5 flex-shrink-0">{'>'}</span>
                    <span className="font-body text-sm text-on-surface-variant leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-primary/10">
              {[
                { label: language === 'en' ? 'Products Shipped' : 'Productos Lanzados', value: '8+', code: 'PROD' },
                { label: language === 'en' ? 'Hackathons' : 'Hackathones', value: '5+', code: 'HACK' },
                { label: language === 'en' ? 'Research Streams' : 'Líneas de Investigación', value: '3', code: 'STRM' },
                { label: language === 'en' ? 'Frontier Year' : 'Año Frontera', value: '2024', code: 'YEAR' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-surface-container-low p-8 flex flex-col justify-between">
                  <span className="font-mono text-xs text-outline uppercase tracking-widest">{stat.code}</span>
                  <div>
                    <p className="font-headline text-4xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="font-label text-[10px] text-outline uppercase tracking-widest leading-relaxed">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
