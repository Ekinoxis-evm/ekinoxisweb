'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const appContent = {
  en: {
    title: 'FRONTIER APP_BUILDING',
    subtitle: 'Custom mobile and web apps with blockchain & AI at the core.',
    description: 'We design and build custom applications — from MVPs to production systems — integrating frontier tech.',
    features: [
      { code: 'MOB', title: 'Mobile Apps', desc: 'Native and cross-platform for iOS and Android.' },
      { code: 'WEB', title: 'Web Applications', desc: 'Progressive web apps and full-stack platforms.' },
      { code: 'BC3', title: 'Blockchain Integration', desc: 'Web3 apps with smart contracts and crypto wallets.' },
      { code: 'AI_', title: 'AI-Powered Features', desc: 'Intelligent automation and LLM-driven functionality.' },
      { code: 'API', title: 'API Development', desc: 'RESTful and GraphQL APIs for seamless integrations.' },
      { code: 'CLD', title: 'Cloud Infrastructure', desc: 'Scalable deployment and infrastructure management.' },
    ],
    techStacks: [
      { name: 'Frontend', items: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS'] },
      { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
      { name: 'Blockchain', items: ['Ethereum', 'Base', 'Solidity', 'Hardhat', 'Viem'] },
      { name: 'AI / ML', items: ['OpenAI', 'Claude', 'LangChain', 'Vector DBs', 'n8n'] },
    ],
    process: [
      { num: '01', title: 'Discovery', desc: 'Requirements and goal alignment.' },
      { num: '02', title: 'Design', desc: 'Wireframes and UX flows.' },
      { num: '03', title: 'Development', desc: 'Build with best practices.' },
      { num: '04', title: 'Testing', desc: 'QA and security review.' },
      { num: '05', title: 'Deployment', desc: 'Production launch.' },
      { num: '06', title: 'Support', desc: 'Ongoing maintenance.' },
    ],
    cta: 'Book a Call',
  },
  es: {
    title: 'DESARROLLO DE APPS_FRONTERA',
    subtitle: 'Apps móviles y web con blockchain e IA en el núcleo.',
    description: 'Diseñamos y construimos aplicaciones a medida — desde MVPs hasta sistemas en producción — integrando tecnología de frontera.',
    features: [
      { code: 'MOB', title: 'Apps Móviles', desc: 'Nativas y multiplataforma para iOS y Android.' },
      { code: 'WEB', title: 'Aplicaciones Web', desc: 'Progressive web apps y plataformas full-stack.' },
      { code: 'BC3', title: 'Integración Blockchain', desc: 'Apps Web3 con smart contracts y wallets.' },
      { code: 'AI_', title: 'Funciones con IA', desc: 'Automatización inteligente y funcionalidad LLM.' },
      { code: 'API', title: 'Desarrollo de APIs', desc: 'APIs RESTful y GraphQL para integraciones.' },
      { code: 'CLD', title: 'Infraestructura Cloud', desc: 'Despliegue escalable y gestión de infraestructura.' },
    ],
    techStacks: [
      { name: 'Frontend', items: ['React', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS'] },
      { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
      { name: 'Blockchain', items: ['Ethereum', 'Base', 'Solidity', 'Hardhat', 'Viem'] },
      { name: 'AI / ML', items: ['OpenAI', 'Claude', 'LangChain', 'Vector DBs', 'n8n'] },
    ],
    process: [
      { num: '01', title: 'Descubrimiento', desc: 'Alineación de requisitos y objetivos.' },
      { num: '02', title: 'Diseño', desc: 'Wireframes y flujos UX.' },
      { num: '03', title: 'Desarrollo', desc: 'Construcción con mejores prácticas.' },
      { num: '04', title: 'Pruebas', desc: 'QA y revisión de seguridad.' },
      { num: '05', title: 'Despliegue', desc: 'Lanzamiento a producción.' },
      { num: '06', title: 'Soporte', desc: 'Mantenimiento continuo.' },
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
              <span className="border border-primary/30 px-2 py-1">APP_BUILDING</span>
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-surface-container-low border-t border-primary/10 mt-6 p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-1">{language === 'en' ? 'NOT_SURE_WHICH_TIER?' : '¿NO_SABES_QUÉ_TIER?'}</p>
              <p className="font-body text-on-surface-variant text-sm max-w-lg">
                {language === 'en'
                  ? 'Book a free diagnosis call. We scope it with you and send a fixed quote within 48 hours.'
                  : 'Agenda una llamada de diagnóstico gratis. Definimos el alcance contigo y enviamos una cotización fija en 48 horas.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href={services.calendarLink} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="w-full justify-center">{t.cta}</Button>
              </a>
              <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-center">Telegram</Button>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
