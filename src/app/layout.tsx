import type { Metadata } from 'next';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

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
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navigation />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

