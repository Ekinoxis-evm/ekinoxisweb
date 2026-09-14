'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ScanBadge from '@/components/ui/ScanBadge';
import Button from '@/components/ui/Button';
import { fadeInUp } from '@/lib/animations';
import type { ProductWithRelations, SubLink } from '@/lib/supabase/types';

export const STATUS_VARIANT: Record<string, 'muted' | 'secondary' | 'tertiary'> = {
  POC: 'muted',
  MVP: 'muted',
  BETA: 'secondary',
  LAUNCHED: 'tertiary',
};

export function getSubLinks(p: ProductWithRelations): SubLink[] {
  if (!Array.isArray(p.sub_links)) return [];
  return (p.sub_links as SubLink[]).filter((sl) => sl && sl.label);
}

export function SubLinksBlock({ links, label }: { links: SubLink[]; label: string }) {
  if (links.length === 0) return null;
  return (
    <div className="mb-4">
      <p className="font-mono text-[9px] text-outline/60 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex flex-col gap-px bg-outline-variant/10">
        {links.map((sl) => (
          <div key={sl.label} className="flex items-center justify-between gap-3 bg-surface-container px-3 py-2">
            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">{sl.label}</span>
            <div className="flex items-center gap-3 flex-shrink-0">
              {sl.url && (
                <a href={sl.url} target="_blank" rel="noopener noreferrer"
                  className="py-2 px-1 -my-1 font-mono text-[9px] uppercase tracking-widest text-primary/70 hover:text-primary transition-colors duration-200">
                  LIVE
                </a>
              )}
              {sl.repo && (
                <a href={sl.repo} target="_blank" rel="noopener noreferrer"
                  className="py-2 px-1 -my-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-outline hover:text-on-surface transition-colors duration-200">
                  <Image src="/socials/github.png" alt="GitHub" width={11} height={11} className="opacity-60" />
                  REPO
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Fallback for a project with no screenshot yet: the name set in the headline face. */
function NoImage({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-full px-6">
      <span className="font-headline text-2xl font-bold tracking-tighter text-outline-variant/50 text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

interface Props {
  product: ProductWithRelations
  language: 'en' | 'es'
  modulesLabel: string
  uid?: string
}

export default function ProjectCard({ product, language, modulesLabel, uid }: Props) {
  const desc = language === 'en' ? product.description_en : product.description_es;
  const subLinks = getSubLinks(product);

  return (
    <motion.div
      variants={fadeInUp}
      className="relative bg-surface-container-low group hover:bg-surface-container transition-colors duration-500 overflow-hidden flex flex-col"
    >
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
        <ScanBadge variant={STATUS_VARIANT[product.status] ?? 'muted'}>{product.status}</ScanBadge>
      </div>
      {uid && (
        <div className="absolute top-4 left-4 z-10">
          <ScanBadge variant="muted">{uid}</ScanBadge>
        </div>
      )}

      <div className="relative h-48 bg-surface-container overflow-hidden flex-shrink-0">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={product.image_url.startsWith('http')}
          />
        ) : (
          <NoImage name={product.name} />
        )}
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-3">
          {product.name}
        </h3>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-5">
          {desc}
        </p>

        {product.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.categories.map((cat) => (
              <ScanBadge key={cat} variant="secondary">{cat}</ScanBadge>
            ))}
          </div>
        )}

        <SubLinksBlock links={subLinks} label={modulesLabel} />

        {product.hackathon && (
          <p className="font-mono text-[9px] text-outline uppercase tracking-widest mb-4">
            BUILT_AT: {product.hackathon.name}
          </p>
        )}

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

        <div className="mt-auto border-t border-outline-variant/20 pt-4 flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            {product.app_url && (
              <a href={product.app_url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">App</Button>
              </a>
            )}
            {product.website_url && (
              <a href={product.website_url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">{language === 'en' ? 'Website' : 'Sitio'}</Button>
              </a>
            )}
          </div>
          {(product.repo_frontend || product.repo_backend || product.repo_contracts) && (
            <div className="flex gap-2 flex-wrap">
              {([
                ['FE', product.repo_frontend, false],
                ['BE', product.repo_backend, false],
                ['SC', product.repo_contracts, true],
              ] as const)
                .filter(([, href]) => Boolean(href))
                .map(([label, href, isContract]) => (
                  <a key={label} href={href as string} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-colors duration-200 ${
                      isContract
                        ? 'border-tertiary-dim/30 text-tertiary-dim/60 hover:text-tertiary-dim hover:border-tertiary-dim/60'
                        : 'border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline-variant/60'
                    }`}>
                    <Image src="/socials/github.png" alt="GitHub" width={12} height={12} className="opacity-60" />
                    {label}
                  </a>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
