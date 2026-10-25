'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { TOOLS } from '@/lib/tools';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { staggerContainer, fadeInUp } from '@/lib/animations';

/** One line per category: what we actually use that group of tools for. */
const PURPOSE: Record<string, { en: string; es: string }> = {
  ai: { en: 'Models and coding tools we build agents and features with.', es: 'Modelos y herramientas con las que construimos agentes y funciones.' },
  crypto_networks: { en: 'Where our contracts and payments run.', es: 'Donde corren nuestros contratos y pagos.' },
  crypto_protocols: { en: 'Building blocks we integrate instead of reinventing.', es: 'Piezas que integramos en lugar de reinventar.' },
  crypto_wallets: { en: 'How users sign in and hold assets without friction.', es: 'Cómo los usuarios entran y guardan activos sin fricción.' },
  development: { en: 'Frameworks, databases and hosting for everything we ship.', es: 'Frameworks, bases de datos y hosting para todo lo que lanzamos.' },
  creativity: { en: 'Design, video and brand work.', es: 'Diseño, video y marca.' },
  automations: { en: 'Workflows that run on their own.', es: 'Flujos que corren solos.' },
  management: { en: 'How the team plans and tracks work.', es: 'Cómo el equipo planea y sigue el trabajo.' },
  marketing: { en: 'Stores, ads and growth.', es: 'Tiendas, anuncios y crecimiento.' },
  paymentintegrations: { en: 'Cards, bank transfers and stablecoins.', es: 'Tarjetas, transferencias y stablecoins.' },
};

type Category = { name: string; logos?: string[]; tools?: string[] };

const nameFromPath = (p: string) =>
  decodeURIComponent(p.split('/').pop() ?? '')
    .replace(/\.(png|svg|webp|jpe?g)$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b(logo|light|dark|uni)\b/gi, '')
    .trim();

export default function TechStackPage() {
  const { language } = useLanguage();
  const en = language === 'en';
  const t = content[language].technologies;
  const categories = Object.entries(t.categories as Record<string, Category>);
  const total = categories.reduce((n, [, c]) => n + (c.logos?.length ?? 0) + (c.tools?.length ?? 0), 0);

  return (
    <AnimatedBackground variant="terminal" banner="/media/banners/techstack.webp">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Header */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-16 md:mb-24">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">{en ? 'About' : 'Nosotros'}</span>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">Tech stack</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface">
                {en ? 'What we build with' : 'Con qué construimos'}
              </h1>
              <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed">
                {en
                  ? `${total} tools across ${categories.length} areas — the ones in production on the work in our portfolio.`
                  : `${total} herramientas en ${categories.length} áreas — las que están en producción en el trabajo de nuestro portafolio.`}
              </p>
            </motion.div>
          </motion.div>

          {/* Categories */}
          <div className="space-y-px bg-primary/10">
            {categories.map(([key, cat]) => {
              const logos = [...(cat.logos ?? []), ...(cat.tools ?? [])];
              return (
                <motion.section
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={staggerContainer}
                  className="bg-black grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10"
                >
                  <motion.div variants={fadeInUp} className="lg:col-span-4">
                    <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface mb-2">{cat.name}</h2>
                    <p className="font-body text-on-surface-variant leading-relaxed max-w-sm">{PURPOSE[key]?.[language]}</p>
                    <p className="font-mono text-[11px] text-outline uppercase tracking-widest mt-4">
                      {logos.length} {en ? 'tools' : 'herramientas'}
                    </p>
                  </motion.div>
                  <ul className="lg:col-span-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3 self-start">
                    {logos.map((logo) => {
                      const tool = TOOLS[logo];
                      const label = tool?.name ?? nameFromPath(logo);
                      const face = 'group h-full w-full bg-surface-container-low border border-primary/10 aspect-square flex flex-col items-center justify-center gap-3 p-5 hover:border-primary/40 hover:bg-surface-container hover:shadow-[0_0_24px_rgba(143,245,255,0.2)] transition-all duration-300';
                      const inner = (
                        <>
                          <span className="relative block w-full flex-1">
                            <Image src={logo} alt={label} fill className="object-contain" sizes="120px" />
                          </span>
                          <span className="w-full truncate text-center font-mono text-[11px] uppercase tracking-wider text-outline group-hover:text-on-surface transition-colors">
                            {label}
                          </span>
                        </>
                      );
                      return (
                        <motion.li key={logo} variants={fadeInUp} title={label}>
                          {tool ? (
                            <a href={tool.url} target="_blank" rel="noopener noreferrer" className={face}>
                              {inner}
                            </a>
                          ) : (
                            <div className={face}>{inner}</div>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.section>
              );
            })}
          </div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
