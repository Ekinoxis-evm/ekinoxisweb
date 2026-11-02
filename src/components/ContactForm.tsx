'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { identifyLead, replayUrl, track } from '@/lib/analytics';
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import VoiceInput from '@/components/VoiceInput';
import type { LeadTopic } from '@/lib/supabase/types';
import { bookingDays, type BookingDay } from '@/lib/booking';
import {
  APP_PLANS, APP_STAGES, APP_USERS, AUDIENCES, BUDGET_BANDS, CONSULTATION_FORMATS, CONSULTATION_TYPES, COURSE_WHO,
  HAS_SITE, SERVICES, TEAM_SIZES, TIMING, WEB_NEEDS, WEB_PLANS,
  BLOCK_HOURS, BLOCK_PRICE_USD, FREE_CALL_MINUTES, MIN_HOURS, MAX_HOURS, MULTI_KEYS, SLOT_REQUIRED, clampHours, estimateUsd,
  type DetailKey, type LeadPreset, type Option,
} from '@/lib/leadForms';

/**
 * The booking form, the same one everywhere on the site.
 *
 * 0. Service (only when the button did not say which): advice, website,
 *    software, a talk, a course or something else.
 * 1. Qualify: the questions that service needs — which plan, what stage,
 *    how many sessions, when — and a box for what they want to talk about,
 *    typed or dictated.
 * 2. The call: a day and a time in the visitor's own zone, then name, email
 *    and WhatsApp. Talks, courses and general messages may skip the slot.
 *
 * Every answer travels as `details` and is validated again on the server.
 */

const COPY = {
  en: {
    stepService: 'Service',
    step1: 'About you',
    step2: 'The call',
    of: 'of',
    continue: 'Continue',
    back: 'Back',
    serviceQ: 'What do you need?',
    pickOne: 'Pick one option to continue.',
    pickSome: 'Pick at least one to continue.',
    several: 'pick all that apply',
    // consultation
    typeQ: 'What do you want to talk about?',
    formatQ: 'Which format?',
    hoursQ: 'How much time do you estimate?',
    hoursHint: `$${BLOCK_PRICE_USD} per ${BLOCK_HOURS}-hour session · the first ${FREE_CALL_MINUTES} minutes (the call) are free`,
    hour: 'hour',
    hours: 'hours',
    fewer: 'One session less',
    more: 'One session more',
    estimate: 'Estimate',
    // web
    planQ: 'Which package fits?',
    siteQ: 'Do you have a website today?',
    needsQ: 'What must the site do for you?',
    // app
    tierQ: 'Which plan are you thinking of?',
    stageQ: 'Where is the project today?',
    usersQ: 'Who will use it?',
    budgetQ: 'What budget are you working with?',
    // talk / course
    audienceQ: 'Who is the audience?',
    orgQ: 'Organization or event',
    orgPh: 'Universidad del Valle, ETH Bogotá…',
    whoQ: 'Who is the course for?',
    // shared
    timingQ: 'When do you want to start?',
    timingTalkQ: 'When is the event?',
    teamQ: 'How big is your team?',
    // message
    messageQ: 'Tell us in your own words',
    messageOptional: 'optional',
    messagePh: {
      consultation: 'What is happening in the business, and what you would like to change.',
      web: 'What the business does, and what the website has to do for you.',
      app: 'What the software should do, and who will use it.',
      talk: 'The date, the format and the topic you have in mind.',
      course: 'Your goal with the course, and when you want to start.',
      general: 'What is on your mind.',
    } as Record<LeadTopic, string>,
    // step 2
    first: 'First name',
    last: 'Last name',
    email: 'Email',
    whatsapp: 'WhatsApp or phone',
    country: 'Country code',
    day: 'Pick a day',
    time: 'Pick a time',
    optional: 'optional',
    yourTime: 'your time',
    pickSlot: 'Pick a day and time for the call.',
    send: { consultation: 'Book my free call', web: 'Book my free call', app: 'Book my free call', talk: 'Send the invitation', course: 'Send', general: 'Send' } as Record<LeadTopic, string>,
    sending: 'Sending…',
    sentTitle: 'Got it.',
    sentBody: 'We will reach out on WhatsApp or email, normally the same working day.',
    sentBodyCall: 'Your call is booked. The invite is on its way to your email, and we will confirm on WhatsApp.',
    errorGeneric: 'Something went wrong. Try again, or write to hola@ekinoxis.xyz.',
    processTitle: 'What happens next',
    processCall: ['Pick a time', 'We call you on WhatsApp', 'You leave with the next step'],
    processMessage: ['Send it', 'We reply within a working day', 'We agree the next step'],
  },
  es: {
    stepService: 'Servicio',
    step1: 'Sobre ti',
    step2: 'La llamada',
    of: 'de',
    continue: 'Continuar',
    back: 'Atrás',
    serviceQ: '¿Qué necesitas?',
    pickOne: 'Elige una opción para continuar.',
    pickSome: 'Elige al menos una para continuar.',
    several: 'marca todas las que apliquen',
    typeQ: '¿De qué quieres hablar?',
    formatQ: '¿En qué formato?',
    hoursQ: '¿Cuánto tiempo estimas?',
    hoursHint: `$${BLOCK_PRICE_USD} por sesión de ${BLOCK_HOURS} horas · los primeros ${FREE_CALL_MINUTES} minutos (la llamada) son gratis`,
    hour: 'hora',
    hours: 'horas',
    fewer: 'Una sesión menos',
    more: 'Una sesión más',
    estimate: 'Estimado',
    planQ: '¿Qué paquete te sirve?',
    siteQ: '¿Tienes sitio web hoy?',
    needsQ: '¿Qué debe hacer el sitio por ti?',
    tierQ: '¿En qué plan estás pensando?',
    stageQ: '¿Dónde está el proyecto hoy?',
    usersQ: '¿Quién lo va a usar?',
    budgetQ: '¿Con qué presupuesto cuentas?',
    audienceQ: '¿Quién es la audiencia?',
    orgQ: 'Organización o evento',
    orgPh: 'Universidad del Valle, ETH Bogotá…',
    whoQ: '¿Para quién es el curso?',
    timingQ: '¿Cuándo quieres empezar?',
    timingTalkQ: '¿Cuándo es el evento?',
    teamQ: '¿Qué tan grande es tu equipo?',
    messageQ: 'Cuéntanos con tus palabras',
    messageOptional: 'opcional',
    messagePh: {
      consultation: 'Qué está pasando en el negocio y qué te gustaría cambiar.',
      web: 'Qué hace el negocio y qué tiene que hacer el sitio por ti.',
      app: 'Qué debe hacer el software y quién lo va a usar.',
      talk: 'La fecha, el formato y el tema que tienes en mente.',
      course: 'Tu meta con el curso y cuándo quieres empezar.',
      general: 'Lo que tengas en mente.',
    } as Record<LeadTopic, string>,
    first: 'Nombre',
    last: 'Apellido',
    email: 'Correo',
    whatsapp: 'WhatsApp o teléfono',
    country: 'Indicativo',
    day: 'Elige un día',
    time: 'Elige una hora',
    optional: 'opcional',
    yourTime: 'tu hora',
    pickSlot: 'Elige un día y una hora para la llamada.',
    send: { consultation: 'Agendar mi llamada gratis', web: 'Agendar mi llamada gratis', app: 'Agendar mi llamada gratis', talk: 'Enviar la invitación', course: 'Enviar', general: 'Enviar' } as Record<LeadTopic, string>,
    sending: 'Enviando…',
    sentTitle: 'Listo.',
    sentBody: 'Te contactamos por WhatsApp o correo, normalmente el mismo día hábil.',
    sentBodyCall: 'Tu llamada quedó agendada. La invitación va en camino a tu correo y confirmamos por WhatsApp.',
    errorGeneric: 'Algo salió mal. Intenta de nuevo, o escribe a hola@ekinoxis.xyz.',
    processTitle: 'Qué sigue',
    processCall: ['Elige la hora', 'Te llamamos por WhatsApp', 'Sales con el siguiente paso'],
    processMessage: ['Envíalo', 'Respondemos en un día hábil', 'Acordamos el siguiente paso'],
  },
};

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

const field =
  'w-full bg-surface-container-high border border-outline-variant/30 focus:border-primary/60 ' +
  'outline-none text-on-surface font-body text-base px-4 py-3 transition-colors placeholder:text-outline';

const label = 'font-mono text-[12px] text-outline uppercase tracking-widest mb-2 block';

/** The first question of each topic — the one that must be answered. */
const REQUIRED: Partial<Record<LeadTopic, DetailKey>> = { consultation: 'type', web: 'plan', app: 'plan', talk: 'audience', course: 'who' };

type Answers = Partial<Record<DetailKey, string | string[]>>;

/** Defaults a topic starts with, plus whatever the button pre-answered. */
function initialAnswers(topic: LeadTopic | null, preset?: LeadPreset): Answers {
  const base: Answers = topic === 'consultation' ? { format: 'hourly' } : {};
  for (const [k, v] of Object.entries(preset ?? {}) as [DetailKey, string][]) {
    if (v) base[k] = MULTI_KEYS.includes(k) ? [v] : v;
  }
  return base;
}

type Step = 0 | 1 | 2;

interface Props {
  /** The service, when the button already knows it. Omit to ask first. */
  topic?: LeadTopic | null;
  preset?: LeadPreset;
  className?: string;
  /** Focus the first field on mount — for the popup, not for inline forms. */
  autoFocus?: boolean;
}

export default function ContactForm({ topic: initialTopic = null, preset, className = '', autoFocus = false }: Props) {
  const { language } = useLanguage();
  const t = COPY[language];
  const en = language === 'en';
  const asksService = !initialTopic;

  const [topic, setTopic] = useState<LeadTopic | null>(initialTopic);
  const [step, setStep] = useState<Step>(asksService ? 0 : 1);
  const [answers, setAnswers] = useState<Answers>(() => initialAnswers(initialTopic, preset));
  const [hours, setHours] = useState(BLOCK_HOURS);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const id = (f: string) => `${f}-${topic ?? 'any'}`;
  const slotRequired = topic ? SLOT_REQUIRED[topic] : false;

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

  const clearError = () => {
    if (state === 'error') {
      setState('idle');
      setError(null);
    }
  };

  const set = (key: DetailKey, value: string) => {
    setAnswers((a) => {
      if (!MULTI_KEYS.includes(key)) return { ...a, [key]: value };
      const cur = Array.isArray(a[key]) ? (a[key] as string[]) : [];
      return { ...a, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });
    clearError();
  };
  const isOn = (key: DetailKey, value: string) => {
    const v = answers[key];
    return Array.isArray(v) ? v.includes(value) : v === value;
  };

  const chooseService = (next: LeadTopic) => {
    setTopic(next);
    setAnswers(initialAnswers(next, preset));
    clearError();
    setStep(1);
    track('book_call_service', { topic: next });
  };

  function next() {
    if (!topic) return;
    const req = REQUIRED[topic];
    const v = req ? answers[req] : 'ok';
    if (req && (!v || (Array.isArray(v) && v.length === 0))) {
      setError(MULTI_KEYS.includes(req) ? t.pickSome : t.pickOne);
      setState('error');
      return;
    }
    clearError();
    setStep(2);
    track('book_call_qualified', { topic });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 0 || !topic) return;
    if (step === 1) return next();
    if (state === 'sending') return;

    if (slotRequired && !slot) {
      setError(t.pickSlot);
      setState('error');
      return;
    }
    const form = new FormData(e.currentTarget);
    const name = `${String(form.get('first') ?? '').trim()} ${String(form.get('last') ?? '').trim()}`.trim();
    const phone = String(form.get('phone') ?? '').trim();
    const hourly = topic === 'consultation' && answers.format === 'hourly';
    const details = {
      ...answers,
      ...(hourly ? { hours: clampHours(hours), estimate_usd: estimateUsd(hours) } : {}),
    };
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
          message: message.trim(),
          details,
          replay_url: replayUrl(),
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
      const { id } = (await res.json().catch(() => ({}))) as { id?: string };
      setState('sent');
      track('lead_sent', { topic, slot: slot ? 'yes' : 'no', lead_id: id });
      if (id) identifyLead(id, { topic, language });
    } catch {
      setError(t.errorGeneric);
      setState('error');
    }
  }

  /** The three beats after booking, as nodes on the light line (the site's process diagram, small). */
  const process = (done: boolean) => {
    const items = slotRequired || slot ? t.processCall : t.processMessage;
    return (
      <div>
        <p className={label}>{t.processTitle}</p>
        <ol className="relative grid grid-cols-3 gap-2">
          <span aria-hidden className="absolute left-[16%] right-[16%] top-3 h-px bg-gradient-to-r from-primary/70 via-primary/40 to-tertiary-dim/70" />
          {items.map((item, i) => {
            const goal = i === items.length - 1;
            const lit = done || i === 0;
            return (
              <li key={item} className="relative flex flex-col items-center text-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[11px] ${
                    goal
                      ? `border-tertiary-dim ${done ? 'bg-tertiary-dim text-surface-container-lowest shadow-[0_0_20px_rgba(190,238,0,0.25)]' : 'bg-surface-container-low text-tertiary-dim'}`
                      : lit
                        ? 'border-primary bg-primary text-surface-container-lowest'
                        : 'border-primary/50 bg-surface-container-low text-primary'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`font-mono text-[12px] uppercase tracking-wide leading-snug ${goal ? 'text-tertiary-dim' : 'text-on-surface-variant'}`}>{item}</span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  };

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border border-primary/20 bg-primary/5 p-8 space-y-6 ${className}`}
      >
        <div>
          <h3 className="font-headline text-2xl font-bold tracking-tighter text-primary uppercase mb-3">{t.sentTitle}</h3>
          <p className="font-body text-on-surface-variant leading-relaxed">{slot ? t.sentBodyCall : t.sentBody}</p>
        </div>
        {process(true)}
      </motion.div>
    );
  }

  /* ── pieces ─────────────────────────────────────────────────────────── */

  const chip = (active: boolean, onClick: () => void, title: string, hint?: string, multi = false, key?: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-[44px] items-start gap-3 border px-4 py-3 text-left transition-colors ${
        active ? 'border-primary bg-primary/10' : 'border-outline-variant/30 hover:border-primary/60'
      }`}
    >
      {multi && (
        <span
          aria-hidden
          className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center border ${active ? 'border-primary bg-primary text-surface-container-lowest' : 'border-outline-variant'}`}
        >
          {active && <Check size={12} strokeWidth={3} />}
        </span>
      )}
      <span className="min-w-0">
        <span className={`block font-label text-[13px] font-semibold uppercase tracking-wide leading-snug ${active ? 'text-primary' : 'text-on-surface'}`}>
          {title}
        </span>
        {hint && <span className="block mt-1 font-mono text-[12px] text-outline tracking-wider">{hint}</span>}
      </span>
    </button>
  );

  const choices = (key: DetailKey, question: string, options: Option[], cols: 1 | 2 = 2) => {
    const multi = MULTI_KEYS.includes(key);
    return (
      <fieldset>
        <legend className={label}>
          {question}
          {multi && <span className="normal-case text-outline"> ({t.several})</span>}
        </legend>
        <div className={`grid grid-cols-1 ${cols === 2 ? 'sm:grid-cols-2' : ''} gap-2`}>
          {options.map((o) => chip(isOn(key, o.value), () => set(key, o.value), o[language], o.hint?.[language], multi, o.value))}
        </div>
      </fieldset>
    );
  };

  const hoursStepper = (
    <div>
      <p className={label}>{t.hoursQ}</p>
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-2">
        <div className="flex items-stretch border border-outline-variant/30">
          <button
            type="button"
            onClick={() => setHours((h) => clampHours(h - BLOCK_HOURS))}
            disabled={hours <= MIN_HOURS}
            aria-label={t.fewer}
            className="flex h-12 w-12 items-center justify-center text-primary hover:bg-primary/10 disabled:text-outline disabled:hover:bg-transparent transition-colors"
          >
            <Minus size={18} />
          </button>
          <div className="flex min-w-[6.5rem] flex-1 items-center justify-center gap-2 bg-surface-container-high px-4" aria-live="polite">
            <span className="font-headline text-2xl font-bold tracking-tighter text-on-surface">{hours}{hours >= MAX_HOURS ? '+' : ''}</span>
            <span className="font-mono text-[12px] uppercase tracking-widest text-outline">{hours === 1 ? t.hour : t.hours}</span>
          </div>
          <button
            type="button"
            onClick={() => setHours((h) => clampHours(h + BLOCK_HOURS))}
            disabled={hours >= MAX_HOURS}
            aria-label={t.more}
            className="flex h-12 w-12 items-center justify-center text-primary hover:bg-primary/10 disabled:text-outline disabled:hover:bg-transparent transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 border border-primary/30 bg-primary/5 px-4 py-2">
          <span className="font-mono text-[12px] uppercase tracking-widest text-outline">{t.estimate}</span>
          <span className="font-headline text-2xl font-bold tracking-tighter text-primary">
            {hours >= MAX_HOURS ? `${en ? 'from' : 'desde'} ` : '≈ '}${estimateUsd(hours).toLocaleString('en-US')}
          </span>
        </div>
      </div>
      <p className="mt-2 font-mono text-[12px] text-outline tracking-wider">{t.hoursHint}</p>
    </div>
  );

  const stepService = (
    <fieldset>
      <legend className={label}>{t.serviceQ}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SERVICES.map((s) => chip(topic === s.value, () => chooseService(s.value), s[language], s.hint?.[language], false, s.value))}
      </div>
    </fieldset>
  );

  const stepOne = topic && (
    <div className="space-y-6">
      {topic === 'consultation' && (
        <>
          {choices('type', t.typeQ, CONSULTATION_TYPES)}
          {choices('format', t.formatQ, CONSULTATION_FORMATS)}
          {answers.format === 'hourly' && hoursStepper}
          {choices('team_size', t.teamQ, TEAM_SIZES)}
          {choices('timing', t.timingQ, TIMING)}
        </>
      )}
      {topic === 'web' && (
        <>
          {choices('plan', t.planQ, WEB_PLANS)}
          {choices('has_site', t.siteQ, HAS_SITE)}
          {choices('needs', t.needsQ, WEB_NEEDS)}
          {choices('timing', t.timingQ, TIMING)}
        </>
      )}
      {topic === 'app' && (
        <>
          {choices('plan', t.tierQ, APP_PLANS)}
          {choices('stage', t.stageQ, APP_STAGES, 1)}
          {choices('users', t.usersQ, APP_USERS)}
          {choices('budget_band', t.budgetQ, BUDGET_BANDS)}
          {choices('timing', t.timingQ, TIMING)}
        </>
      )}
      {topic === 'talk' && (
        <>
          {choices('audience', t.audienceQ, AUDIENCES)}
          <div>
            <label className={label} htmlFor={id('organization')}>{t.orgQ}</label>
            <input
              id={id('organization')}
              type="text"
              maxLength={160}
              value={(answers.organization as string | undefined) ?? ''}
              onChange={(e) => set('organization', e.target.value)}
              placeholder={t.orgPh}
              className={field}
              autoComplete="organization"
            />
          </div>
          {choices('timing', t.timingTalkQ, TIMING)}
        </>
      )}
      {topic === 'course' && (
        <>
          {choices('who', t.whoQ, COURSE_WHO)}
          {answers.who === 'team' && choices('team_size', t.teamQ, TEAM_SIZES)}
          {choices('timing', t.timingQ, TIMING)}
        </>
      )}
      {topic === 'general' && choices('timing', t.timingQ, TIMING)}

      <div>
        <label className={label} htmlFor={id('message')}>
          {t.messageQ} <span className="normal-case text-outline">({t.messageOptional})</span>
        </label>
        <VoiceInput id={id('message')} value={message} onChange={setMessage} language={language} placeholder={t.messagePh[topic]} rows={4} />
      </div>
    </div>
  );

  const stepTwo = (
    <div className="space-y-5">
      {process(false)}

      {/* the call: a day, then a time in the visitor's own zone */}
      <div>
        <p className={label}>
          {t.day}
          {!slotRequired && <span className="normal-case text-outline"> ({t.optional})</span>}
        </p>
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
                <span className="block font-mono text-[11px] uppercase">{date.toLocaleDateString(locale, { month: 'short' })}</span>
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
                  setSlot(active && !slotRequired ? null : s);
                  clearError();
                }}
                aria-pressed={active}
                className={`min-h-[44px] py-2.5 border font-mono text-[13px] transition-colors ${
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

      {/* who to call */}
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
    </div>
  );

  // The step marker: the service step only exists when the button did not name one.
  const steps: { n: Step; name: string }[] = [
    ...(asksService ? [{ n: 0 as Step, name: t.stepService }] : []),
    { n: 1 as Step, name: t.step1 },
    { n: 2 as Step, name: t.step2 },
  ];
  const stepIndex = steps.findIndex((s) => s.n === step);

  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {/* Honeypot: off-screen, not display:none — some bots skip hidden fields. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Website</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Progress: one segment per step, the current one lit; the same bar on a phone and a laptop */}
      <div aria-label={`${stepIndex + 1} ${t.of} ${steps.length}`}>
        <div className="mb-2 flex items-baseline justify-between gap-4 font-mono text-[12px] uppercase tracking-widest">
          <span className="text-primary">{steps[stepIndex]?.name}</span>
          <span className="text-outline">{stepIndex + 1} / {steps.length}</span>
        </div>
        <ol className="grid gap-1" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((s, i) => (
            <li
              key={s.n}
              aria-current={s.n === step ? 'step' : undefined}
              className={`h-1 transition-colors duration-500 ${i <= stepIndex ? 'bg-primary' : 'bg-outline-variant/40'}`}
            />
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 ? stepService : step === 1 ? stepOne : stepTwo}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-mono text-[12px] text-error uppercase tracking-widest"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {step > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
          {step === 1 ? (
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto justify-center">
              {t.continue} <ArrowRight size={18} />
            </Button>
          ) : (
            <Button type="submit" variant="primary" size="lg" disabled={state === 'sending'} className="w-full sm:w-auto justify-center">
              {state === 'sending' ? t.sending : t.send[topic as LeadTopic]}
            </Button>
          )}
          {(step === 2 || asksService) && (
            <button
              type="button"
              onClick={() => setStep((step - 1) as Step)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 font-mono text-[12px] uppercase tracking-widest text-outline hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} /> {t.back}
            </button>
          )}
        </div>
      )}
    </form>
  );
}
