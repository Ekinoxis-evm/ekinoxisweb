'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { EASE_SETTLE } from '@/lib/animations';
import type { LeadTopic } from '@/lib/supabase/types';
import Button from './ui/Button';
import PanelBackdrop from './ui/PanelBackdrop';
import { useBookCall } from './BookCall';

type Copy = { title: string; text: string };

/**
 * The last step on a service page: one line, one button, and the booking
 * popup does the rest. Copy defaults to the generic call pitch.
 */
export default function BookCallPanel({ topic, copy }: { topic: LeadTopic; copy?: { en: Copy; es: Copy } }) {
  const { language } = useLanguage();
  const en = language === 'en';
  const bookCall = useBookCall();
  const c = copy?.[language] ?? (en
    ? { title: 'Tell us what you are building', text: 'Book the free call. In 30 minutes you know the scope, the price and the date.' }
    : { title: 'Cuéntanos qué estás construyendo', text: 'Agenda la llamada gratis. En 30 minutos sabes el alcance, el precio y la fecha.' });

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE_SETTLE }}
      className="relative overflow-hidden bg-surface-container-low mt-12 p-8 md:p-12"
    >
      <PanelBackdrop name="metal" />
      {/* Phones stack the copy over the bright side — dim it */}
      <div className="absolute inset-0 bg-black/55 lg:hidden pointer-events-none" />
      <div className="relative">
        <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">
          {en ? 'Free · 30 minutes' : 'Gratis · 30 minutos'}
        </p>
        <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-[0.95] text-on-surface mb-4 max-w-2xl">{c.title}</h2>
        <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">{c.text}</p>
        <Button variant="primary" size="lg" onClick={() => bookCall(topic)} className="w-full sm:w-auto justify-center">
          {en ? 'Book your free call' : 'Agenda tu llamada gratis'}
        </Button>
      </div>
    </motion.section>
  );
}
