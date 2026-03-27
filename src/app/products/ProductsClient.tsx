'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { ProductWithRelations, HackathonWithStatus } from '@/lib/supabase/types';

const STATUS_VARIANT: Record<string, 'muted' | 'secondary' | 'tertiary'> = {
  POC: 'muted',
  MVP: 'muted',
  BETA: 'secondary',
  LAUNCHED: 'tertiary',
}

interface Props {
  products: ProductWithRelations[]
  hackathons: HackathonWithStatus[]
}

export default function ProductsClient({ products, hackathons }: Props) {
  const { language } = useLanguage();
  const t = content[language].products;

  const [featured, ...rest] = products;

  const desc = (p: ProductWithRelations) =>
    language === 'en' ? p.description_en : p.description_es;

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
              <span className="border border-primary/30 px-2 py-1">PRODUCT_REGISTRY</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface">
                {t.title}
              </h1>
              <p className="font-body text-lg text-on-surface-variant max-w-sm leading-relaxed">
                {t.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Featured Product (full-width) */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-surface-container-low border border-primary/10 mb-px group hover:bg-surface-container transition-colors duration-500"
            >
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <ScanBadge variant={STATUS_VARIANT[featured.status] ?? 'muted'}>{featured.status}</ScanBadge>
                <ScanBadge variant="primary">PROD_01 / FEATURED</ScanBadge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image side */}
                <div className="relative h-72 lg:h-96 bg-surface-container overflow-hidden">
                  {featured.image_url ? (
                    <Image
                      src={featured.image_url}
                      alt={featured.name}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={featured.image_url.startsWith('http')}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="font-mono text-[10px] text-outline/40 uppercase tracking-widest">NO_IMAGE</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low/50" />
                </div>
                {/* Info side */}
                <div className="p-12 flex flex-col justify-between">
                  <div>
                    <h2 className="font-headline text-4xl font-bold tracking-tighter text-on-surface mb-4">
                      {featured.name}
                    </h2>
                    <p className="font-body text-on-surface-variant leading-relaxed mb-6">
                      {desc(featured)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featured.categories?.map((cat) => (
                        <ScanBadge key={cat} variant="secondary">{cat}</ScanBadge>
                      ))}
                      {featured.technologies?.map((tech) => (
                        <ScanBadge key={tech} variant="muted">{tech}</ScanBadge>
                      ))}
                    </div>
                    {featured.hackathon && (
                      <p className="font-mono text-[10px] text-outline uppercase tracking-widest mb-4">
                        BUILT_AT: {featured.hackathon.name}
                      </p>
                    )}
                    {featured.hackers && featured.hackers.length > 0 && (
                      <div>
                        <p className="font-mono text-[9px] text-outline/60 uppercase tracking-widest mb-3">BUILT_BY</p>
                        <div className="flex flex-wrap gap-3">
                          {featured.hackers.map((h) => (
                            <div key={h.id} className="flex items-center gap-2">
                              {h.image_url && (
                                <div className="relative w-7 h-7 overflow-hidden flex-shrink-0">
                                  <Image src={h.image_url} alt={h.name} fill className="object-cover grayscale" unoptimized={h.image_url.startsWith('http')} />
                                </div>
                              )}
                              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{h.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 flex flex-col gap-3">
                    {/* Live URLs */}
                    <div className="flex gap-3 flex-wrap">
                      {featured.app_url && (
                        <a href={featured.app_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="primary" size="sm">{language === 'en' ? 'Launch App' : 'Abrir App'}</Button>
                        </a>
                      )}
                      {featured.website_url && (
                        <a href={featured.website_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">{language === 'en' ? 'Website' : 'Sitio Web'}</Button>
                        </a>
                      )}
                    </div>
                    {/* Repos */}
                    {(featured.repo_frontend || featured.repo_backend || featured.repo_contracts) && (
                      <div className="flex gap-3 flex-wrap">
                        {featured.repo_frontend && (
                          <a href={featured.repo_frontend} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline-variant/60 transition-colors duration-200">
                            <Image src="/socials/github.png" alt="GitHub" width={14} height={14} className="opacity-60" />
                            FRONTEND
                          </a>
                        )}
                        {featured.repo_backend && (
                          <a href={featured.repo_backend} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline-variant/60 transition-colors duration-200">
                            <Image src="/socials/github.png" alt="GitHub" width={14} height={14} className="opacity-60" />
                            BACKEND
                          </a>
                        )}
                        {featured.repo_contracts && (
                          <a href={featured.repo_contracts} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-tertiary-dim/30 text-tertiary-dim/60 hover:text-tertiary-dim hover:border-tertiary-dim/60 transition-colors duration-200">
                            <Image src="/socials/github.png" alt="GitHub" width={14} height={14} className="opacity-60" />
                            CONTRACTS
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Remaining Products Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10"
          >
            {rest.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="relative bg-surface-container-low group hover:bg-surface-container transition-colors duration-500 overflow-hidden"
              >
                {/* Status */}
                <div className="absolute top-4 right-4 z-10">
                  <ScanBadge variant={STATUS_VARIANT[product.status] ?? 'muted'}>{product.status}</ScanBadge>
                </div>

                {/* Image */}
                <div className="relative h-48 bg-surface-container overflow-hidden">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={product.image_url.startsWith('http')}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="font-mono text-[10px] text-outline/40 uppercase tracking-widest">NO_IMAGE</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-8">
                  <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-3">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-5">
                    {desc(product)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.categories?.map((cat) => (
                      <ScanBadge key={cat} variant="secondary">{cat}</ScanBadge>
                    ))}
                  </div>

                  {product.hackers && product.hackers.length > 0 && (
                    <div className="mb-4">
                      <p className="font-mono text-[9px] text-outline/60 uppercase tracking-widest mb-2">BUILT_BY</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {product.hackers.map((h) => (
                          <div key={h.id} className="flex items-center gap-1.5">
                            {h.image_url && (
                              <div className="relative w-5 h-5 overflow-hidden flex-shrink-0">
                                <Image src={h.image_url} alt={h.name} fill className="object-cover grayscale" unoptimized={h.image_url.startsWith('http')} />
                              </div>
                            )}
                            <span className="font-mono text-[9px] text-outline uppercase tracking-widest">{h.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-outline-variant/20 pt-4 flex flex-col gap-2">
                    {/* Live URLs */}
                    <div className="flex gap-2 flex-wrap">
                      {product.app_url && (
                        <a href={product.app_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">{language === 'en' ? 'App' : 'App'}</Button>
                        </a>
                      )}
                      {product.website_url && (
                        <a href={product.website_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">{language === 'en' ? 'Website' : 'Sitio'}</Button>
                        </a>
                      )}
                    </div>
                    {/* Repos */}
                    {(product.repo_frontend || product.repo_backend || product.repo_contracts) && (
                      <div className="flex gap-2 flex-wrap">
                        {product.repo_frontend && (
                          <a href={product.repo_frontend} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline-variant/60 transition-colors duration-200">
                            <Image src="/socials/github.png" alt="GitHub" width={12} height={12} className="opacity-60" />
                            FE
                          </a>
                        )}
                        {product.repo_backend && (
                          <a href={product.repo_backend} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline-variant/60 transition-colors duration-200">
                            <Image src="/socials/github.png" alt="GitHub" width={12} height={12} className="opacity-60" />
                            BE
                          </a>
                        )}
                        {product.repo_contracts && (
                          <a href={product.repo_contracts} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-tertiary-dim/30 text-tertiary-dim/60 hover:text-tertiary-dim hover:border-tertiary-dim/60 transition-colors duration-200">
                            <Image src="/socials/github.png" alt="GitHub" width={12} height={12} className="opacity-60" />
                            SC
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 flex items-center justify-between font-mono text-[10px] text-outline tracking-widest uppercase"
          >
            <span>PRODUCT_COUNT: {products.length}</span>
            <span>IP_STATUS: IN_HOUSE_GENERATED</span>
            <span>REGISTRY: EKINOXIS_LABS_2024</span>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
