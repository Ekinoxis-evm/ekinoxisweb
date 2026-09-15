'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import type { LeadTopic } from '@/lib/supabase/types';

/**
 * The contact form. One component, one `topic` per page.
 *
 * Five visible fields — name, email, WhatsApp, budget, message. Every extra
 * field costs completions, so anything we can infer (which page, which
 * language, where they came from) is set for them rather than asked.
 *
 * Telegram stays available underneath as a secondary path for the people who
 * prefer it, but it is no longer the only way to reach us: a t.me link
 * captures nothing if the visitor never sends the message.
 */

const TELEGRAM = 'https://t.me/ekinoxis';

const COPY = {
  en: {
    name: 'Your name',
    email: 'Email',
    whatsapp: 'WhatsApp or phone',
    optional: 'optional',
    company: 'Company',
    budget: 'Budget',
    budgetAsk: 'Rough budget',
    message: 'What do you need?',
    messageHint: 'A couple of sentences is plenty.',
    send: 'Send',
    sending: 'Sending…',
    sentTitle: 'Got it.',
    sentBody: 'We normally reply the same working day. Check your email for a confirmation.',
    errorGeneric: 'Something went wrong. Try again, or message us on Telegram.',
    orTelegram: 'Prefer Telegram?',
    telegramCta: 'Message us there',
    required: 'Required',
    budgets: ['Not sure yet', 'Under $2,000', '$2,000 – $6,000', '$6,000 – $15,000', '$15,000 – $40,000', 'Over $40,000'],
  },
  es: {
    name: 'Tu nombre',
    email: 'Correo',
    whatsapp: 'WhatsApp o teléfono',
    optional: 'opcional',
    company: 'Empresa',
    budget: 'Presupuesto',
    budgetAsk: 'Presupuesto aproximado',
    message: '¿Qué necesitas?',
    messageHint: 'Con un par de frases basta.',
    send: 'Enviar',
    sending: 'Enviando…',
    sentTitle: 'Listo.',
    sentBody: 'Normalmente respondemos el mismo día hábil. Te llegará un correo de confirmación.',
    errorGeneric: 'Algo salió mal. Intenta de nuevo, o escríbenos por Telegram.',
    orTelegram: '¿Prefieres Telegram?',
    telegramCta: 'Escríbenos ahí',
    required: 'Obligatorio',
    budgets: ['Aún no sé', 'Menos de $2,000', '$2,000 – $6,000', '$6,000 – $15,000', '$15,000 – $40,000', 'Más de $40,000'],
  },
};

const field =
  'w-full bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 ' +
  'outline-none text-on-surface font-body text-sm px-4 py-3 transition-colors placeholder:text-outline/70';

const label = 'font-mono text-[10px] text-outline uppercase tracking-widest mb-2 block';

interface Props {
  topic: LeadTopic;
  /** Show the budget band selector. Off for talks and general enquiries. */
  showBudget?: boolean;
  className?: string;
}

export default function ContactForm({ topic, showBudget = true, className = '' }: Props) {
  const { language } = useLanguage();
  const t = COPY[language];

  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;

    const form = new FormData(e.currentTarget);
    setState('sending');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          language,
          name: form.get('name'),
          email: form.get('email'),
          whatsapp: form.get('whatsapp'),
          company: form.get('company'),
          budget: form.get('budget'),
          message: form.get('message'),
          website: form.get('website'), // honeypot — people never see this
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? t.errorGeneric);
        setState('error');
        return;
      }
      setState('sent');
    } catch {
      setError(t.errorGeneric);
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-surface-container-low border border-primary/20 p-8 md:p-10 ${className}`}
      >
        <h3 className="font-headline text-2xl font-bold tracking-tighter text-primary uppercase mb-3">
          {t.sentTitle}
        </h3>
        <p className="font-body text-on-surface-variant leading-relaxed">{t.sentBody}</p>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Honeypot: off-screen, not display:none — some bots skip hidden fields. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor={`website-${topic}`}>Website</label>
          <input id={`website-${topic}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={label} htmlFor={`name-${topic}`}>
              {t.name} <span className="text-primary">*</span>
            </label>
            <input id={`name-${topic}`} name="name" type="text" required maxLength={120} className={field} autoComplete="name" />
          </div>
          <div>
            <label className={label} htmlFor={`email-${topic}`}>
              {t.email} <span className="text-primary">*</span>
            </label>
            <input id={`email-${topic}`} name="email" type="email" required maxLength={254} className={field} autoComplete="email" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={label} htmlFor={`whatsapp-${topic}`}>
              {t.whatsapp} <span className="text-outline/60">({t.optional})</span>
            </label>
            <input id={`whatsapp-${topic}`} name="whatsapp" type="tel" maxLength={40} className={field} autoComplete="tel" />
          </div>
          {showBudget ? (
            <div>
              <label className={label} htmlFor={`budget-${topic}`}>
                {t.budgetAsk} <span className="text-outline/60">({t.optional})</span>
              </label>
              <select id={`budget-${topic}`} name="budget" className={field} defaultValue="">
                <option value="">—</option>
                {t.budgets.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className={label} htmlFor={`company-${topic}`}>
                {t.company} <span className="text-outline/60">({t.optional})</span>
              </label>
              <input id={`company-${topic}`} name="company" type="text" maxLength={160} className={field} autoComplete="organization" />
            </div>
          )}
        </div>

        <div>
          <label className={label} htmlFor={`message-${topic}`}>
            {t.message} <span className="text-primary">*</span>
          </label>
          <textarea
            id={`message-${topic}`}
            name="message"
            required
            rows={4}
            maxLength={4000}
            className={`${field} resize-y`}
            placeholder={t.messageHint}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="font-mono text-[11px] text-error uppercase tracking-widest"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
          <Button type="submit" variant="primary" size="lg" disabled={state === 'sending'}>
            {state === 'sending' ? t.sending : t.send}
          </Button>
          <span className="font-mono text-[10px] text-outline uppercase tracking-widest">
            {t.orTelegram}{' '}
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/80 hover:text-primary transition-colors"
            >
              {t.telegramCta} →
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
