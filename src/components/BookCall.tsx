'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { track } from '@vercel/analytics';
import { useLanguage } from '@/contexts/LanguageContext';
import { EASE_SETTLE } from '@/lib/animations';
import type { LeadTopic } from '@/lib/supabase/types';
import type { LeadPreset } from '@/lib/leadForms';
import ContactForm from './ContactForm';

/**
 * "Book a free call" opens the booking form right where the visitor is — no
 * trip to another page. Any button calls `useBookCall()(topic, preset?)`; the
 * preset pre-answers a question (the pricing card they clicked, the topic they
 * were reading). The provider in the root layout renders one popup for the
 * whole site.
 */

/** No topic: the popup first asks which service (the master form). */
type Open = (topic?: LeadTopic | null, preset?: LeadPreset) => void;

const BookCallContext = createContext<Open>(() => {});

export const useBookCall = () => useContext(BookCallContext);

type LenisLike = { stop: () => void; start: () => void };

const HEADER: Record<LeadTopic | 'any', { en: [string, string]; es: [string, string] }> = {
  any: { en: ['Free · 30 minutes', 'Book your free call'], es: ['Gratis · 30 minutos', 'Agenda tu llamada gratis'] },
  consultation: { en: ['Free · 30 minutes', 'Book your free call'], es: ['Gratis · 30 minutos', 'Agenda tu llamada gratis'] },
  web: { en: ['Free · 30 minutes', 'Book your free call'], es: ['Gratis · 30 minutos', 'Agenda tu llamada gratis'] },
  app: { en: ['Free · 30 minutes', 'Book your free call'], es: ['Gratis · 30 minutos', 'Agenda tu llamada gratis'] },
  talk: { en: ['Talks', 'Invite us to speak'], es: ['Charlas', 'Invítanos a hablar'] },
  course: { en: ['Courses', 'Ask about the course'], es: ['Cursos', 'Pregunta por el curso'] },
  general: { en: ['Write to us', 'Tell us what you are building'], es: ['Escríbenos', 'Cuéntanos qué estás construyendo'] },
};

export function BookCallProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const en = language === 'en';
  const [open, setOpen] = useState<{ topic: LeadTopic | null; preset?: LeadPreset } | null>(null);
  const show = useCallback<Open>((topic = null, preset) => {
    setOpen({ topic, preset });
    track('book_call_open', { topic: topic ?? 'any' });
  }, []);
  const close = useCallback(() => setOpen(null), []);

  // Freeze the page behind the popup — Lenis (when running) and native scroll.
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

  const header = open ? HEADER[open.topic ?? 'any'][language] : null;

  return (
    <BookCallContext.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && header && (
          <motion.div
            key="book-call"
            className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={header[1]}
          >
            <motion.div
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: EASE_SETTLE }}
              className="relative w-full sm:max-w-2xl max-h-[92svh] overflow-y-auto bg-surface-container-low border border-primary/20 shadow-[0_0_60px_rgba(143,245,255,0.12)] p-6 md:p-10"
            >
              <button
                type="button"
                onClick={close}
                aria-label={en ? 'Close' : 'Cerrar'}
                className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-outline hover:text-primary transition-colors"
              >
                <X size={20} />
              </button>
              <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-3">{header[0]}</p>
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-on-surface mb-8 pr-10">{header[1]}</h2>
              <ContactForm key={`${open.topic ?? 'any'}-${JSON.stringify(open.preset ?? {})}`} topic={open.topic} preset={open.preset} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookCallContext.Provider>
  );
}
