'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import CaseStudyBody from '@/components/portfolio/CaseStudyBody';
import { STATUS_VARIANT } from '@/components/portfolio/ProjectCard';
import { useBookCall } from '@/components/BookCall';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { Division } from '@/lib/portfolio';
import type { ProductWithRelations, ProofItem } from '@/lib/supabase/types';

interface Props {
  division: Division
  product: ProductWithRelations
}

/** Blockscout explorers by chain name, for proof rows that carry an address but no URL. */
const EXPLORERS: Record<string, string> = {
  ethereum: 'https://eth.blockscout.com',
  optimism: 'https://optimism.blockscout.com',
  base: 'https://base.blockscout.com',
  polygon: 'https://polygon.blockscout.com',
  arbitrum: 'https://arbitrum.blockscout.com',
};

function proofItems(p: ProductWithRelations): ProofItem[] {
  if (!Array.isArray(p.proof)) return [];
  return (p.proof as ProofItem[]).filter((x) => x && typeof x.label === 'string' && x.label.trim());
}

function proofHref(item: ProofItem): string | null {
  if (item.url) return item.url;
  const base = item.chain ? EXPLORERS[item.chain.toLowerCase()] : undefined;
  return base && item.address ? `${base}/address/${item.address}` : null;
}

function short(address: string) {
  return address.length > 14 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address;
}

export default function CaseStudyClient({ division, product }: Props) {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const t = content[language].portfolio.caseStudy;
  const divisionCopy = division[language];

  // A study written in one language still shows in the other rather than going blank.
  const body = (language === 'en'
    ? product.case_study_en || product.case_study_es
    : product.case_study_es || product.case_study_en) ?? '';
  const desc = language === 'en' ? product.description_en : product.description_es;
  const proof = proofItems(product);
  const gallery = (product.gallery ?? []).filter(Boolean);
  const cover = product.image_url || null;
  const logo = product.logo_url || null;
  const links = [
    product.website_url && { href: product.website_url, label: t.visit },
    product.app_url && { href: product.app_url, label: 'App' },
    product.instagram && { href: product.instagram, label: 'Instagram' },
    product.repo_frontend && { href: product.repo_frontend, label: 'GitHub · FE' },
    product.repo_backend && { href: product.repo_backend, label: 'GitHub · BE' },
    product.repo_contracts && { href: product.repo_contracts, label: 'GitHub · SC' },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <AnimatedBackground variant="grid">
      <article className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="rise flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[12px] text-primary tracking-widest uppercase mb-10">
            <Link href="/portfolio" className="border border-primary/30 px-2 py-2 hover:bg-primary/10 transition-colors duration-200">
              PORTFOLIO
            </Link>
            <span className="text-outline" aria-hidden="true">/</span>
            <Link href={`/portfolio/${division.slug}`} className="border border-primary/30 px-2 py-2 hover:bg-primary/10 transition-colors duration-200">
              {divisionCopy.short}
            </Link>
            <span className="text-outline" aria-hidden="true">/</span>
            <span aria-current="page" className="border border-primary/30 px-2 py-2 bg-primary/10">{product.name}</span>
          </nav>

          {/* Header */}
          <header className="rise grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-end mb-16">
            <div>
              <div className="flex flex-wrap items-start gap-2 mb-6">
                <ScanBadge variant="primary">{t.badge}</ScanBadge>
                <ScanBadge variant={STATUS_VARIANT[product.status] ?? 'muted'}>{product.status}</ScanBadge>
              </div>
              <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface break-words">
                {product.name}
              </h1>
            </div>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-xl">{desc}</p>
          </header>

          {/* Cover */}
          {(cover || logo) && (
            <div className="relative mb-16 bg-surface-container-low">
              {cover ? (
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                  <Image
                    src={cover}
                    alt=""
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1536px) 100vw, 1536px"
                    unoptimized={cover.startsWith('http')}
                  />
                </div>
              ) : (
                <div className="relative h-56 flex items-center justify-center px-10">
                  <div className="relative h-32 w-full max-w-[260px]">
                    <Image src={logo!} alt="" fill className="object-contain" sizes="260px" unoptimized={logo!.startsWith('http') || logo!.endsWith('.svg')} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Body + facts */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 mb-24">
            <CaseStudyBody source={body} />

            <aside className="flex flex-col gap-px bg-primary/10 self-start lg:sticky lg:top-28">
              {product.technologies?.length > 0 && (
                <div className="bg-surface-container-low p-6">
                  <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-4">{t.stack}</p>
                  <ul className="flex flex-wrap items-start gap-2">
                    {product.technologies.map((tech) => (
                      <li key={tech} className="font-mono text-[12px] uppercase tracking-widest text-on-surface-variant border border-primary/20 bg-surface-container px-2 py-1">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.hackathon && (
                <div className="bg-surface-container-low p-6">
                  <p className="font-mono text-[12px] text-outline uppercase tracking-widest">
                    {language === 'en' ? 'Built at' : 'Hecho en'} <span className="text-on-surface">{product.hackathon.name}</span>
                  </p>
                </div>
              )}
              {links.length > 0 && (
                <ul className="bg-surface-container-low flex flex-col gap-px">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] items-center justify-between gap-3 px-6 py-3 font-mono text-[12px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200"
                      >
                        {l.label}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>

          {/* Proof */}
          {proof.length > 0 && (
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-24"
              aria-labelledby="proof-title"
            >
              <motion.div variants={fadeInUp} className="mb-8 max-w-2xl">
                <h2 id="proof-title" className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface mb-3">
                  {t.proof}
                </h2>
                <p className="font-body text-base text-on-surface-variant">{t.proofNote}</p>
              </motion.div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10">
                {proof.map((item, i) => {
                  const href = proofHref(item);
                  const inner = (
                    <>
                      <span className="font-headline text-lg font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors duration-200">
                        {item.label}
                      </span>
                      <span className="flex flex-wrap items-center gap-2">
                        {item.chain && <ScanBadge variant="secondary">{item.chain}</ScanBadge>}
                        {item.address && (
                          <span className="font-mono text-[12px] text-outline tracking-wider" title={item.address}>
                            <span className="sr-only">{t.address}: </span>{short(item.address)}
                          </span>
                        )}
                      </span>
                    </>
                  );
                  return (
                    <motion.li key={`${item.label}-${i}`} variants={fadeInUp} className="bg-surface-container-low">
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full min-h-[44px] flex-col gap-3 p-6 md:p-8 hover:bg-surface-container transition-colors duration-500">
                          {inner}
                        </a>
                      ) : (
                        <div className="flex h-full flex-col gap-3 p-6 md:p-8">{inner}</div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.section>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <section className="mb-24" aria-labelledby="gallery-title">
              <h2 id="gallery-title" className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface mb-8">
                {t.gallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10">
                {gallery.map((src, i) => (
                  <div key={src} className="relative aspect-[16/10] bg-surface-container-low overflow-hidden">
                    <Image
                      src={src}
                      alt={`${product.name} — ${i + 1}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={src.startsWith('http')}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Next step: the one cyan action on the page */}
          <section className="bg-surface-container-low p-6 md:p-10 lg:p-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface mb-4">
                {t.nextTitle}
              </h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">{t.nextBody}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto min-h-[44px]" onClick={() => bookCall()}>
                {t.nextCta}
              </Button>
              <Link
                href={`/portfolio/${division.slug}`}
                className="inline-flex min-h-[44px] items-center justify-center px-6 font-mono text-[12px] uppercase tracking-widest text-on-surface-variant border border-outline-variant hover:text-primary hover:border-primary transition-colors duration-200"
              >
                {t.back} {divisionCopy.short}
              </Link>
            </div>
          </section>
        </div>
      </article>
    </AnimatedBackground>
  );
}
