'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ScanBadge from '@/components/ui/ScanBadge';
import { fadeInUp } from '@/lib/animations';
import type { ProductWithRelations } from '@/lib/supabase/types';

/**
 * Clients read as a logo wall, not a spec sheet: the client's mark, what we
 * built for them, and the two links that matter — their site and their
 * Instagram. For several clients Instagram is the only web presence there is,
 * so it is a first-class link here rather than a footnote.
 */
interface Props {
  client: ProductWithRelations
  language: 'en' | 'es'
  uid: string
}

export default function ClientCard({ client, language, uid }: Props) {
  const desc = language === 'en' ? client.description_en : client.description_es;
  const logo = client.logo_url || client.image_url || null;

  return (
    <motion.div
      variants={fadeInUp}
      className="relative bg-surface-container-low group hover:bg-surface-container transition-colors duration-500 flex flex-col"
    >
      <div className="absolute top-4 left-4 z-10">
        <ScanBadge variant="muted">{uid}</ScanBadge>
      </div>

      {/*
        Client marks arrive in two incompatible shapes: transparent logos drawn
        for a dark background (Talentum), and opaque light-background profile
        avatars (LIVE!, SWRFM, MGM). A full-width greyscale plate flatters the
        first and ruins the second. A fixed square tile suits both — the opaque
        ones read as deliberate chips instead of glaring bands — so the mark
        keeps its own colour, which for MGM and SWRFM *is* the brand.
      */}
      <div className="relative h-40 bg-surface-container flex items-center justify-center px-10 flex-shrink-0">
        {logo ? (
          <div className="relative w-24 h-24">
            <Image
              src={logo}
              alt={client.name}
              fill
              className="object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-500"
              sizes="96px"
              unoptimized={logo.startsWith('http')}
            />
          </div>
        ) : (
          <span className="font-headline text-3xl font-bold tracking-tighter text-outline-variant/60 group-hover:text-on-surface/80 transition-colors duration-500 text-center leading-tight">
            {client.name}
          </span>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-headline text-xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300 mb-3">
          {client.name}
        </h3>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
          {desc}
        </p>

        <div className="mt-auto border-t border-outline-variant/20 pt-4 flex flex-wrap items-center gap-2">
          {client.website_url && (
            <a
              href={client.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] uppercase tracking-widest px-3 py-2 border border-primary/25 text-primary/80 hover:bg-primary hover:text-surface-container-lowest hover:border-primary transition-colors duration-200"
            >
              {language === 'en' ? 'Website' : 'Sitio'}
            </a>
          )}
          {client.app_url && (
            <a
              href={client.app_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] uppercase tracking-widest px-3 py-2 border border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline-variant/60 transition-colors duration-200"
            >
              App
            </a>
          )}
          {client.instagram && (
            <a
              href={client.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${client.name} on Instagram`}
              className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-2 border border-outline-variant/30 text-outline hover:text-on-surface hover:border-outline-variant/60 transition-colors duration-200"
            >
              <Image
                src="/socials/instagram.webp"
                alt=""
                width={12}
                height={12}
                className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
              Instagram
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
