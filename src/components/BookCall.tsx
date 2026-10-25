'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { EASE_SETTLE } from '@/lib/animations';
import type { LeadTopic } from '@/lib/supabase/types';
import ContactForm from './ContactForm';

/**
 * "Book a free call" opens the booking form right where the visitor is — no
 * trip to another page. Any button calls `useBookCall()(topic)`; the provider
 * in the root layout renders one popup for the whole site.
 */

const BookCallContext = createContext<(topic?: LeadTopic) => void>(() => {});

export const useBookCall = () => useContext(BookCallContext);

type LenisLike = { stop: () => void; start: () => void };

export function BookCallProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const en = language === 'en';
  const [topic, setTopic] = useState<LeadTopic | null>(null);
  const open = useCallback((t: LeadTopic = 'consultation') => setTopic(t), []);
  const close = useCallback(() => setTopic(null), []);

  // Freeze the page behind the popup — Lenis (when running) and native scroll.
  useEffect(() => {
    if (!topic) return;
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
  }, [topic, close]);

  return (
    <BookCallContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {topic && (
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
            aria-label={en ? 'Book a free call' : 'Agenda una llamada gratis'}
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
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-outline hover:text-primary transition-colors"
              >
                <X size={20} />
              </button>
              <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-3">
                {en ? 'Free · 30 minutes' : 'Gratis · 30 minutos'}
              </p>
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-on-surface mb-8">
                {en ? 'Book your free call' : 'Agenda tu llamada gratis'}
              </h2>
              <ContactForm topic={topic} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookCallContext.Provider>
  );
}
