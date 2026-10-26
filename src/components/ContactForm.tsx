'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import type { LeadTopic } from '@/lib/supabase/types';
import { bookingDays, type BookingDay } from '@/lib/booking';

/**
 * The booking form: pick a day and a time for the free call, then four fields —
 * first name, last name, email, WhatsApp with its country code. Every extra field
 * costs completions; what the visitor wants is the call itself, so we ask for
 * that and nothing more. Slots are shown in the visitor's own time zone.
 * Which page, which language and where they came from are recorded for them.
 */

const TELEGRAM = 'https://t.me/ekinoxis';

/** Our two markets first, then the rest of the Americas and Spain. */
const COUNTRIES = [
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+1', flag: '🇺🇸', name: 'USA / Canada' },
  { code: '+52', flag: '🇲🇽', name: 'México' },
  { code: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+51', flag: '🇵🇪', name: 'Perú' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+55', flag: '🇧🇷', name: 'Brasil' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+34', flag: '🇪🇸', name: 'España' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
];

const COPY = {
  en: {
    first: 'First name',
    last: 'Last name',
    email: 'Email',
    whatsapp: 'WhatsApp or phone',
    country: 'Country code',
    day: 'Pick a day',
    time: 'Pick a time',
    yourTime: 'your time',
    pickSlot: 'Pick a day and time for the call.',
    send: 'Book my free call',
    sending: 'Sending…',
    sentTitle: 'Got it.',
    sentBody: 'We will reach out on WhatsApp or email, normally the same working day.',
    errorGeneric: 'Something went wrong. Try again, or message us on Telegram.',
    orTelegram: 'Prefer Telegram?',
    telegramCta: 'Message us',
  },
  es: {
    first: 'Nombre',
    last: 'Apellido',
    email: 'Correo',
    whatsapp: 'WhatsApp o teléfono',
    country: 'Indicativo',
    day: 'Elige un día',
    time: 'Elige una hora',
    yourTime: 'tu hora',
    pickSlot: 'Elige un día y una hora para la llamada.',
    send: 'Agendar mi llamada gratis',
    sending: 'Enviando…',
    sentTitle: 'Listo.',
    sentBody: 'Te contactamos por WhatsApp o correo, normalmente el mismo día hábil.',
    errorGeneric: 'Algo salió mal. Intenta de nuevo, o escríbenos por Telegram.',
    orTelegram: '¿Prefieres Telegram?',
    telegramCta: 'Escríbenos',
  },
};

const field =
  'w-full bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 ' +
  'outline-none text-on-surface font-body text-base px-4 py-3 transition-colors placeholder:text-outline/70';

const label = 'font-mono text-[12px] text-outline uppercase tracking-widest mb-2 block';

interface Props {
  topic: LeadTopic;
  className?: string;
  /** Focus the first field on mount — for the popup, not for inline forms. */
  autoFocus?: boolean;
}

export default function ContactForm({ topic, className = '', autoFocus = false }: Props) {
  const { language } = useLanguage();
  const t = COPY[language];
  const id = (f: string) => `${f}-${topic}`;

  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Slots are computed in the browser (same rules as the server) and the taken
  // ones fetched, so a slot someone else booked never shows as free.
  const [taken, setTaken] = useState<string[]>([]);
  // Built after mount: slots depend on the visitor's clock and time zone, which
  // the server render cannot know — computing them there would mismatch.
  const [days, setDays] = useState<BookingDay[]>([]);
  const [tzName, setTzName] = useState('');
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const loadTaken = () =>
    fetch('/api/contact/slots')
      .then((r) => r.json())
      .then((d: { taken?: string[] }) => setTaken(d.taken ?? []))
      .catch(() => {});
  useEffect(() => {
    setDays(bookingDays());
    setTzName(
      new Intl.DateTimeFormat(language === 'es' ? 'es-CO' : 'en-US', { timeZoneName: 'short' })
        .formatToParts(new Date())
        .find((p) => p.type === 'timeZoneName')?.value ?? '',
    );
    void loadTaken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  const day = days.find((d) => d.key === (dayKey ?? days[0]?.key));
  const locale = language === 'es' ? 'es-CO' : 'en-US';

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;

    if (!slot) {
      setError(t.pickSlot);
      setState('error');
      return;
    }
    const form = new FormData(e.currentTarget);
    const name = `${String(form.get('first') ?? '').trim()} ${String(form.get('last') ?? '').trim()}`.trim();
    const phone = String(form.get('phone') ?? '').trim();
    setState('sending');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          language,
          name,
          email: form.get('email'),
          whatsapp: phone ? `${form.get('country')} ${phone}` : '',
          meeting_at: slot,
          website: form.get('website'), // honeypot — people never see this
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? t.errorGeneric);
        setState('error');
        if (res.status === 409) {
          setSlot(null);
          void loadTaken();
        }
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
        className={`border border-primary/20 bg-primary/5 p-8 ${className}`}
      >
        <h3 className="font-headline text-2xl font-bold tracking-tighter text-primary uppercase mb-3">{t.sentTitle}</h3>
        <p className="font-body text-on-surface-variant leading-relaxed">{t.sentBody}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-5 ${className}`}>
      {/* Honeypot: off-screen, not display:none — some bots skip hidden fields. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* 1 — the call: a day, then a time in the visitor's own zone */}
      <div>
        <p className={label}>{t.day}</p>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {days.map((d) => {
            const date = new Date(d.slots[0]);
            const active = d.key === day?.key;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => {
                  setDayKey(d.key);
                  setSlot(null);
                }}
                className={`flex-shrink-0 w-16 py-2.5 border text-center transition-colors ${
                  active ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                }`}
              >
                <span className="block font-mono text-[11px] uppercase tracking-widest">
                  {date.toLocaleDateString(locale, { weekday: 'short' })}
                </span>
                <span className="block font-headline text-lg font-bold">{date.toLocaleDateString(locale, { day: 'numeric' })}</span>
                <span className="block font-mono text-[10px] uppercase">{date.toLocaleDateString(locale, { month: 'short' })}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className={label}>
          {t.time} <span className="normal-case text-outline">({t.yourTime}{tzName ? ` · ${tzName}` : ''})</span>
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {day?.slots.map((s) => {
            const isTaken = taken.includes(s);
            const active = slot === s;
            return (
              <button
                key={s}
                type="button"
                disabled={isTaken}
                onClick={() => {
                  setSlot(s);
                  if (state === 'error') setState('idle');
                  setError(null);
                }}
                className={`py-2.5 border font-mono text-[13px] transition-colors ${
                  isTaken
                    ? 'border-outline-variant/20 text-outline/40 line-through cursor-not-allowed'
                    : active
                      ? 'border-primary bg-primary text-surface-container-lowest'
                      : 'border-outline-variant/30 text-on-surface hover:border-primary/60'
                }`}
              >
                {new Date(s).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2 — who to call */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label} htmlFor={id('first')}>{t.first}</label>
          <input id={id('first')} name="first" type="text" required maxLength={60} className={field} autoComplete="given-name" autoFocus={autoFocus} />
        </div>
        <div>
          <label className={label} htmlFor={id('last')}>{t.last}</label>
          <input id={id('last')} name="last" type="text" required maxLength={60} className={field} autoComplete="family-name" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label} htmlFor={id('email')}>{t.email}</label>
          <input id={id('email')} name="email" type="email" required maxLength={254} className={field} autoComplete="email" />
        </div>
        <div>
          <label className={label} htmlFor={id('phone')}>{t.whatsapp}</label>
          <div className="flex">
            <select
              name="country"
              aria-label={t.country}
              defaultValue={language === 'es' ? '+57' : '+1'}
              className={`${field.replace('w-full ', '')} w-[6.75rem] flex-shrink-0 border-r-0 px-3`}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code + c.name} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              id={id('phone')}
              name="phone"
              type="tel"
              required
              inputMode="tel"
              maxLength={20}
              pattern="[0-9 \(\)\-]{6,20}"
              className={`${field} min-w-0 flex-1`}
              autoComplete="tel-national"
              placeholder={language === 'es' ? '300 123 4567' : '(305) 123-4567'}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-mono text-[12px] text-error uppercase tracking-widest"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
        <Button type="submit" variant="primary" size="lg" disabled={state === 'sending'} className="justify-center">
          {state === 'sending' ? t.sending : t.send}
        </Button>
        <span className="font-mono text-[12px] text-outline uppercase tracking-widest">
          {t.orTelegram}{' '}
          <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-primary/80 hover:text-primary transition-colors">
            {t.telegramCta} →
          </a>
        </span>
      </div>
    </form>
  );
}
