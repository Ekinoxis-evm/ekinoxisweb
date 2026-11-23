/**
 * Onboarding for the paid live workshop «Acciones tech tokenizadas» (Spanish only).
 *
 * One source for the session facts, the prep checklist, the calendar invite (.ics and
 * Google Calendar link) and the copy of the onboarding email. Used by the Stripe webhook
 * (src/lib/notify.ts), the prep page and /api/acciones/ics. Facts confirmed by William,
 * 21 nov 2026; keep every claim to them.
 */

const SITE = 'https://www.ekinoxis.xyz';

/** The three Stripe Payment Links that sell this workshop (live account). */
export const ACCIONES_PAYMENT_LINKS = [
  'plink_1UddmKFr9j0xyULSLeUoCE0X', // US$15 Black Friday (until 1 Dec)
  'plink_1UeQDyFr9j0xyULSo8fHh3IH', // US$49 regular
  'plink_1UeQDxFr9j0xyULSX6B2GweC', // US$30, retired 23 nov 2026; kept so a late event still maps
] as const;

export const ACCIONES_COURSE_SLUG = 'acciones-tokenizadas';

export const SESSION = {
  /** Sábado 12 de diciembre de 2026, 10:00 a. m. a 1:00 p. m. COT (UTC-5). Moved from sáb 5 dic on 23 nov 2026 (nobody had paid). */
  startsAt: '2026-12-12T15:00:00Z',
  endsAt: '2026-12-12T18:00:00Z',
  /** Same UID everywhere, so the emailed and the downloaded invite are one calendar event. */
  uid: 'taller-acciones-tokenizadas-20261212@ekinoxis.xyz',
  /**
   * Google Meet of the Calendar event on global@ekinoxis.xyz (created 21 nov 2026). Only the paid
   * email and its invite carry it; public pages and the public .ics never do.
   */
  meetingUrl: 'https://meet.google.com/jwm-pynr-kwe' as string | null,
  title: 'Taller en vivo: Acciones tech tokenizadas',
  /** Shown as separate icon rows, never joined (DESIGN.md: no dot-joined facts). */
  facts: [
    { icon: 'date', label: 'Fecha', text: 'Sábado 12 de diciembre' },
    { icon: 'time', label: 'Hora', text: '10:00 a. m. a 1:00 p. m. (hora Colombia)' },
    { icon: 'length', label: 'Duración', text: '3 horas, en vivo' },
    { icon: 'place', label: 'Lugar', text: 'En línea, por Google Meet' },
    { icon: 'language', label: 'Idioma', text: 'Español' },
  ],
  linkPending: 'El enlace de la sesión está en tu correo de confirmación y en tu invitación de calendario.',
} as const;

export const PREP_PATH = '/recursos/acciones-tokenizadas/preparacion';
export const PREP_URL = `${SITE}/es${PREP_PATH}`;
export const ICS_PATH = '/api/acciones/ics';

export const SAFETY = {
  advice: 'Esto no es asesoría de inversión.',
  keys: 'Ekinoxis nunca te pedirá tus 12 palabras ni tus claves.',
} as const;

/** The public prep page, /es/recursos/acciones-tokenizadas/preparacion. */
export const PREP_PAGE = {
  metaTitle: 'Preparación del taller de acciones tokenizadas',
  badge: 'Antes del 12 de diciembre',
  title: 'Prepárate para el taller',
  lead: 'Cuatro cosas listas antes de la sesión. La primera toma más tiempo: empieza por ahí.',
  calendar: 'Añadir al calendario',
  ics: 'Descargar .ics',
  back: 'Volver al taller',
  /** The link to this page from /gracias. */
  fromThanks: 'Prepárate ya: los 4 pasos antes de la sesión',
} as const;

export type PrepStep = {
  id: 'okx' | 'cop' | 'wallet' | 'ai';
  title: string;
  text: string;
  /** Logo files under /public/recursos/acciones/logos; empty → the page draws an icon. */
  logos: { src: string; name: string }[];
  link?: { href: string; label: string };
};

const LOGO = '/recursos/acciones/logos';

/** The four things to have ready before the session, in the order to do them. */
export const PREP_STEPS: PrepStep[] = [
  {
    id: 'okx',
    title: 'Abre tu cuenta en OKX y verifícate (KYC)',
    text: 'Con tu cédula o pasaporte y una selfie. Puede tardar de minutos a 1–2 días: hazlo ya.',
    logos: [{ src: `${LOGO}/venue-okx.svg`, name: 'OKX' }],
    link: { href: 'https://www.okx.com', label: 'Ir a OKX' },
  },
  {
    id: 'cop',
    title: 'Ten al menos COP 50.000 disponibles',
    text: 'Para depositar en tu cuenta de OKX y hacer las compras de práctica.',
    logos: [],
  },
  {
    id: 'wallet',
    title: 'Instala una wallet: Rabby o MetaMask',
    text: 'Para el bloque 3. Recomendado, no obligatorio.',
    logos: [
      { src: `${LOGO}/tool-rabby.svg`, name: 'Rabby' },
      { src: `${LOGO}/tool-metamask.svg`, name: 'MetaMask' },
    ],
  },
  {
    id: 'ai',
    title: 'Computador, celular y tu IA abierta',
    text: 'Claude o ChatGPT: ahí cargas el Skill.md del taller, que te guía paso a paso.',
    logos: [],
  },
];

/* ── Calendar ─────────────────────────────────────────────────────────────── */

const icsDate = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** RFC 5545 §3.3.11 text escaping. */
const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** RFC 5545 §3.1: lines longer than 75 octets continue on the next line after CRLF + space. Never splits a UTF-8 character. */
function fold(line: string): string {
  const out: string[] = [];
  let current = '';
  let bytes = 0;
  for (const ch of line) {
    const size = new TextEncoder().encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // continuation lines start with one space
    if (bytes + size > limit) {
      out.push(current);
      current = '';
      bytes = 0;
    }
    current += ch;
    bytes += size;
  }
  out.push(current);
  return out.join('\r\n ');
}

/** `link` is the Meet URL for buyers' own invites; null for anything public. */
function eventDescription(link: string | null): string {
  return [
    link ? `Enlace de la sesión: ${link}` : SESSION.linkPending,
    `Prepárate antes de la sesión: ${PREP_URL}`,
    SAFETY.advice,
    SAFETY.keys,
  ].join('\n');
}

const location = (link: string | null) => link ?? 'En línea (enlace en tu correo de confirmación)';

/** METHOD:PUBLISH: a plain event to add, not a meeting request to answer. */
export function buildSessionIcs(link: string | null, now: Date = new Date()): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ekinoxis Labs//Taller acciones tokenizadas//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${SESSION.uid}`,
    `DTSTAMP:${icsDate(now.toISOString())}`,
    `DTSTART:${icsDate(SESSION.startsAt)}`,
    `DTEND:${icsDate(SESSION.endsAt)}`,
    `SUMMARY:${icsText(SESSION.title)}`,
    `DESCRIPTION:${icsText(eventDescription(link))}`,
    `LOCATION:${icsText(location(link))}`,
    `URL:${link ?? PREP_URL}`,
    'ORGANIZER;CN=Ekinoxis Labs:mailto:hola@ekinoxis.xyz',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsText(SESSION.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

export function sessionGoogleCalendarUrl(link: string | null): string {
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: SESSION.title,
    dates: `${icsDate(SESSION.startsAt)}/${icsDate(SESSION.endsAt)}`,
    details: eventDescription(link),
    location: location(link),
    ctz: 'America/Bogota',
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

/* ── Onboarding email copy ────────────────────────────────────────────────── */

export const ONBOARDING_EMAIL = {
  subject: 'Tu cupo está listo: prepárate para el taller del 12 de diciembre',
  eyebrow: 'CUPO CONFIRMADO',
  hello: (first: string) => `Hola ${first}, tu cupo está listo.`,
  calendarNote: 'La invitación adjunta guarda la sesión en tu calendario, en tu zona horaria.',
  calendarButton: 'Añadir a Google Calendar',
  prepTitle: 'ANTES DE LA SESIÓN',
  prepButton: 'Ver la preparación completa',
  receipt: 'Stripe te envía el recibo de pago por separado.',
  questions: '¿Dudas? Responde este correo.',
} as const;
