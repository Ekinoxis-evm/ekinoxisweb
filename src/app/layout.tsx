import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Ekinoxis Labs',
  description: 'First Innovation Laboratory of the Colombian Pacific specialized in Blockchain, Cryptography and AI',
  keywords: ['Blockchain', 'Cryptography', 'Artificial Intelligence', 'Innovation', 'Colombia', 'WEB3'],
  icons: {
    icon: '/logo/logo.png',
    apple: '/logo/logo.png',
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
