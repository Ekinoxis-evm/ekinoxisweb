import type { Metadata, Viewport } from 'next';
import { fontClassName } from '@/lib/fonts';
import '@/app/globals.css';

/** The admin's own root: no public navigation, no analytics, never indexed. */
export const metadata: Metadata = {
  title: 'Admin — Ekinoxis',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClassName}>
      <body>{children}</body>
    </html>
  );
}
