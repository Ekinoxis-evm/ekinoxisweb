'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBookCall } from '@/components/BookCall';

/** Pages that already are the contact step, or are not for buyers. */
const HIDDEN_ON = ['/admin'];

/**
 * Phones only: once the hero's own button has scrolled away, the next step stays
 * one tap away — book the free call, or message us on Telegram.
 */
export default function MobileCTA() {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const en = language === 'en';
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (HIDDEN_ON.some((p) => pathname?.startsWith(p))) return null;

  return (
    <>
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-black/85 backdrop-blur-xl px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-3 transition-all duration-500 [transition-timing-function:var(--ease-settle)] ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <button type="button" onClick={() => bookCall()}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-surface-container-lowest font-headline font-bold uppercase tracking-wider text-sm py-3"
        >
          {en ? 'Book a free call' : 'Agenda una llamada'}
          <ArrowRight size={16} />
        </button>
        <a
          href="https://t.me/ekinoxis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={en ? 'Message us on Telegram' : 'Escríbenos por Telegram'}
          className="inline-flex items-center justify-center w-12 border border-primary/40 text-primary"
        >
          <Send size={18} />
        </a>
      </div>
      {/* Room at the end of the page so the bar never covers the footer */}
      <div className="md:hidden h-20" aria-hidden="true" />
    </>
  );
}
