import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
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
  title: 'Ekinoxis Labs',
  description: 'First Innovation Laboratory of the Colombian Pacific specialized in Blockchain, Cryptography and AI',
  keywords: ['Blockchain', 'Cryptography', 'Artificial Intelligence', 'Innovation', 'Colombia', 'WEB3'],
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
    title: 'Ekinoxis Labs',
    description: 'First Innovation Laboratory of the Colombian Pacific specialized in Blockchain, Cryptography and AI',
    url: 'https://ekinoxis.xyz',
    siteName: 'Ekinoxis Labs',
    images: [{ url: '/brand/social/ekinoxis-avatar-with-wordmark-1024.png', width: 1024, height: 1024, alt: 'Ekinoxis' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekinoxis Labs',
    description: 'First Innovation Laboratory of the Colombian Pacific specialized in Blockchain, Cryptography and AI',
    images: ['/brand/social/ekinoxis-avatar-with-wordmark-1024.png'],
  },
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
        {/* CRT Scanline overlay — fixed, covers all pages */}
        <div className="fixed inset-0 z-[100] scanline-overlay opacity-20 pointer-events-none" />
        <LanguageProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
