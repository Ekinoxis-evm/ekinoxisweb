import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';
import SmoothScroll from '@/components/SmoothScroll';
import { BookCallProvider } from '@/components/BookCall';
import JsonLd from '@/components/JsonLd';
import PostHogProvider from '@/components/PostHogProvider';
import { organizationJsonLd, siteMetadata } from '@/lib/seo';
import { fontClassName } from '@/lib/fonts';
import { LANGS, isLang, DEFAULT_LANG } from '@/lib/i18n';
import '@/app/globals.css';

type Props = { children: React.ReactNode; params: { lang: string } };

/** One static tree per language: `/...` (English, via the middleware rewrite to /en) and `/es/...`. */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export function generateMetadata({ params }: Pick<Props, 'params'>): Metadata {
  return siteMetadata(isLang(params.lang) ? params.lang : DEFAULT_LANG);
}

export default function RootLayout({ children, params }: Props) {
  const { lang } = params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={fontClassName}>
      <body>
        <JsonLd data={organizationJsonLd(lang)} />
        {/* CRT Scanline overlay — fixed, covers all pages */}
        <div className="fixed inset-0 z-[100] scanline-overlay opacity-20 pointer-events-none" />
        <LanguageProvider initial={lang}>
          {/* Suspense: useSearchParams inside the provider must not bail the whole tree out of static rendering */}
          <Suspense fallback={null}>
            <PostHogProvider>{null}</PostHogProvider>
          </Suspense>
          <BookCallProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <MobileCTA />
          <SmoothScroll />
          </BookCallProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
