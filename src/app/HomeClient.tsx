'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Globe2, MessagesSquare } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import LogoMarquee, { type MarqueeLogo } from '@/components/LogoMarquee';
import { TOOLS } from '@/lib/tools';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { CertificationPartner, EducationPartner, HackathonWithStatus, ProductWithRelations } from '@/lib/supabase/types';

/** The work shown first on the home page, in this order, when it has a cover image. */
const FEATURED = ['CONVEXO', 'ETHCALI app'];

const SERVICES = [
  {
    href: '/services/consultation',
    icon: MessagesSquare,
    title: { en: 'Consultation', es: 'Consultoría' },
    desc: {
      en: 'Three hours with your team on AI, payments or automation. You leave with a written plan.',
      es: 'Tres horas con tu equipo sobre IA, pagos o automatización. Sales con un plan escrito.',
    },
    from: { en: 'From $500', es: 'Desde $500' },
  },
  {
    href: '/services/web-development',
    icon: Globe2,
    title: { en: 'Websites', es: 'Sitios web' },
    desc: {
      en: 'A site that books, sells and answers on WhatsApp — live in five days, at a fixed price.',
      es: 'Un sitio que agenda, vende y responde por WhatsApp — en vivo en cinco días, a precio fijo.',
    },
    from: { en: 'From $1,500', es: 'Desde $1,500' },
  },
  {
    href: '/services/app-building',
    icon: Code2,
    title: { en: 'Software & apps', es: 'Software y apps' },
    desc: {
      en: 'Web and mobile apps with AI and blockchain built in — from a first version to the system you run on.',
      es: 'Apps web y móviles con IA y blockchain integrados — desde una primera versión hasta el sistema con el que operas.',
    },
    from: { en: 'From $12,000', es: 'Desde $12,000' },
  },
];

interface Props {
  products: ProductWithRelations[];
  hackathons: HackathonWithStatus[];
  hackerCount: number;
  schools: EducationPartner[];
  certifications: CertificationPartner[];
}

/** One tile per mark — five ETHGlobal events share one logo. */
function uniqueLogos(rows: { name: string; logo_url: string | null }[], plate?: MarqueeLogo['plate']): MarqueeLogo[] {
  const seen = new Set<string>();
  return rows.flatMap((r) => {
    if (!r.logo_url || seen.has(r.logo_url)) return [];
    seen.add(r.logo_url);
    return [{ name: r.name, src: r.logo_url, plate }];
  });
}

export default function HomeClient({ products, hackathons, hackerCount, schools, certifications }: Props) {
  const { language } = useLanguage();
  const en = language === 'en';
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

  const clients = products.filter((p) => p.project_type === 'client' && p.logo_url);
  const featured = FEATURED.map((name) => products.find((p) => p.name === name))
    .filter((p): p is ProductWithRelations => Boolean(p && p.image_url));
  const shipped = products.length;
  const hackathonCount = hackathons.length;

  // Dealt round-robin across categories, so the band mixes AI, chains, payments…
  // instead of running seven AI logos in a row.
  const toolGroups = Object.values(t.technologies.categories as Record<string, { logos?: string[]; tools?: string[] }>).map(
    (c) => [...(c.logos ?? []), ...(c.tools ?? [])],
  );
  const tools: MarqueeLogo[] = Array.from({ length: Math.max(...toolGroups.map((g) => g.length)) }, (_, i) => toolGroups.map((g) => g[i]))
    .flat()
    .filter((src): src is string => Boolean(src))
    .map((src) => ({ name: TOOLS[src]?.name ?? '', src, href: TOOLS[src]?.url }));

  const numbers = [
    { value: String(shipped), label: en ? 'Projects shipped' : 'Proyectos lanzados' },
    { value: String(clients.length), label: en ? 'Client builds' : 'Proyectos para clientes' },
    { value: String(hackathonCount), label: en ? 'Hackathons' : 'Hackathons' },
    { value: String(hackerCount), label: en ? 'Builders in the lab' : 'Builders en el lab' },
  ];

  return (
    <AnimatedBackground variant="ambient">
      {/* ── Hero ── */}
      <section className="relative z-10 max-w-screen-2xl mx-auto px-6 pt-12 md:pt-20 pb-16 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
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
              <ScanBadge variant="primary">{en ? 'SINCE 2024' : 'DESDE 2024'}</ScanBadge>
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
              className="max-w-xl text-lg md:text-xl text-on-surface-variant font-normal leading-relaxed"
            >
              {en ? (
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
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link href="/services/consultation#contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">
                  {en ? 'Book a free call' : 'Agenda una llamada gratis'}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto justify-center">
                  {en ? 'See our work' : 'Mira nuestro trabajo'}
                </Button>
              </Link>
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
                <p className="font-mono text-[12px] text-primary">CALI, COLOMBIA</p>
                <p className="font-mono text-[11px] text-outline">3.4516° N // 76.5320° W</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tools ── */}
      <LogoMarquee
        eyebrow={en ? 'Our tools' : 'Nuestras herramientas'}
        title={en ? 'The tools we build with every day.' : 'Las herramientas con las que construimos cada día.'}
        link={{ href: '/tech-stack', label: en ? 'Full tech stack' : 'Stack completo' }}
        logos={tools}
        plate="dark"
        shape="square"
        reverse
        speed={2}
      />

      {/* ── Numbers — every one counted from the database ── */}
      <section className="relative z-10 max-w-screen-2xl mx-auto px-6 py-16 md:py-20">
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10"
        >
          {numbers.map((n) => (
            <motion.div key={n.label} variants={fadeInUp} className="bg-black p-8 md:p-12">
              <dd className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-3">{n.value}</dd>
              <dt className="font-mono text-[12px] text-outline uppercase tracking-widest">{n.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </section>

      {/* ── Clients ── */}
      <LogoMarquee
        eyebrow={en ? 'Clients' : 'Clientes'}
        title={en ? 'Businesses that run on our work.' : 'Negocios que funcionan con nuestro trabajo.'}
        link={{ href: '/portfolio/clients', label: en ? 'See client work' : 'Ver trabajo para clientes' }}
        logos={uniqueLogos(clients)}
        plate="dark"
      />

      {/* ── Services ── */}
      <section className="relative z-10 max-w-screen-2xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">{en ? 'What we do' : 'Qué hacemos'}</p>
              <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-on-surface max-w-3xl">
                {en ? 'From the first conversation to software you run on.' : 'De la primera conversación al software con el que operas.'}
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors">
              {en ? 'All services' : 'Todos los servicios'} <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.href} variants={fadeInUp}>
                  <Link
                    href={s.href}
                    className="group relative flex h-full flex-col bg-surface-container-low p-8 md:p-10 hover:bg-surface-container transition-colors duration-500"
                  >
                    <div className="flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/5 text-primary mb-10 transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(143,245,255,0.25)]">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface mb-3 group-hover:text-primary transition-colors">
                      {s.title[language]}
                    </h3>
                    <p className="font-body text-on-surface-variant leading-relaxed mb-10">{s.desc[language]}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-headline text-xl font-bold text-primary">{s.from[language]}</span>
                      <ArrowUpRight size={20} className="text-outline group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── Selected work ── */}
      {featured.length > 0 && (
        <section className="relative z-10 max-w-screen-2xl mx-auto px-6 pb-24 md:pb-32">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">{en ? 'Selected work' : 'Trabajo seleccionado'}</p>
                <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-on-surface max-w-3xl">
                  {en ? 'Things we built, running in production.' : 'Lo que construimos, funcionando en producción.'}
                </h2>
              </div>
              <Link href="/portfolio" className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors">
                {en ? 'Full portfolio' : 'Portafolio completo'} <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10">
              {featured.map((p) => {
                const href = p.website_url || p.app_url || '/portfolio';
                const external = href.startsWith('http');
                return (
                  <motion.a
                    key={p.id}
                    variants={fadeInUp}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col bg-surface-container-low hover:bg-surface-container transition-colors duration-500"
                  >
                    <div className={`relative w-full overflow-hidden aspect-[16/10]`}>
                      <Image
                        src={p.image_url as string}
                        alt={p.name}
                        fill
                        className="object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        unoptimized={(p.image_url as string).startsWith('http')}
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 pointer-events-none" />
                    </div>
                    <div className="flex items-start justify-between gap-6 p-6 md:p-10 lg:flex-1 lg:items-end">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-headline font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors text-3xl md:text-4xl">
                            {p.name}
                          </h3>
                          <ScanBadge variant="muted">{p.status}</ScanBadge>
                        </div>
                        <p className="font-body text-on-surface-variant leading-relaxed line-clamp-2 text-base max-w-xl">
                          {en ? p.description_en : p.description_es}
                        </p>
                      </div>
                      <ArrowUpRight size={22} className="flex-shrink-0 mt-1 text-outline group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Where we've been ── */}
      <LogoMarquee
        eyebrow={en ? "Where we've been" : 'Dónde hemos estado'}
        title={en ? 'Universities and governments we teach with.' : 'Universidades y gobiernos con los que enseñamos.'}
        link={{ href: '/education', label: en ? 'Education' : 'Educación' }}
        logos={uniqueLogos(schools)}
        plate="light"
      />

      <div className="h-24 md:h-32" />

      {/* ── Partners — hackathon marks are white wordmarks, certification marks dark text ── */}
      <LogoMarquee
        eyebrow={en ? 'Partners' : 'Aliados'}
        title={en ? 'Hackathons and programs we build with.' : 'Hackathons y programas con los que construimos.'}
        link={{ href: '/hacker-house', label: en ? 'Hacker House' : 'Hacker House' }}
        logos={[...uniqueLogos(hackathons, 'dark'), ...uniqueLogos(certifications, 'light')]}
        plate="light"
        reverse
      />

      <div className="h-24 md:h-32" />

      {/* ── Closing call to action ── */}
      <section className="relative z-10 max-w-screen-2xl mx-auto px-6 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-surface-container-low p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="absolute -right-24 -top-24 w-[420px] h-[420px] bg-primary/10 blur-[120px] pointer-events-none" style={{ borderRadius: '50%' }} />
          <div className="relative lg:col-span-8">
            <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">{en ? 'Next step' : 'Siguiente paso'}</p>
            <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95] text-on-surface">
              {en ? 'Tell us what you are building.' : 'Cuéntanos qué estás construyendo.'}
            </h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-xl mt-5">
              {en
                ? 'Thirty minutes, free. We find the problem worth solving first — or tell you that you do not need us.'
                : 'Treinta minutos, gratis. Encontramos el problema que vale la pena resolver primero — o te decimos que no nos necesitas.'}
            </p>
          </div>
          <div className="relative lg:col-span-4 flex flex-col gap-3">
            <Link href="/services/consultation#contact">
              <Button variant="primary" size="lg" className="w-full justify-center">
                {en ? 'Book a free call' : 'Agenda una llamada gratis'}
              </Button>
            </Link>
            <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="w-full justify-center">
                {en ? 'Message us on Telegram' : 'Escríbenos por Telegram'}
              </Button>
            </a>
          </div>
        </motion.div>
      </section>
    </AnimatedBackground>
  );
}
