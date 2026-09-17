'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { EducationPartner, CertificationPartner } from '@/lib/supabase/types';

/**
 * Education, certifications and research on one page.
 *
 * These were three separate routes saying closely related things — who we teach
 * with, who certifies our hackers, and what we are researching. /certifications
 * and /research now redirect here and land on their section anchor.
 */

const researchStreams = {
  en: [
    {
      code: 'AI',
      title: 'AI & Agents',
      items: [
        'Copilots and agents that help developers ship faster.',
        'Experimenting with LLMs for automation and support.',
        'Evaluating model safety, latency and costs in real use cases.',
      ],
    },
    {
      code: 'CRP',
      title: 'Applied Cryptography',
      items: [
        'Zero-knowledge proofs for privacy-preserving products.',
        'Key management and self-custody people can actually use.',
        'Verifiable systems over closed black boxes.',
      ],
    },
    {
      code: 'BC3',
      title: 'Blockchain & Web3',
      items: [
        'Real-world asset tokenization for LATAM markets.',
        'Payment rails that settle in minutes, not days.',
        'Onboarding that does not require explaining a seed phrase.',
      ],
    },
  ],
  es: [
    {
      code: 'AI',
      title: 'IA y Agentes',
      items: [
        'Copilotos y agentes que ayudan a los desarrolladores a ir más rápido.',
        'Experimentamos con LLMs para automatización y soporte.',
        'Evaluamos seguridad, latencia y costos de los modelos en casos reales.',
      ],
    },
    {
      code: 'CRP',
      title: 'Criptografía Aplicada',
      items: [
        'Pruebas de conocimiento cero para productos que preservan la privacidad.',
        'Manejo de llaves y autocustodia que la gente sí puede usar.',
        'Sistemas verificables en vez de cajas negras.',
      ],
    },
    {
      code: 'BC3',
      title: 'Blockchain & Web3',
      items: [
        'Tokenización de activos reales para mercados de LATAM.',
        'Rieles de pago que liquidan en minutos, no en días.',
        'Onboarding que no requiere explicar una frase semilla.',
      ],
    },
  ],
};

const SECTIONS = ['education', 'certifications', 'research'] as const;

interface Props {
  universities: EducationPartner[];
  government: EducationPartner[];
  certifications: CertificationPartner[];
}

export default function KnowledgeClient({ universities, government, certifications }: Props) {
  const { language } = useLanguage();
  const t = content[language].learn;
  const edu = content[language].education;
  const cert = content[language].certifications;
  const res = content[language].research;
  const streams = researchStreams[language];

  // /certifications and /research redirect here with a hash. The browser tries
  // to jump before the partner logos have laid out, so it lands short or not at
  // all — re-apply the hash once after mount.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const jump = () => target.scrollIntoView({ block: 'start' });
    jump();
    const again = window.setTimeout(jump, 250);
    return () => window.clearTimeout(again);
  }, []);

  const sectionLabel = {
    education: t.navEducation,
    certifications: t.navCertifications,
    research: t.navResearch,
  };

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* ── Header ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-10 md:mb-16"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6"
            >
              <span className="border border-primary/30 px-2 py-1">{t.navEducation.toUpperCase()}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-headline text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-8"
            >
              {t.description}
            </motion.p>

            {/* Jump strip — the three former pages, now sections */}
            <motion.nav variants={fadeInUp} className="flex flex-wrap gap-px bg-primary/10 w-fit">
              {SECTIONS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary font-mono text-[12px] uppercase tracking-widest px-5 py-3 transition-colors duration-200"
                >
                  {sectionLabel[id]}
                </a>
              ))}
            </motion.nav>
          </motion.div>

          {/* ── 1. Education ── */}
          <section id="education" className="scroll-mt-24 mb-20">
            <SectionHead index="01" label={t.navEducation} title={edu.title} body={edu.description} />

            {/* Banner */}
            <div className="bg-primary px-6 md:px-10 py-6 mb-px flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
              <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-primary uppercase">
                {language === 'en' ? 'Decentralizing Knowledge' : 'Descentralizando el Conocimiento'}
              </h3>
              <ScanBadge className="bg-on-primary/10 border-on-primary/20 text-on-primary" bordered>
                {language === 'en' ? 'ACROSS LATAM' : 'EN TODA LATAM'}
              </ScanBadge>
            </div>

            <PartnerBlock
              badge={<ScanBadge variant="primary">{t.navEducation.toUpperCase()}</ScanBadge>}
              title={edu.universities.title}
              partners={universities}
              columns="grid-cols-2 md:grid-cols-4"
              logoHeight="h-24"
              accent="primary"
            />

            <PartnerBlock
              badge={<ScanBadge variant="secondary">{language === 'en' ? 'GOVERNMENT' : 'GOBIERNO'}</ScanBadge>}
              title={edu.gov.title}
              partners={government}
              columns="grid-cols-2 md:grid-cols-3"
              logoHeight="h-28"
              accent="secondary"
            />
          </section>

          {/* ── 2. Certifications ── */}
          <section id="certifications" className="scroll-mt-24 mb-20">
            <SectionHead index="02" label={t.navCertifications} title={cert.title} body={cert.description} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
              {certifications.map((partner, idx) => (
                <div
                  key={partner.id}
                  className="relative bg-surface-container-low p-8 md:p-12 flex flex-col items-center group hover:bg-surface-container transition-colors duration-500 min-h-[280px]"
                >
                  <div className="absolute top-4 right-4">
                    <ScanBadge variant="muted">{String(idx + 1).padStart(2, '0')}</ScanBadge>
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-tertiary-dim animate-pulse" />
                    <span className="font-mono text-[11px] text-tertiary-dim uppercase tracking-widest">
                      {language === 'en' ? 'ACTIVE' : 'ACTIVO'}
                    </span>
                  </div>
                  <div className="relative w-full h-36 mb-6 mt-6">
                    {partner.logo_url ? (
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={partner.logo_url.startsWith('http')}
                      />
                    ) : null}
                  </div>
                  <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-secondary transition-colors duration-300 text-center">
                    {partner.name}
                  </h3>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary/0 via-secondary/60 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Research ── */}
          <section id="research" className="scroll-mt-24">
            <SectionHead index="03" label={t.navResearch} title={res.title} body={res.description} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-primary/10 mb-px">
              {streams.map((stream) => (
                <div
                  key={stream.code}
                  className="relative bg-surface-container-low p-6 md:p-10 group hover:bg-surface-container transition-colors duration-500"
                >
                  <div className="mb-8">
                    <ScanBadge variant="primary">{stream.code}</ScanBadge>
                  </div>
                  <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-8">
                    {stream.title}
                  </h3>
                  <div className="space-y-4">
                    {stream.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="font-mono text-primary/40 text-[13px] mt-0.5 flex-shrink-0">{'>'}</span>
                        <span className="font-body text-sm text-on-surface-variant leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10">
              <div className="bg-surface-container-low p-6 md:p-10">
                <div className="mb-6">
                  <ScanBadge variant="secondary">
                    {language === 'en' ? 'RESEARCH → PRODUCTS' : 'INVESTIGACIÓN → PRODUCTOS'}
                  </ScanBadge>
                </div>
                <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface mb-4">
                  {language === 'en' ? 'From experiments to live products' : 'De experimentos a productos en producción'}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
                  {language === 'en'
                    ? 'Every line of research ends up somewhere real: a hackathon project, a pilot with a partner, or a tool our own team uses daily.'
                    : 'Cada línea de investigación termina en algo real: un proyecto de hackathon, un piloto con un aliado, o una herramienta que usamos a diario.'}
                </p>
                <div className="space-y-3">
                  {[
                    language === 'en'
                      ? 'Prototype fast in hacker houses, refine what works.'
                      : 'Prototipamos rápido en hacker houses y refinamos lo que funciona.',
                    language === 'en'
                      ? 'Document what we learn, openly, for builders across LATAM.'
                      : 'Documentamos lo que aprendemos, abiertamente, para builders de LATAM.',
                    language === 'en'
                      ? 'Innovation by default — a practice, not a slogan.'
                      : 'Innovación por defecto — una práctica, no un slogan.',
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="font-mono text-secondary/50 text-[13px] mt-0.5 flex-shrink-0">{'>'}</span>
                      <span className="font-body text-sm text-on-surface-variant leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-primary/10">
                {[
                  { label: language === 'en' ? 'Products shipped' : 'Productos lanzados', value: '8+' },
                  { label: language === 'en' ? 'Hackathons' : 'Hackathones', value: '5+' },
                  { label: language === 'en' ? 'University partners' : 'Universidades aliadas', value: String(universities.length) },
                  { label: language === 'en' ? 'Certification partners' : 'Certificadores aliados', value: String(certifications.length) },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-surface-container-low p-8 flex flex-col justify-end min-h-[150px]">
                    <p className="font-headline text-4xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="font-label text-[13px] font-medium text-outline uppercase tracking-widest leading-relaxed">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </AnimatedBackground>
  );
}

/* ── Local bits ── */

function SectionHead({
  index,
  label,
  title,
  body,
}: {
  index: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mb-8">
      <span className="font-mono text-[12px] text-primary tracking-widest uppercase block mb-4">
        {index} / {label}
      </span>
      <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter text-on-surface uppercase mb-4">
        {title}
      </h2>
      <p className="font-body text-on-surface-variant max-w-2xl leading-relaxed">{body}</p>
    </div>
  );
}

function PartnerBlock({
  badge,
  title,
  partners,
  columns,
  logoHeight,
  accent,
}: {
  badge: React.ReactNode;
  title: string;
  partners: EducationPartner[];
  columns: string;
  logoHeight: string;
  accent: 'primary' | 'secondary';
}) {
  if (partners.length === 0) return null;
  return (
    <div className="mb-px">
      <div className="bg-surface-container-low border-b border-primary/10 px-6 md:px-10 py-5 flex items-center gap-4">
        {badge}
        <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface">{title}</h3>
      </div>
      <div className={`grid ${columns} gap-px bg-primary/10`}>
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="relative bg-surface-container-low p-6 md:p-10 flex flex-col items-center justify-center group hover:bg-surface-container transition-colors duration-500 min-h-[180px]"
          >
            <div className={`relative w-full ${logoHeight} mb-4`}>
              {partner.logo_url ? (
                <Image
                  src={partner.logo_url}
                  alt={partner.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized={partner.logo_url.startsWith('http')}
                />
              ) : null}
            </div>
            <p className="font-label text-[13px] font-medium text-outline uppercase tracking-widest text-center">
              {partner.name}
            </p>
            <div
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${
                accent === 'primary'
                  ? 'from-primary/0 via-primary/60 to-primary/0'
                  : 'from-secondary/0 via-secondary/60 to-secondary/0'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
