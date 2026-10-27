'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Code2, Globe2, MessagesSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import HeroBackdrop from '@/components/HeroBackdrop';
import PanelBackdrop from '@/components/ui/PanelBackdrop';
import LogoMarquee, { type MarqueeLogo } from '@/components/LogoMarquee';
import { ToolsBand } from '@/components/LogoBands';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { CertificationPartner, EducationPartner, HackathonWithStatus, ProductWithRelations } from '@/lib/supabase/types';
import { useBookCall } from '@/components/BookCall';
import { DIVISIONS } from '@/lib/portfolio';

/** The work shown first on the home page, in this order, when it has a cover image. */
const FEATURED = ['CONVEXO', 'ETHCALI app'];

const SERVICES = [
  {
    href: '/services/consultation',
    icon: MessagesSquare,
    title: { en: 'Consultation', es: 'Consultoría' },
    desc: {
      en: 'Three hours with your team. You leave with a written plan.',
      es: 'Tres horas con tu equipo. Sales con un plan escrito.',
    },
    from: { en: 'From $500', es: 'Desde $500' },
  },
  {
    href: '/services/web-development',
    icon: Globe2,
    title: { en: 'Websites', es: 'Sitios web' },
    desc: {
      en: 'A site that sells and books for you. Live in five days.',
      es: 'Un sitio que vende y agenda por ti. En vivo en cinco días.',
    },
    from: { en: 'From $1,500', es: 'Desde $1,500' },
  },
  {
    href: '/services/app-building',
    icon: Code2,
    title: { en: 'Software & apps', es: 'Software y apps' },
    desc: {
      en: 'Web and mobile apps with AI and blockchain. From first version to full system.',
      es: 'Apps web y móviles con IA y blockchain. De la primera versión al sistema completo.',
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
  const bookCall = useBookCall();
  const en = language === 'en';
  const t = content[language];
  const clients = products.filter((p) => p.project_type === 'client' && p.logo_url);
  const featured = FEATURED.map((name) => products.find((p) => p.name === name))
    .filter((p): p is ProductWithRelations => Boolean(p && p.image_url));
  const hackathonCount = hackathons.length;

  // One tile per portfolio division, so the total is split the same way /portfolio is.
  const numbers: { value: string; label: string; href?: string }[] = [
    ...DIVISIONS.map((d) => ({
      value: String(products.filter((p) => p.project_type === d.type).length),
      label: d[language].short,
      href: `/portfolio/${d.slug}`,
    })),
    { value: String(hackathonCount), label: en ? 'Hackathons' : 'Hackathons' },
    { value: String(hackerCount), label: en ? 'Builders in the lab' : 'Builders en el lab' },
  ];

  return (
    <AnimatedBackground variant="ambient">
      {/* ── Hero — the equinox: out of the dark, into the light ── */}
      <div className="relative">
      <HeroBackdrop />
      <section className="relative z-10 max-w-screen-2xl mx-auto px-6 pt-12 md:pt-20 pb-16 min-h-[calc(100svh-4rem)] flex flex-col justify-center">
        {/* CSS reveal (.rise) so the slogan paints with the first frame, not after hydration */}
        <div className="rise max-w-3xl space-y-8">
          {/* The slogan */}
          <h1
            className="font-headline text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.88] text-on-surface uppercase"
          >
            {t.hero.titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === 1 ? <span className="text-primary text-glow italic">{line}</span> : line}
              </span>
            ))}
          </h1>

          <p
            className="max-w-xl text-lg md:text-xl text-on-surface-variant font-normal leading-relaxed"
          >
            {en ? (
              <>Colombia&apos;s Pacific <span className="text-primary">innovation lab</span>. We build AI and blockchain software for your business.</>
            ) : (
              <>El <span className="text-primary">laboratorio de innovación</span> del Pacífico colombiano. Construimos software con IA y blockchain para tu negocio.</>
            )}
          </p>

          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center" onClick={() => bookCall()}>
                {en ? 'Book a free call' : 'Agenda una llamada gratis'}
                <ArrowRight size={18} />
              </Button>
            <Link href="/portfolio">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto justify-center">
                {en ? 'See our work' : 'Mira nuestro trabajo'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* ── Tools ── */}
      <ToolsBand />

      {/* ── Numbers — every one counted from the database ── */}
      <section className="relative z-10 max-w-screen-2xl mx-auto px-6 py-16 md:py-20">
        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10"
        >
          {numbers.map((n) => {
            const body = (
              <>
                <dd className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-3 group-hover:text-primary transition-colors">{n.value}</dd>
                <dt className="flex items-center gap-2 font-mono text-[12px] text-outline uppercase tracking-widest">
                  {n.label}
                  {n.href && <ArrowUpRight size={14} className="text-outline group-hover:text-primary transition-colors" />}
                </dt>
              </>
            );
            return (
              <motion.div key={n.label} variants={fadeInUp} className="bg-black">
                {n.href ? (
                  <Link href={n.href} className="group block h-full p-8 md:p-12 hover:bg-surface-container-low transition-colors duration-500">
                    {body}
                  </Link>
                ) : (
                  <div className="p-8 md:p-12">{body}</div>
                )}
              </motion.div>
            );
          })}
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
          {/* Light gathering on the right — the last equinox frame on the page */}
          <PanelBackdrop name="metal" />
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
            <Button variant="primary" size="lg" className="w-full justify-center" onClick={() => bookCall()}>
                {en ? 'Book a free call' : 'Agenda una llamada gratis'}
              </Button>
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
