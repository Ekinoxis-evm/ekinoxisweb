'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import BookCallPanel from '@/components/BookCallPanel';
import { useBookCall } from '@/components/BookCall';
import WorkStrip from '@/components/WorkStrip';
import BuildLoop, { type BuildLoopCopy } from '@/components/BuildLoop';
import { fadeInUp } from '@/lib/animations';
import { ToolsBand } from '@/components/LogoBands';

const appContent = {
  en: {
    title: 'SOFTWARE BUILT FOR YOU',
    subtitle: 'Mobile and web apps, with AI and blockchain built in.',
    description: 'We design it, build it and run it — from a first version to software your whole company depends on.',
    kinds: ['Mobile apps', 'Web apps', 'AI features', 'Blockchain', 'APIs', 'Hosting'],
    flow: {
      label: 'How we build',
      title: 'From a diagnosis to software that fits',
      steps: [
        { num: '01', title: 'Diagnostic', desc: 'We sit with you and map how the business really works, and what to build first.', chip: 'Start' },
        { num: '02', title: 'Design and demo', desc: 'We design it and build a working demo you can click — the starting point, not the end.', chip: 'First version' },
        { num: '03', title: 'Rounds with you', desc: 'We build, show you, hear what is wrong, and change course. Again and again, directly with you.', chip: 'Back and forth' },
        { num: '04', title: 'A product that fits', desc: 'Live with real users, doing what your business needs — and we keep it running.', chip: 'The goal' },
      ],
      round: ['Build', 'Show you', 'You tell us', 'Adjust'],
      center: 'Until it fits',
    },
    cta: 'Book a Call',
  },
  es: {
    title: 'SOFTWARE HECHO PARA TI',
    subtitle: 'Apps móviles y web, con IA y blockchain integrados.',
    description: 'Lo diseñamos, lo construimos y lo operamos — desde una primera versión hasta el software del que depende toda tu empresa.',
    kinds: ['Apps móviles', 'Apps web', 'Funciones con IA', 'Blockchain', 'APIs', 'Hosting'],
    flow: {
      label: 'Cómo construimos',
      title: 'De un diagnóstico a software que encaja',
      steps: [
        { num: '01', title: 'Diagnóstico', desc: 'Nos sentamos contigo y entendemos cómo funciona de verdad el negocio, y qué construir primero.', chip: 'Inicio' },
        { num: '02', title: 'Diseño y demo', desc: 'Lo diseñamos y construimos un demo que funciona — el punto de partida, no el final.', chip: 'Primera versión' },
        { num: '03', title: 'Rondas contigo', desc: 'Construimos, te mostramos, nos dices qué no sirve y cambiamos el rumbo. Una y otra vez, directo contigo.', chip: 'Ida y vuelta' },
        { num: '04', title: 'Un producto que encaja', desc: 'En vivo con usuarios reales, haciendo lo que tu negocio necesita — y lo mantenemos funcionando.', chip: 'La meta' },
      ],
      round: ['Construimos', 'Te mostramos', 'Nos dices', 'Ajustamos'],
      center: 'Hasta que encaje',
    },
    cta: 'Agendar Llamada',
  },
};

export default function AppBuildingPage() {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const book = () => bookCall('app');
  const t = appContent[language];
  const services = content[language].services;

  return (
    <AnimatedBackground variant="gradient" banner="/media/banners/apps.webp">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Breadcrumb + Header */}
          <motion.div
            className="rise mb-10 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
              <Link href="/services" className="border border-primary/30 px-2 py-1 hover:border-primary transition-colors">SERVICES</Link>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">SOFTWARE</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed"
            >
              {t.description}
            </motion.p>

            {/* What we build, at a glance */}
            <motion.ul variants={fadeInUp} className="flex flex-wrap gap-2 mt-8">
              {t.kinds.map((k) => (
                <li key={k} className="font-mono text-[12px] text-on-surface-variant uppercase tracking-widest border border-primary/20 bg-surface-container-low/60 px-3 py-1.5">
                  {k}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <BuildLoop t={t.flow as BuildLoopCopy} />

          {/* What it's built with — the same band as the home page */}
          <div className="-mx-6 my-12">
            <ToolsBand />
          </div>

          <WorkStrip
            language={language}
            title={{ en: 'Software we built and run', es: 'Software que construimos y operamos' }}
            items={[
              { name: 'ETHCALI', href: 'https://ethcali.org', img: '/screens/ethcali-app.jpg', what: { en: 'Community app with wallet login for Ethereum Cali.', es: 'App de comunidad con login de wallet para Ethereum Cali.' } },
              { name: '1UP Esports', href: 'https://1upesports.org', img: '/screens/1up-esports.jpg', what: { en: 'Gaming tower with identity-gated challenges.', es: 'Torre gamer con retos que verifican identidad.' } },
              { name: 'SWRFM', href: 'https://swrfmarket.com', img: '/screens/swrfm.jpg', what: { en: 'Inventory, vendors and reports behind a farm market\'s store.', es: 'Inventario, proveedores y reportes detrás de la tienda de un mercado campesino.' } },
            ]}
          />

          {/* Pricing tiers from content.ts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mt-12 mb-px"
          >
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
              <ScanBadge variant="secondary">{language === 'en' ? 'Pricing' : 'Precios'}</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">
                {services.pricing.title}
              </span>
            </div>
            <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-6">
              {services.pricing.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10">
              {services.pricing.plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative bg-surface-container-low p-6 md:p-10 flex flex-col ${plan.popular ? 'ring-1 ring-inset ring-primary/40' : ''}`}
                >
                  <div className="mb-6">
                    <ScanBadge variant={plan.popular ? 'primary' : 'muted'}>
                      {plan.popular ? (language === 'en' ? 'Most popular' : 'Más popular') : `TIER_${String(idx + 1).padStart(2, '0')}`}
                    </ScanBadge>
                  </div>
                  <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-1">
                    <span className="font-headline text-4xl font-bold text-primary">{plan.price}</span>
                  </div>
                  <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-8">
                    {plan.period}
                  </p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-sm flex-shrink-0">{'>'}</span>
                        <span className="font-label text-[13px] font-medium text-on-surface-variant uppercase tracking-wide leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={book} variant={plan.popular ? 'primary' : 'ghost'} className="w-full justify-center">
                      {t.cta}
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          <BookCallPanel topic="app" />

        </div>
      </div>
    </AnimatedBackground>
  );
}
