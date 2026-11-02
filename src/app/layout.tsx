import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';
import SmoothScroll from '@/components/SmoothScroll';
import { BookCallProvider } from '@/components/BookCall';
import JsonLd from '@/components/JsonLd';
import { organizationJsonLd } from '@/lib/seo';
import { Suspense } from 'react';
import PostHogProvider from '@/components/PostHogProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ekinoxis.xyz'),
  title: {
    default: 'Ekinoxis Labs — AI & Crypto Innovation Lab · Colombia & USA',
    template: '%s — Ekinoxis Labs',
  },
  description:
    'AI, blockchain and crypto software for your business, from Cali, Colombia and Casper, Wyoming. Consultation from $100, websites live in 5 days from $1,500, custom apps from $12,000. Book a free 30-minute call.',
  keywords: ['AI consulting Colombia', 'blockchain development', 'stablecoin payments', 'web development Cali', 'custom software', 'innovation lab', 'Ekinoxis'],
  alternates: { canonical: '/' },
  // The brand favicon set — the mark, rendered at each size a browser asks for.
  icons: {
    icon: [
      { url: '/brand/favicon/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicon/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/brand/favicon/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/brand/favicon/favicon-180.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Ekinoxis Labs — Innovation Without Frontiers',
    description: 'The first AI and crypto innovation lab of the Colombian Pacific. We unlock the power of frontier technologies for your business. Colombia & USA.',
    url: 'https://www.ekinoxis.xyz',
    siteName: 'Ekinoxis Labs',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_CO'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekinoxis Labs — Innovation Without Frontiers',
    description: 'The first AI and crypto innovation lab of the Colombian Pacific. We unlock the power of frontier technologies for your business. Colombia & USA.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <JsonLd data={organizationJsonLd()} />
        {/* CRT Scanline overlay — fixed, covers all pages */}
        <div className="fixed inset-0 z-[100] scanline-overlay opacity-20 pointer-events-none" />
        <LanguageProvider>
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
