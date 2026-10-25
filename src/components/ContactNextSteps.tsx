import { Mail, Send } from 'lucide-react';

const STEPS = {
  en: [
    'Send the form, or message us on Telegram.',
    'We reply with the next step — usually a free 30-minute call.',
    'You get a written plan and a fixed price before any work starts.',
  ],
  es: [
    'Envía el formulario, o escríbenos por Telegram.',
    'Respondemos con el siguiente paso — normalmente una llamada gratis de 30 minutos.',
    'Recibes un plan escrito y un precio fijo antes de empezar.',
  ],
};

/**
 * Fills the left column beside a contact form: what happens after "Send", and
 * the direct lines for people who would rather not fill in a form. Sits at the
 * bottom (`mt-auto`) so both columns end level.
 */
export default function ContactNextSteps({ language }: { language: 'en' | 'es' }) {
  const en = language === 'en';
  return (
    <div className="mt-auto pt-8 space-y-6">
      <div>
        <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-4">
          {en ? 'What happens next' : 'Qué pasa después'}
        </p>
        <ol className="space-y-4">
          {STEPS[language].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-[12px] text-outline pt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-body text-sm text-on-surface-variant leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-3 border-t border-primary/10 pt-6">
        <a href="mailto:hola@ekinoxis.xyz" className="inline-flex items-center gap-3 font-mono text-[13px] text-on-surface hover:text-primary transition-colors">
          <Mail size={16} className="text-primary" /> hola@ekinoxis.xyz
        </a>
        <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-mono text-[13px] text-on-surface hover:text-primary transition-colors">
          <Send size={16} className="text-primary" /> t.me/ekinoxis
        </a>
      </div>
    </div>
  );
}
