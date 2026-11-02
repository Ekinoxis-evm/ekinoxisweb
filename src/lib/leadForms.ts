/**
 * The qualifying questions each booking form asks before the call, and the
 * math behind the consultation estimate. Shared by the form (to draw the
 * choices), /api/contact (to accept only these values) and the notifications
 * and admin list (to print a readable label instead of a code).
 *
 * No 'use client': this file runs on both sides.
 */

import type { LeadTopic } from './supabase/types';

/**
 * Consultation is sold in blocks: $100 for a two-hour personalized session,
 * after the free 30-minute call. The same numbers /services/consultation prints.
 */
export const BLOCK_HOURS = 2;
export const BLOCK_PRICE_USD = 100;
export const MIN_HOURS = BLOCK_HOURS;
export const MAX_HOURS = 12;
export const FREE_CALL_MINUTES = 30;

export type Lang = 'en' | 'es';
export type Option = { value: string; en: string; es: string; hint?: { en: string; es: string } };

export const DETAIL_KEYS = [
  'type', 'format', 'hours', 'estimate_usd',
  'plan', 'has_site', 'needs',
  'stage', 'users', 'budget_band',
  'audience', 'organization', 'who',
  'timing', 'team_size',
  'replay',
] as const;
export type DetailKey = (typeof DETAIL_KEYS)[number];
export type DetailValue = string | number | string[];
export type LeadDetails = Partial<Record<DetailKey, DetailValue>>;

/** A pre-answered question, e.g. the pricing card the visitor clicked. */
export type LeadPreset = Partial<Record<DetailKey, string>>;

/** Questions where more than one answer is allowed; stored as arrays. */
export const MULTI_KEYS: DetailKey[] = ['type', 'needs'];

/* ── The master form: which service? ────────────────────────────────────── */

export const SERVICES: (Option & { value: LeadTopic })[] = [
  { value: 'consultation', en: 'Advice on AI, crypto or automation', es: 'Asesoría en IA, cripto o automatización', hint: { en: `$${BLOCK_PRICE_USD} · ${BLOCK_HOURS}-hour session`, es: `$${BLOCK_PRICE_USD} · sesión de ${BLOCK_HOURS} horas` } },
  { value: 'web', en: 'A website for my business', es: 'Un sitio web para mi negocio', hint: { en: 'From $1,500 · live in 5 days', es: 'Desde $1,500 · en vivo en 5 días' } },
  { value: 'app', en: 'Software or an app built for me', es: 'Software o una app hecha para mí', hint: { en: 'From $12,000', es: 'Desde $12,000' } },
  { value: 'talk', en: 'Invite us to speak', es: 'Invitarlos a hablar', hint: { en: 'Talks, panels, demos', es: 'Charlas, paneles, demos' } },
  { value: 'course', en: 'A course for me or my team', es: 'Un curso para mí o mi equipo' },
  { value: 'general', en: 'Something else', es: 'Otra cosa' },
];

/* ── Consultation ───────────────────────────────────────────────────────── */

export const CONSULTATION_TYPES: Option[] = [
  { value: 'AI_INT', en: 'AI inside the tools I already use', es: 'IA dentro de las herramientas que ya uso' },
  { value: 'PAY_RAIL', en: 'Getting paid from abroad in minutes', es: 'Recibir pagos del exterior en minutos' },
  { value: 'SELF_AGT', en: 'AI on my own servers', es: 'IA en mis propios servidores' },
  { value: 'RAG', en: 'Answers from my own documents', es: 'Respuestas desde mis documentos' },
  { value: 'BIZ_VIRT', en: 'A business that runs without me', es: 'Un negocio que funcione sin mí' },
  { value: 'OTHER', en: 'Something else / not sure yet', es: 'Otra cosa / aún no sé' },
];

export const CONSULTATION_FORMATS: Option[] = [
  { value: 'hourly', en: 'Personalized session', es: 'Sesión personalizada', hint: { en: `$${BLOCK_PRICE_USD} · ${BLOCK_HOURS} hours`, es: `$${BLOCK_PRICE_USD} · ${BLOCK_HOURS} horas` } },
  { value: 'workshop', en: 'Team workshop', es: 'Taller de equipo', hint: { en: 'Half day $3,800', es: 'Medio día $3,800' } },
  { value: 'advisor', en: 'Monthly advisor', es: 'Asesor mensual', hint: { en: '$3,000 / month', es: '$3,000 / mes' } },
];

/* ── Websites ───────────────────────────────────────────────────────────── */

export const WEB_PLANS: Option[] = [
  { value: 'online', en: 'Online Business', es: 'Negocio Online', hint: { en: '$1,500', es: '$1,500' } },
  { value: 'pro', en: 'Professional', es: 'Profesional', hint: { en: '$3,000 · AI assistant', es: '$3,000 · asistente de IA' } },
  { value: 'complete', en: 'Complete', es: 'Completo', hint: { en: '$6,000 · for teams', es: '$6,000 · para equipos' } },
  { value: 'unsure', en: 'Not sure yet', es: 'Aún no sé' },
];

export const HAS_SITE: Option[] = [
  { value: 'none', en: 'No website yet', es: 'Aún no tengo sitio' },
  { value: 'replace', en: 'Yes, and it needs replacing', es: 'Sí, y hay que reemplazarlo' },
  { value: 'improve', en: 'Yes, it needs improving', es: 'Sí, hay que mejorarlo' },
];

export const WEB_NEEDS: Option[] = [
  { value: 'bookings', en: 'Take bookings', es: 'Recibir reservas' },
  { value: 'payments', en: 'Sell and get paid online', es: 'Vender y cobrar en línea' },
  { value: 'leads', en: 'Get WhatsApp leads', es: 'Recibir leads por WhatsApp' },
  { value: 'showcase', en: 'Show my work and services', es: 'Mostrar mi trabajo y servicios' },
  { value: 'assistant', en: 'An AI assistant that answers', es: 'Un asistente de IA que responda' },
];

/* ── Software & apps ────────────────────────────────────────────────────── */

export const APP_PLANS: Option[] = [
  { value: 'first', en: 'First Version', es: 'Primera Versión', hint: { en: 'From $12,000 · 4–6 weeks', es: 'Desde $12,000 · 4–6 semanas' } },
  { value: 'full', en: 'Full Product', es: 'Producto Completo', hint: { en: 'From $38,000 · 8–12 weeks', es: 'Desde $38,000 · 8–12 semanas' } },
  { value: 'team', en: 'Your Own Team', es: 'Tu Propio Equipo', hint: { en: 'From $16,000 / month', es: 'Desde $16,000 / mes' } },
  { value: 'unsure', en: 'Not sure yet', es: 'Aún no sé' },
];

export const APP_STAGES: Option[] = [
  { value: 'idea', en: 'An idea on paper', es: 'Una idea en papel' },
  { value: 'manual', en: 'A running business, manual processes', es: 'Un negocio andando, procesos manuales' },
  { value: 'existing', en: 'Software that exists, to replace or extend', es: 'Software que existe, para reemplazar o ampliar' },
];

export const APP_USERS: Option[] = [
  { value: 'team', en: 'My team', es: 'Mi equipo' },
  { value: 'customers', en: 'My customers', es: 'Mis clientes' },
  { value: 'both', en: 'Both', es: 'Ambos' },
];

export const BUDGET_BANDS: Option[] = [
  { value: 'under_12k', en: 'Under $12,000', es: 'Menos de $12,000' },
  { value: '12k_38k', en: '$12,000 – $38,000', es: '$12,000 – $38,000' },
  { value: 'over_38k', en: 'Over $38,000', es: 'Más de $38,000' },
  { value: 'unsure', en: 'Not decided yet', es: 'Aún no lo decido' },
];

/* ── Talks and courses ──────────────────────────────────────────────────── */

export const AUDIENCES: Option[] = [
  { value: 'university', en: 'University', es: 'Universidad' },
  { value: 'company', en: 'Company', es: 'Empresa' },
  { value: 'community', en: 'Community event', es: 'Evento de comunidad' },
  { value: 'conference', en: 'Conference', es: 'Conferencia' },
];

export const COURSE_WHO: Option[] = [
  { value: 'me', en: 'Just me', es: 'Solo yo' },
  { value: 'team', en: 'My team (private cohort)', es: 'Mi equipo (cohorte privada)' },
];

/* ── Asked across services ──────────────────────────────────────────────── */

export const TIMING: Option[] = [
  { value: 'now', en: 'As soon as possible', es: 'Lo antes posible' },
  { value: 'month', en: 'Within a month', es: 'Dentro de un mes' },
  { value: 'quarter', en: 'In the next 3 months', es: 'En los próximos 3 meses' },
  { value: 'exploring', en: 'Just exploring', es: 'Solo explorando' },
];

export const TEAM_SIZES: Option[] = [
  { value: 'solo', en: 'Just me', es: 'Solo yo' },
  { value: 'small', en: '2 – 10 people', es: '2 – 10 personas' },
  { value: 'medium', en: '11 – 50 people', es: '11 – 50 personas' },
  { value: 'large', en: 'More than 50', es: 'Más de 50' },
];

/** Every option list, by the detail key it answers. */
export const OPTIONS: Partial<Record<DetailKey, Option[]>> = {
  type: CONSULTATION_TYPES,
  format: CONSULTATION_FORMATS,
  plan: [...WEB_PLANS, ...APP_PLANS],
  has_site: HAS_SITE,
  needs: WEB_NEEDS,
  stage: APP_STAGES,
  users: APP_USERS,
  budget_band: BUDGET_BANDS,
  audience: AUDIENCES,
  who: COURSE_WHO,
  timing: TIMING,
  team_size: TEAM_SIZES,
};

/** Which questions a topic may answer — the server accepts nothing else. */
export const TOPIC_KEYS: Record<LeadTopic, DetailKey[]> = {
  consultation: ['type', 'format', 'hours', 'estimate_usd', 'team_size', 'timing', 'replay'],
  web: ['plan', 'has_site', 'needs', 'timing', 'replay'],
  app: ['plan', 'stage', 'users', 'budget_band', 'timing', 'replay'],
  talk: ['audience', 'organization', 'timing', 'replay'],
  course: ['who', 'team_size', 'timing', 'replay'],
  general: ['timing', 'replay'],
};

/** Topics where the visitor must pick a slot; the rest may just send the message. */
export const SLOT_REQUIRED: Record<LeadTopic, boolean> = {
  consultation: true,
  web: true,
  app: true,
  talk: false,
  course: false,
  general: false,
};

/** Whole blocks only: 2, 4, 6 … 12 hours. */
export const clampHours = (h: number) =>
  Math.min(MAX_HOURS, Math.max(MIN_HOURS, Math.round(h / BLOCK_HOURS) * BLOCK_HOURS));
export const estimateUsd = (hours: number) => (clampHours(hours) / BLOCK_HOURS) * BLOCK_PRICE_USD;

/** Human label for a stored detail — "AI on my own servers" instead of SELF_AGT. */
export function detailLabel(key: DetailKey, value: DetailValue, lang: Lang = 'en'): string {
  if (Array.isArray(value)) return value.map((v) => detailLabel(key, v, lang)).join(', ');
  const opt = OPTIONS[key]?.find((o) => o.value === String(value));
  if (opt) return opt[lang];
  if (key === 'hours') return `${value} h`;
  if (key === 'estimate_usd') return `$${Number(value).toLocaleString('en-US')} USD`;
  return String(value);
}

export const DETAIL_TITLE: Record<DetailKey, { en: string; es: string }> = {
  type: { en: 'Topics', es: 'Temas' },
  format: { en: 'Format', es: 'Formato' },
  hours: { en: 'Hours', es: 'Horas' },
  estimate_usd: { en: 'Estimate', es: 'Estimado' },
  plan: { en: 'Plan', es: 'Plan' },
  has_site: { en: 'Website today', es: 'Sitio actual' },
  needs: { en: 'Site must', es: 'El sitio debe' },
  stage: { en: 'Stage', es: 'Etapa' },
  users: { en: 'Users', es: 'Usuarios' },
  budget_band: { en: 'Budget', es: 'Presupuesto' },
  audience: { en: 'Audience', es: 'Audiencia' },
  organization: { en: 'Organization', es: 'Organización' },
  who: { en: 'For', es: 'Para' },
  timing: { en: 'When', es: 'Cuándo' },
  team_size: { en: 'Team size', es: 'Tamaño del equipo' },
  replay: { en: 'Session replay', es: 'Grabación de sesión' },
};
