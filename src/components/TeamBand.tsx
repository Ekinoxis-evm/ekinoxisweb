'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { EASE_SETTLE } from '@/lib/animations';
import SocialLinks from './ui/SocialLinks';
import type { Hacker } from '@/lib/supabase/types';

type LenisLike = { stop: () => void; start: () => void };

/** Repeat the team until a half holds at least this many faces, so a wide screen never shows the seam. */
const MIN_PER_HALF = 10;

/**
 * The people, sliding past like the logo bands. Hover pauses the row; a click
 * opens that person's profile and links in a popup. With reduced motion the
 * repeats hide and the row wraps.
 */
export default function TeamBand({ hackers, label, title }: { hackers: Hacker[]; label: string; title: string }) {
  const { language } = useLanguage();
  const en = language === 'en';
  const [open, setOpen] = useState<Hacker | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const team = hackers.filter((h) => h.image_url);
  const half: Hacker[] = [];
  while (team.length && half.length < Math.max(MIN_PER_HALF, team.length)) half.push(...team);

  // Freeze the page behind the popup, close on Escape
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!team.length) return null;

  const tile = (h: Hacker, key: string, repeat: boolean) => (
    <li key={key} aria-hidden={repeat || undefined} className={repeat ? 'motion-reduce:hidden' : undefined}>
      <button
        type="button"
        tabIndex={repeat ? -1 : 0}
        onClick={() => setOpen(h)}
        className="group block w-40 md:w-48 bg-surface-container-low text-left border border-primary/10 hover:border-primary/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="relative block aspect-square overflow-hidden">
          <Image
            src={h.image_url}
            alt={h.name}
            fill
            sizes="192px"
            unoptimized={h.image_url.startsWith('http')}
            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          />
        </span>
        <span className="block px-3 py-3 font-label text-[13px] font-semibold text-on-surface-variant group-hover:text-primary transition-colors truncate">
          {h.name}
        </span>
      </button>
    </li>
  );

  const profile = open ? (en ? open.profile_en : open.profile_es) : '';
  const school = open?.university && open.university !== 'Anon' ? open.university : null;

  return (
    <section id="team" className="relative z-10 border-y border-primary/10 bg-black/60 overflow-hidden scroll-mt-24">
      <div className="max-w-screen-2xl mx-auto px-6 pt-10 pb-8">
        <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-3">{label}</p>
        <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface">{title}</h2>
      </div>
      <div className="marquee relative pb-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-black to-transparent" />
        <div className="animate-marquee flex w-max motion-reduce:w-auto" style={{ ['--marquee-duration' as string]: `${half.length * 5}s` }}>
          <ul className="flex gap-4 pr-4 motion-reduce:flex-wrap motion-reduce:px-6">
            {half.map((h, i) => tile(h, `${h.id}-${i}`, i >= team.length))}
          </ul>
          <ul className="flex gap-4 pr-4 motion-reduce:hidden" aria-hidden="true">
            {half.map((h, i) => tile(h, `dup-${h.id}-${i}`, true))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="hacker"
            className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={open.name}
          >
            <motion.div
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: EASE_SETTLE }}
              className="relative w-full sm:max-w-2xl max-h-[92svh] overflow-y-auto bg-surface-container-low border border-primary/20 shadow-[0_0_60px_rgba(143,245,255,0.12)] grid grid-cols-1 sm:grid-cols-[220px_1fr]"
            >
              <button
                type="button"
                onClick={close}
                aria-label={en ? 'Close' : 'Cerrar'}
                className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center bg-black/50 text-on-surface hover:text-primary transition-colors"
              >
                <X size={20} />
              </button>
              <div className="relative aspect-square sm:aspect-auto sm:min-h-[280px]">
                <Image src={open.image_url} alt={open.name} fill sizes="(min-width: 640px) 220px, 100vw" unoptimized={open.image_url.startsWith('http')} className="object-cover" />
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface mb-1 pr-8">{open.name}</h3>
                {school && <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">{school}</p>}
                {profile && <p className="font-body text-[15px] text-on-surface-variant leading-relaxed mb-6">{profile}</p>}
                <div className="mt-auto">
                  <SocialLinks
                    github={open.github || null}
                    linkedin={open.linkedin || null}
                    x={open.x || null}
                    telegram={open.telegram}
                    discord={open.discord}
                    website={open.website}
                    size={22}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
