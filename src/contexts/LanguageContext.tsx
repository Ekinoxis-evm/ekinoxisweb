'use client';

import { createContext, useCallback, useContext, useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Language } from '@/lib/content';
import { LANG_COOKIE, switchLangPath } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  /** Go to the same page in the other language and remember the choice. */
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Remember the choice for a year; the middleware honours it on the next bare-address visit. */
export function rememberLanguage(lang: Language) {
  try {
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    // cookies blocked — the URL still carries the language
  }
}

/**
 * The language is the URL's: `/es/...` is Spanish, everything else English. The
 * server renders the right copy on the first paint, so there is no flash and
 * every page exists at its own address for search engines.
 */
export function LanguageProvider({ initial, children }: { initial: Language; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = initial;
  }, [initial]);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === initial) return;
      rememberLanguage(lang);
      router.push(switchLangPath(pathname, lang) + window.location.search + window.location.hash);
    },
    [initial, pathname, router],
  );

  return (
    <LanguageContext.Provider value={{ language: initial, setLanguage }}>
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
