'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

/**
 * A textarea the visitor can talk into. Uses the browser's own speech
 * recognition (Web Speech API): nothing is uploaded, no key is needed, and
 * the words land in the field as they are recognised. Browsers without it
 * (Firefox, some in-app webviews) simply get the textarea with no mic button.
 */

type SRAlternative = { transcript: string };
type SRResult = ArrayLike<SRAlternative> & { isFinal: boolean };
type SRResultEvent = { resultIndex: number; results: ArrayLike<SRResult> };
type SRErrorEvent = { error: string };
type SR = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SRResultEvent) => void) | null;
  onerror: ((e: SRErrorEvent) => void) | null;
  onend: (() => void) | null;
};
type SRCtor = new () => SR;

function recognitionCtor(): SRCtor | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { SpeechRecognition?: SRCtor; webkitSpeechRecognition?: SRCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

const COPY = {
  en: {
    start: 'Dictate instead of typing',
    stop: 'Stop dictating',
    listening: 'Listening… tap the square to stop.',
    blocked: 'The microphone is blocked. Allow it in your browser, or type instead.',
    failed: 'Could not hear you. Try again, or type instead.',
  },
  es: {
    start: 'Dictar en vez de escribir',
    stop: 'Dejar de dictar',
    listening: 'Escuchando… toca el cuadrado para parar.',
    blocked: 'El micrófono está bloqueado. Permítelo en tu navegador, o escribe.',
    failed: 'No te escuchamos. Intenta de nuevo, o escribe.',
  },
};

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  language: 'en' | 'es';
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
}

/** Join dictated text onto what is already written, with one space between. */
function append(current: string, spoken: string): string {
  const s = spoken.trim();
  if (!s) return current;
  if (!current.trim()) return s;
  return `${current.replace(/\s+$/, '')} ${s}`;
}

export default function VoiceInput({ id, value, onChange, language, placeholder, maxLength = 4000, rows = 4, className = '' }: Props) {
  const t = COPY[language];
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState<string | null>(null);
  const rec = useRef<SR | null>(null);
  const latest = useRef(value);
  latest.current = value;

  // Decided after mount: the server cannot know the browser, and a mismatch
  // would flash the button in and out.
  useEffect(() => setSupported(Boolean(recognitionCtor())), []);
  useEffect(() => () => rec.current?.abort(), []);

  function stop() {
    rec.current?.stop();
    rec.current = null;
    setListening(false);
    setInterim('');
  }

  function start() {
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    setError(null);
    const r = new Ctor();
    r.lang = language === 'es' ? 'es-CO' : 'en-US';
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e) => {
      let finalText = '';
      let interimText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = res[0]?.transcript ?? '';
        if (res.isFinal) finalText += text;
        else interimText += text;
      }
      if (finalText) {
        const next = append(latest.current, finalText).slice(0, maxLength);
        latest.current = next;
        onChange(next);
      }
      setInterim(interimText);
    };
    r.onerror = (e) => {
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      setError(e.error === 'not-allowed' || e.error === 'service-not-allowed' ? t.blocked : t.failed);
      stop();
    };
    // Browsers end a session on their own after a silence; mirror that in the UI.
    r.onend = () => {
      if (rec.current === r) {
        rec.current = null;
        setListening(false);
        setInterim('');
      }
    };
    rec.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setError(t.failed);
      rec.current = null;
    }
  }

  return (
    <div className={className}>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={`w-full resize-y bg-surface-container-high border outline-none text-on-surface font-body text-base px-4 py-3 transition-colors placeholder:text-outline ${
            listening ? 'border-primary' : 'border-outline-variant/30 focus:border-primary/60'
          } ${supported ? 'pr-16' : ''}`}
        />
        {supported && (
          <button
            type="button"
            onClick={listening ? stop : start}
            aria-pressed={listening}
            aria-label={listening ? t.stop : t.start}
            title={listening ? t.stop : t.start}
            className={`absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center border transition-colors ${
              listening
                ? 'border-primary bg-primary text-surface-container-lowest shadow-[0_0_20px_rgba(143,245,255,0.4)]'
                : 'border-primary/40 text-primary hover:border-primary hover:bg-primary/10'
            }`}
          >
            {listening ? <Square size={16} strokeWidth={2.5} /> : <Mic size={18} strokeWidth={1.75} />}
            {listening && (
              <span aria-hidden className="absolute inset-0 border border-primary animate-ping motion-reduce:hidden" />
            )}
          </button>
        )}
      </div>
      {listening && (
        <p className="mt-2 font-mono text-[12px] uppercase tracking-widest text-primary" aria-live="polite">
          {t.listening}
          {interim && <span className="block normal-case tracking-normal font-body text-on-surface-variant italic mt-1">{interim}</span>}
        </p>
      )}
      {error && <p className="mt-2 font-mono text-[12px] uppercase tracking-widest text-error">{error}</p>}
    </div>
  );
}
