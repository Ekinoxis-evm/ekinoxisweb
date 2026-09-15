'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import ContactForm from '@/components/ContactForm';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const appContent = {
  en: {
    title: 'SOFTWARE BUILT FOR YOU',
    subtitle: 'Mobile and web apps, with AI and blockchain built in.',
    description: 'We design it, build it and run it — from a first version to software your whole company depends on.',
    features: [
      { code: 'MOB', title: 'Mobile Apps', desc: 'Native and cross-platform for iOS and Android.' },
      { code: 'WEB', title: 'Web Apps', desc: 'Platforms that work in any browser, phone included.' },
      { code: 'BC3', title: 'Blockchain', desc: 'Smart contracts and crypto wallets, built in properly.' },
      { code: 'AI_', title: 'AI Features', desc: 'Work that used to need a person, done by software.' },
      { code: 'API', title: 'APIs', desc: 'So your systems can talk to each other, and to ours.' },
      { code: 'CLD', title: 'Hosting', desc: 'Servers that stay up as you grow, managed by us.' },
    ],
    techStacks: [
      { name: 'Frontend', items: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS'] },
      { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
      { name: 'Blockchain', items: ['Ethereum', 'Base', 'Solidity', 'Hardhat', 'Viem'] },
      { name: 'AI / ML', items: ['OpenAI', 'Claude', 'LangChain', 'Vector DBs', 'n8n'] },
    ],
    process: [
      { num: '01', title: 'Understand', desc: 'What it must do, and why.' },
      { num: '02', title: 'Design', desc: 'What every screen looks like.' },
      { num: '03', title: 'Build', desc: 'Written properly, the first time.' },
      { num: '04', title: 'Test', desc: 'We try to break it before anyone else does.' },
      { num: '05', title: 'Launch', desc: 'Live, with real users.' },
      { num: '06', title: 'Support', desc: 'We keep it running.' },
    ],
    cta: 'Book a Call',
  },
  es: {
    title: 'SOFTWARE HECHO PARA TI',
    subtitle: 'Apps móviles y web, con IA y blockchain integrados.',
    description: 'Lo diseñamos, lo construimos y lo operamos — desde una primera versión hasta el software del que depende toda tu empresa.',
    features: [
      { code: 'MOB', title: 'Apps Móviles', desc: 'Nativas y multiplataforma para iOS y Android.' },
      { code: 'WEB', title: 'Apps Web', desc: 'Plataformas que funcionan en cualquier navegador, celular incluido.' },
      { code: 'BC3', title: 'Blockchain', desc: 'Contratos inteligentes y wallets, integrados bien.' },
      { code: 'AI_', title: 'Funciones con IA', desc: 'Trabajo que antes requería una persona, hecho por software.' },
      { code: 'API', title: 'APIs', desc: 'Para que tus sistemas se hablen entre ellos, y con los nuestros.' },
      { code: 'CLD', title: 'Hosting', desc: 'Servidores que aguantan tu crecimiento, gestionados por nosotros.' },
    ],
    techStacks: [
      { name: 'Frontend', items: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS'] },
      { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
      { name: 'Blockchain', items: ['Ethereum', 'Base', 'Solidity', 'Hardhat', 'Viem'] },
      { name: 'AI / ML', items: ['OpenAI', 'Claude', 'LangChain', 'Vector DBs', 'n8n'] },
    ],
    process: [
      { num: '01', title: 'Entender', desc: 'Qué debe hacer, y por qué.' },
      { num: '02', title: 'Diseño', desc: 'Cómo se ve cada pantalla.' },
      { num: '03', title: 'Construcción', desc: 'Escrito bien, desde la primera vez.' },
      { num: '04', title: 'Pruebas', desc: 'Intentamos romperlo antes que nadie.' },
      { num: '05', title: 'Lanzamiento', desc: 'En vivo, con usuarios reales.' },
      { num: '06', title: 'Soporte', desc: 'Lo mantenemos funcionando.' },
    ],
    cta: 'Agendar Llamada',
  },
};

export default function AppBuildingPage() {
  const { language } = useLanguage();
  const t = appContent[language];
  const services = content[language].services;

  return (
    <AnimatedBackground variant="gradient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Breadcrumb + Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
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
          </motion.div>

          {/* What We Build */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10 mb-px"
          >
            {t.features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-surface-container-low p-8 group hover:bg-surface-container transition-colors duration-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ScanBadge variant="primary">{feature.code}</ScanBadge>
                </div>
                <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-surface-container-low p-6 md:p-10 mb-px"
          >
            <div className="mb-6">
              <ScanBadge variant="secondary">TECH_STACK</ScanBadge>
            </div>
            <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-8">
              {language === 'en' ? 'Technologies We Use' : 'Tecnologías Que Usamos'}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {t.techStacks.map((stack, idx) => (
                <div key={idx}>
                  <p className="font-mono text-xs text-primary uppercase tracking-widest mb-4">{stack.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest border border-outline-variant/30 px-2 py-1 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-primary/10 mb-px"
          >
            {t.process.map((step, idx) => (
              <div key={idx} className="bg-surface-container-low p-6 group hover:bg-surface-container transition-colors duration-500">
                <p className="font-mono text-primary text-xs mb-4">{step.num}</p>
                <h4 className="font-headline text-base font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors mb-2">
                  {step.title}
                </h4>
                <p className="font-label text-[10px] text-outline uppercase tracking-widest leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Pricing tiers from content.ts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mb-px"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-6">
              <ScanBadge variant="secondary">PRICING_MODEL</ScanBadge>
              <span className="font-headline text-xl font-bold text-on-surface tracking-tighter">
                {services.pricing.title}
              </span>
            </div>
            <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-6">
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
                  <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-8">
                    {plan.period}
                  </p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex gap-2">
                        <span className="font-mono text-primary/50 text-sm flex-shrink-0">{'>'}</span>
                        <span className="font-label text-xs text-on-surface-variant uppercase tracking-wide leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={services.calendarLink} target="_blank" rel="noopener noreferrer">
                    <Button variant={plan.popular ? 'primary' : 'ghost'} className="w-full justify-center">
                      {t.cta}
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA — the form, with the calendar as the alternative */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-surface-container-low border-t border-primary/10 mt-6 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-24"
          >
            <div className="lg:col-span-4">
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-3">
                {language === 'en' ? 'NOT SURE WHICH ONE?' : '¿NO SABES CUÁL?'}
              </p>
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-on-surface uppercase mb-4">
                {language === 'en' ? 'Tell us what you need' : 'Cuéntanos qué necesitas'}
              </h2>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                {language === 'en'
                  ? 'We work out what it needs and send a fixed price within 48 hours.'
                  : 'Definimos qué necesita y enviamos un precio fijo en 48 horas.'}
              </p>
              <a href={services.calendarLink} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto justify-center">{t.cta}</Button>
              </a>
            </div>
            <div className="lg:col-span-8">
              <ContactForm topic="app" />
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
