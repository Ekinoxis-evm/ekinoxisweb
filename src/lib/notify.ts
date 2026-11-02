/**
 * Outbound notifications for a new lead.
 *
 * Every channel is optional and fails quietly: a lead is already saved to
 * `public.leads` before any is attempted, so a missing key or an outage costs a
 * message, never the lead. `leads.notified_at` records whether the Telegram
 * message actually went out — query for nulls to find the gaps.
 */

import { CALL_MINUTES, formatCot } from './booking';
import { BLOCK_HOURS, BLOCK_PRICE_USD, DETAIL_TITLE, SERVICES, detailLabel, type DetailKey, type DetailValue, type LeadDetails } from './leadForms';

export interface LeadNotification {
  id: string;
  topic: string;
  name: string;
  email: string;
  whatsapp?: string | null;
  company?: string | null;
  message: string;
  budget?: string | null;
  sourcePath?: string | null;
  language: 'en' | 'es';
  /** Booked free-call slot, UTC ISO. */
  meetingAt?: string | null;
  /** The qualifying answers from the form (plan, stage, hours…). */
  details?: LeadDetails;
}

/** "Topic: AI on my own servers" — one readable line per answer, in English for us. */
function detailLines(details: LeadDetails | undefined): string[] {
  if (!details) return [];
  return (Object.keys(details) as DetailKey[])
    .filter((k) => k !== 'replay' && details[k] !== undefined && DETAIL_TITLE[k])
    .map((k) => `${DETAIL_TITLE[k].en}: ${detailLabel(k, details[k] as DetailValue, 'en')}`);
}

const FROM = 'Ekinoxis Labs <hola@ekinoxis.xyz>';
const SITE = 'https://www.ekinoxis.xyz';

const TOPIC_LABEL: Record<string, string> = {
  consultation: 'Consultation',
  web: 'Web development',
  app: 'App building',
  course: 'Course',
  talk: 'Speaking request',
  general: 'General',
};

/** HTML-escape anything that came from the visitor (Telegram and email bodies). */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Pings the configured Telegram chat. Returns true only if Telegram accepted
 * the message — the caller writes `notified_at` from this.
 */
export async function notifyTelegram(lead: LeadNotification): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const lines = [
    `<b>New lead — ${esc(TOPIC_LABEL[lead.topic] ?? lead.topic)}</b>`,
    lead.meetingAt ? `📅 <b>Call: ${esc(formatCot(lead.meetingAt, 'en'))} (Colombia)</b>` : null,
    '',
    `<b>${esc(lead.name)}</b>${lead.company ? ` · ${esc(lead.company)}` : ''}`,
    `✉️ ${esc(lead.email)}`,
    lead.whatsapp ? `📱 ${esc(lead.whatsapp)}` : null,
    lead.budget ? `💵 ${esc(lead.budget)}` : null,
    ...detailLines(lead.details).map((l) => `• ${esc(l)}`),
    lead.details?.replay ? `🎥 <a href="${esc(String(lead.details.replay))}">Watch the session replay</a>` : null,
    '',
    esc(lead.message),
    '',
    `<i>${lead.language.toUpperCase()}${lead.sourcePath ? ` · ${esc(lead.sourcePath)}` : ''}</i>`,
  ].filter((l) => l !== null);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
      // Never let a slow Telegram hold the visitor's request open.
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ── Calendar invite ─────────────────────────────────────────────────────── */

const icsDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
/** RFC 5545 text escaping. */
const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

function callWindow(meetingAt: string) {
  const start = new Date(meetingAt);
  return { start, end: new Date(start.getTime() + CALL_MINUTES * 60_000) };
}

function callCopy(lead: LeadNotification) {
  const es = lead.language === 'es';
  return {
    title: es ? 'Llamada gratis con Ekinoxis Labs' : 'Free call with Ekinoxis Labs',
    details: es
      ? `30 minutos para entender qué estás construyendo y cuál es el siguiente paso.\n\nTe llamamos por WhatsApp${lead.whatsapp ? ` al ${lead.whatsapp}` : ''}.\n¿Necesitas cambiar la hora? Responde este correo.`
      : `30 minutes to understand what you are building and the right next step.\n\nWe will call you on WhatsApp${lead.whatsapp ? ` at ${lead.whatsapp}` : ''}.\nNeed another time? Reply to this email.`,
    location: lead.whatsapp ? `WhatsApp · ${lead.whatsapp}` : 'WhatsApp',
  };
}

/** METHOD:REQUEST, so mail clients render it as an invite with Accept / Decline. */
function buildIcs(lead: LeadNotification): string {
  const { start, end } = callWindow(lead.meetingAt as string);
  const c = callCopy(lead);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ekinoxis Labs//Free call//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${lead.id}@ekinoxis.xyz`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsText(c.title)}`,
    `DESCRIPTION:${icsText(c.details)}`,
    `LOCATION:${icsText(c.location)}`,
    'ORGANIZER;CN=Ekinoxis Labs:mailto:hola@ekinoxis.xyz',
    `ATTENDEE;CN=${icsText(lead.name)};ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${lead.email}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsText(c.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function googleCalendarUrl(lead: LeadNotification): string {
  const { start, end } = callWindow(lead.meetingAt as string);
  const c = callCopy(lead);
  const q = new URLSearchParams({ action: 'TEMPLATE', text: c.title, dates: `${icsDate(start)}/${icsDate(end)}`, details: c.details, location: c.location });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

/* ── Branded email ───────────────────────────────────────────────────────── */

/**
 * The Ekinoxis email shell: black page, one cyan light, the equinox mark and the
 * slogan. Table layout and inline styles only — that is what mail clients read.
 */
function shell(inner: string, language: 'en' | 'es'): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"></head>
<body style="margin:0;padding:0;background:#000000;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#09151c;border:1px solid #14212a;">
<tr><td style="padding:28px 32px;border-bottom:1px solid #14212a;">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="padding-right:12px;"><img src="${SITE}/brand/favicon/favicon-180.png" width="32" height="32" alt="" style="display:block;border:0;"></td>
    <td style="font-family:Arial,Helvetica,sans-serif;font-size:18px;letter-spacing:2px;color:#e8f2fb;"><span style="color:#8ff5ff;">[</span> EKINOXIS <span style="color:#8ff5ff;">]</span></td>
  </tr></table>
</td></tr>
<tr><td style="padding:32px;font-family:Arial,Helvetica,sans-serif;color:#e8f2fb;">${inner}</td></tr>
<tr><td style="padding:24px 32px;border-top:1px solid #14212a;font-family:Arial,Helvetica,sans-serif;">
  <p style="margin:0 0 6px;font-size:13px;letter-spacing:3px;color:#8ff5ff;">INNOVATION WITHOUT FRONTIERS</p>
  <p style="margin:0;font-size:12px;line-height:18px;color:#8a949c;">${
    language === 'es'
      ? 'Desbloqueamos el poder de las tecnologías de frontera para tu negocio y tus ideas.'
      : 'We unlock the power of frontier technologies for your business and ideas.'
  }<br><a href="${SITE}" style="color:#8a949c;">ekinoxis.xyz</a> · <a href="mailto:hola@ekinoxis.xyz" style="color:#8a949c;">hola@ekinoxis.xyz</a></p>
</td></tr>
</table>
</td></tr></table></body></html>`;
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#8ff5ff;color:#000000;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 22px;">${label}</a>`;

async function sendEmail(payload: Record<string, unknown>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error('[notify] resend', res.status, await res.text().catch(() => ''));
    return res.ok;
  } catch {
    return false;
  }
}

const icsAttachment = (lead: LeadNotification) => ({
  filename: 'ekinoxis-call.ics',
  content: Buffer.from(buildIcs(lead)).toString('base64'),
  content_type: 'text/calendar; charset=utf-8; method=REQUEST',
});

/**
 * Confirmation to the person who booked: the time, a calendar invite they can
 * accept, and an Add-to-Google-Calendar button. Silent no-op until
 * RESEND_API_KEY is set.
 */
/* ── Pieces of the visitor's email ─────────────────────────────────────── */

const serviceName = (topic: string, lang: 'en' | 'es') => SERVICES.find((s) => s.value === topic)?.[lang] ?? topic;

const h2 = (text: string) => `<p style="margin:28px 0 10px;font-size:12px;letter-spacing:3px;color:#8ff5ff;">${text}</p>`;

/** "What you told us": the service, each answer in their language, and their words. */
function recapHtml(lead: LeadNotification): string {
  const lang = lead.language;
  const es = lang === 'es';
  const rows: [string, string][] = [[es ? 'Servicio' : 'Service', serviceName(lead.topic, lang)]];
  const d = lead.details ?? {};
  for (const k of Object.keys(d) as DetailKey[]) {
    if (k === 'replay' || d[k] === undefined || !DETAIL_TITLE[k]) continue;
    rows.push([DETAIL_TITLE[k][lang], detailLabel(k, d[k] as DetailValue, lang)]);
  }
  const said = lead.message && !/^(Requested a free call\.|Pidió una llamada gratis\.)$/.test(lead.message) ? lead.message : '';
  return `${h2(es ? 'LO QUE NOS CONTASTE' : 'WHAT YOU TOLD US')}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
${rows
  .map(
    ([k, v]) => `<tr><td style="padding:10px 16px;border-bottom:1px solid #14212a;font-size:12px;letter-spacing:1px;color:#8a949c;text-transform:uppercase;width:38%;vertical-align:top;">${esc(k)}</td><td style="padding:10px 16px;border-bottom:1px solid #14212a;font-size:14px;line-height:20px;color:#e8f2fb;">${esc(v)}</td></tr>`,
  )
  .join('')}
${said ? `<tr><td colspan="2" style="padding:14px 16px;font-size:14px;line-height:22px;color:#a2acb5;font-style:italic;white-space:pre-wrap;">“${esc(said)}”</td></tr>` : ''}
</table>`;
}

/** Numbered steps on a cyan line, the same shape as the diagrams on the site. */
function stepsHtml(steps: [string, string][], lastIsGoal = true): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps
    .map(([title, text], i) => {
      const last = i === steps.length - 1;
      const color = last && lastIsGoal ? '#beee00' : '#8ff5ff';
      return `<tr>
<td style="width:36px;vertical-align:top;padding:0 0 18px;">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="width:26px;height:26px;border:1px solid ${color};border-radius:13px;text-align:center;font-size:12px;font-weight:bold;color:${color};">${i + 1}</td></tr></table>
</td>
<td style="vertical-align:top;padding:2px 0 18px 12px;">
  <p style="margin:0 0 3px;font-size:15px;font-weight:bold;color:#e8f2fb;">${title}</p>
  <p style="margin:0;font-size:14px;line-height:21px;color:#a2acb5;">${text}</p>
</td></tr>`;
    })
    .join('')}</table>`;
}

/**
 * Confirmation to the person who booked: the time, what they told us, how the
 * call goes, what to have ready, a calendar invite they can accept, and an
 * Add-to-Google-Calendar button. Silent no-op until RESEND_API_KEY is set.
 */
export function buildConfirmationEmail(lead: LeadNotification): { subject: string; html: string } {
  const es = lead.language === 'es';
  const first = esc(lead.name.split(' ')[0] ?? lead.name);
  const phone = lead.whatsapp ? `<span style="color:#e8f2fb;">${esc(lead.whatsapp)}</span>` : '';
  const consultation = lead.topic === 'consultation';

  if (!lead.meetingAt) {
    const inner = `<p style="margin:0 0 12px;font-size:12px;letter-spacing:3px;color:#8ff5ff;">${es ? 'MENSAJE RECIBIDO' : 'MESSAGE RECEIVED'}</p>
<h1 style="margin:0 0 16px;font-size:26px;line-height:30px;color:#e8f2fb;">${es ? `Listo, ${first}.` : `Got it, ${first}.`}</h1>
<p style="margin:0;font-size:15px;line-height:24px;color:#a2acb5;">${
      es
        ? `Te respondemos por WhatsApp${phone ? ` al ${phone}` : ''} o por este correo, normalmente el mismo día hábil.`
        : `We will reply on WhatsApp${phone ? ` at ${phone}` : ''} or by this email, normally the same working day.`
    }</p>
${recapHtml(lead)}
${h2(es ? 'QUÉ SIGUE' : 'WHAT HAPPENS NEXT')}
${stepsHtml(
  es
    ? [
        ['Leemos lo que nos contaste', 'Una persona del equipo, no un bot.'],
        ['Te escribimos', 'Con una respuesta concreta o dos o tres preguntas para entender mejor.'],
        ['Acordamos el siguiente paso', 'Una llamada, una fecha o una propuesta. Tú decides.'],
      ]
    : [
        ['We read what you sent', 'A person on the team, not a bot.'],
        ['We write back', 'With a concrete answer, or two or three questions to understand better.'],
        ['We agree the next step', 'A call, a date or a proposal. Your decision.'],
      ],
)}
<p style="margin:8px 0 0;font-size:13px;line-height:20px;color:#8a949c;">${es ? '¿Algo que agregar? Responde este correo.' : 'Anything to add? Just reply to this email.'}</p>`;
    return { subject: es ? 'Recibimos tu mensaje — Ekinoxis' : 'We got your message — Ekinoxis', html: shell(inner, lead.language) };
  }

  const when = esc(formatCot(lead.meetingAt, lead.language));
  const inner = `<p style="margin:0 0 12px;font-size:12px;letter-spacing:3px;color:#8ff5ff;">${es ? 'LLAMADA CONFIRMADA' : 'CALL CONFIRMED'}</p>
<h1 style="margin:0 0 20px;font-size:28px;line-height:32px;color:#e8f2fb;">${es ? `Nos vemos pronto, ${first}.` : `See you soon, ${first}.`}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;border-left:2px solid #8ff5ff;margin:0 0 20px;">
<tr><td style="padding:18px 20px;">
  <p style="margin:0 0 4px;font-size:20px;color:#e8f2fb;font-weight:bold;">${when}</p>
  <p style="margin:0;font-size:13px;color:#8a949c;">${es ? 'Hora de Colombia · 30 minutos · gratis' : 'Colombia time · 30 minutes · free'}</p>
</td></tr></table>
<p style="margin:0 0 6px;font-size:15px;line-height:24px;color:#a2acb5;">${
    es
      ? `Te llamamos por WhatsApp${phone ? ` al ${phone}` : ''}. La invitación adjunta guarda la hora en tu calendario, en tu zona horaria.`
      : `We will call you on WhatsApp${phone ? ` at ${phone}` : ''}. The attached invite puts it in your calendar, in your own time zone.`
  }</p>
<p style="margin:0 0 8px;">${button(googleCalendarUrl(lead), es ? 'Agregar a Google Calendar' : 'Add to Google Calendar')}</p>
${recapHtml(lead)}
${h2(es ? 'CÓMO ES LA LLAMADA' : 'HOW THE CALL GOES')}
${stepsHtml(
  es
    ? [
        ['Te llamamos a la hora acordada', `Por WhatsApp${phone ? `, al ${phone}` : ''}. Hablas con William Martínez, fundador de Ekinoxis Labs.`],
        ['30 minutos sobre tu negocio', 'Entendemos qué pasa hoy y encontramos el problema que vale la pena resolver primero.'],
        ['Sales con el siguiente paso', consultation
          ? `Qué hacer primero, y si tiene sentido una sesión personalizada de ${BLOCK_HOURS} horas ($${BLOCK_PRICE_USD}). O te decimos que no nos necesitas.`
          : 'Alcance, precio y fecha por escrito, o la recomendación de no hacerlo todavía.'],
      ]
    : [
        ['We call you at the agreed time', `On WhatsApp${phone ? `, at ${phone}` : ''}. You talk with William Martínez, founder of Ekinoxis Labs.`],
        ['30 minutes about your business', 'We understand what is happening today and find the problem worth solving first.'],
        ['You leave with the next step', consultation
          ? `What to do first, and whether a ${BLOCK_HOURS}-hour personalized session ($${BLOCK_PRICE_USD}) makes sense. Or we tell you that you do not need us.`
          : 'Scope, price and date in writing, or the advice not to do it yet.'],
      ],
)}
${h2(es ? 'PARA APROVECHARLA' : 'TO MAKE THE MOST OF IT')}
<p style="margin:0;font-size:14px;line-height:22px;color:#a2acb5;">${
    es
      ? '• Ten claro qué quieres que cambie en 90 días.<br>• Si existe, ten a mano el sitio, la hoja de cálculo o la herramienta de la que hablaremos.<br>• Invita a quien decide contigo; la llamada es para hasta 5 personas.'
      : '• Know what you want to be different in 90 days.<br>• If it exists, have the site, spreadsheet or tool we will talk about at hand.<br>• Bring whoever decides with you; the call is for up to 5 people.'
  }</p>
<p style="margin:24px 0 0;font-size:13px;line-height:20px;color:#8a949c;">${
    es ? '¿Necesitas otra hora? Responde este correo y la movemos.' : 'Need another time? Reply to this email and we move it.'
  }</p>`;

  return {
    subject: es ? `Tu llamada con Ekinoxis — ${formatCot(lead.meetingAt, 'es')}` : `Your call with Ekinoxis — ${formatCot(lead.meetingAt, 'en')}`,
    html: shell(inner, lead.language),
  };
}

export async function sendConfirmationEmail(lead: LeadNotification): Promise<boolean> {
  const { subject, html } = buildConfirmationEmail(lead);
  return sendEmail({
    from: FROM,
    to: [lead.email],
    reply_to: 'hola@ekinoxis.xyz',
    subject,
    html,
    ...(lead.meetingAt ? { attachments: [icsAttachment(lead)] } : {}),
  });
}

/**
 * The same booking, to us — with the visitor's details and the invite, so the
 * call lands in our calendar too. Goes to BOOKING_NOTIFY_EMAIL, else ADMIN_EMAIL.
 */
export async function sendBookingToTeam(lead: LeadNotification): Promise<boolean> {
  const to = process.env.BOOKING_NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
  if (!to || !lead.meetingAt) return false;
  const inner = `<p style="margin:0 0 12px;font-size:12px;letter-spacing:3px;color:#8ff5ff;">NEW BOOKING · ${esc((TOPIC_LABEL[lead.topic] ?? lead.topic).toUpperCase())}</p>
<h1 style="margin:0 0 16px;font-size:24px;color:#e8f2fb;">${esc(lead.name)}</h1>
<p style="margin:0 0 6px;font-size:16px;color:#e8f2fb;font-weight:bold;">${esc(formatCot(lead.meetingAt, 'en'))} · Colombia</p>
<p style="margin:0 0 20px;font-size:14px;line-height:22px;color:#a2acb5;">✉️ ${esc(lead.email)}<br>📱 ${esc(lead.whatsapp ?? '—')}<br>🌐 ${lead.language.toUpperCase()}${lead.sourcePath ? ` · ${esc(lead.sourcePath)}` : ''}</p>
${detailLines(lead.details).length ? `<p style="margin:0 0 20px;font-size:14px;line-height:22px;color:#e8f2fb;">${detailLines(lead.details).map(esc).join('<br>')}</p>` : ''}
<p style="margin:0 0 20px;font-size:14px;line-height:22px;color:#a2acb5;white-space:pre-wrap;">${esc(lead.message)}</p>
${lead.details?.replay ? `<p style="margin:0 0 20px;font-size:13px;"><a href="${esc(String(lead.details.replay))}" style="color:#8ff5ff;">🎥 Watch the session replay</a></p>` : ''}
<p style="margin:0;">${button(googleCalendarUrl(lead), 'Add to Google Calendar')}</p>`;
  return sendEmail({
    from: FROM,
    to: [to],
    reply_to: lead.email,
    subject: `📅 Free call — ${lead.name} — ${formatCot(lead.meetingAt, 'en')}`,
    html: shell(inner, 'en'),
    attachments: [icsAttachment({ ...lead, language: 'en' })],
  });
}
