/**
 * Outbound notifications for a new lead.
 *
 * Both channels are optional and fail quietly: a lead is already saved to
 * `public.leads` before either is attempted, so a missing token or a Telegram
 * outage costs a ping, never the lead. `leads.notified_at` records whether the
 * Telegram message actually went out — query for nulls to find the gaps.
 */

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
}

const TOPIC_LABEL: Record<string, string> = {
  consultation: 'Consultation',
  web: 'Web development',
  app: 'App building',
  course: 'Course',
  talk: 'Speaking request',
  general: 'General',
};

/** Telegram parses HTML in messages, so anything from the visitor must be escaped. */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
    '',
    `<b>${esc(lead.name)}</b>${lead.company ? ` · ${esc(lead.company)}` : ''}`,
    `✉️ ${esc(lead.email)}`,
    lead.whatsapp ? `📱 ${esc(lead.whatsapp)}` : null,
    lead.budget ? `💵 ${esc(lead.budget)}` : null,
    '',
    esc(lead.message),
    '',
    `<i>${lead.language.toUpperCase()}${lead.sourcePath ? ` · ${esc(lead.sourcePath)}` : ''}</i>`,
  ].filter(Boolean);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      // Never let a slow Telegram hold the visitor's request open.
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Confirmation email to the person who wrote in, so they know it arrived.
 * Silent no-op until RESEND_API_KEY is set.
 */
export async function sendConfirmationEmail(lead: LeadNotification): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const es = lead.language === 'es';
  const subject = es ? 'Recibimos tu mensaje — Ekinoxis' : 'We got your message — Ekinoxis';
  const body = es
    ? `Hola ${lead.name},\n\nRecibimos tu mensaje y te respondemos normalmente el mismo día hábil.\n\nEsto fue lo que nos enviaste:\n\n${lead.message}\n\n— Ekinoxis Labs\nhola@ekinoxis.xyz · ekinoxis.xyz`
    : `Hi ${lead.name},\n\nWe got your message and normally reply the same working day.\n\nHere is what you sent us:\n\n${lead.message}\n\n— Ekinoxis Labs\nhola@ekinoxis.xyz · ekinoxis.xyz`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Ekinoxis Labs <hola@ekinoxis.xyz>',
        to: [lead.email],
        reply_to: 'hola@ekinoxis.xyz',
        subject,
        text: body,
      }),
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
