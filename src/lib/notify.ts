/**
 * Outbound notifications for a new lead.
 *
 * Every channel is optional and fails quietly: a lead is already saved to
 * `public.leads` before any is attempted, so a missing key or an outage costs a
 * message, never the lead. `leads.notified_at` records whether the Telegram
 * message actually went out — query for nulls to find the gaps.
 */

import { CALL_MINUTES, formatCot } from './booking';

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
      ? 'Desbloqueamos el poder de las tecnologías de frontera.'
      : 'We unlock the power of frontier technologies.'
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
export async function sendConfirmationEmail(lead: LeadNotification): Promise<boolean> {
  const es = lead.language === 'es';
  const first = esc(lead.name.split(' ')[0] ?? lead.name);

  if (!lead.meetingAt) {
    const inner = `<h1 style="margin:0 0 16px;font-size:26px;line-height:30px;color:#e8f2fb;">${es ? `Listo, ${first}.` : `Got it, ${first}.`}</h1>
<p style="margin:0;font-size:15px;line-height:24px;color:#a2acb5;">${
      es ? 'Recibimos tu mensaje. Te respondemos normalmente el mismo día hábil.' : 'We have your message. We normally reply the same working day.'
    }</p>`;
    return sendEmail({ from: FROM, to: [lead.email], reply_to: 'hola@ekinoxis.xyz', subject: es ? 'Recibimos tu mensaje — Ekinoxis' : 'We got your message — Ekinoxis', html: shell(inner, lead.language) });
  }

  const when = esc(formatCot(lead.meetingAt, lead.language));
  const inner = `<p style="margin:0 0 12px;font-size:12px;letter-spacing:3px;color:#8ff5ff;">${es ? 'LLAMADA CONFIRMADA' : 'CALL CONFIRMED'}</p>
<h1 style="margin:0 0 20px;font-size:28px;line-height:32px;color:#e8f2fb;">${es ? `Nos vemos pronto, ${first}.` : `See you soon, ${first}.`}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;border-left:2px solid #8ff5ff;margin:0 0 24px;">
<tr><td style="padding:18px 20px;">
  <p style="margin:0 0 4px;font-size:20px;color:#e8f2fb;font-weight:bold;">${when}</p>
  <p style="margin:0;font-size:13px;color:#8a949c;">${es ? 'Hora de Colombia · 30 minutos · gratis' : 'Colombia time · 30 minutes · free'}</p>
</td></tr></table>
<p style="margin:0 0 24px;font-size:15px;line-height:24px;color:#a2acb5;">${
    es
      ? `Te llamamos por WhatsApp${lead.whatsapp ? ` al <span style="color:#e8f2fb;">${esc(lead.whatsapp)}</span>` : ''}. La invitación adjunta guarda la hora en tu calendario, en tu zona horaria.`
      : `We will call you on WhatsApp${lead.whatsapp ? ` at <span style="color:#e8f2fb;">${esc(lead.whatsapp)}</span>` : ''}. The attached invite puts it in your calendar, in your own time zone.`
  }</p>
<p style="margin:0 0 28px;">${button(googleCalendarUrl(lead), es ? 'Agregar a Google Calendar' : 'Add to Google Calendar')}</p>
<p style="margin:0;font-size:13px;line-height:20px;color:#8a949c;">${
    es ? '¿Necesitas otra hora? Responde este correo.' : 'Need another time? Just reply to this email.'
  }</p>`;

  return sendEmail({
    from: FROM,
    to: [lead.email],
    reply_to: 'hola@ekinoxis.xyz',
    subject: es ? `Tu llamada con Ekinoxis — ${formatCot(lead.meetingAt, 'es')}` : `Your call with Ekinoxis — ${formatCot(lead.meetingAt, 'en')}`,
    html: shell(inner, lead.language),
    attachments: [icsAttachment(lead)],
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
