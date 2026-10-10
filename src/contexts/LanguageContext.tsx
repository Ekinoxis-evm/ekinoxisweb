'use client';

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { Language } from '@/lib/content';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ekx-lang';

/**
 * The server always renders English, so the first paint matches the HTML. Right after
 * mount we switch to the visitor's saved choice — or, on a first visit, to Spanish when
 * the browser asks for it — and remember every manual switch from then on.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    let initial: Language | null = null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'es') initial = saved;
    } catch {
      // storage blocked (private mode) — fall through to the browser language
    }
    if (!initial && navigator.language?.toLowerCase().startsWith('es')) initial = 'es';
    if (initial && initial !== 'en') setLanguageState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not persisted; the choice still holds for this visit
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
