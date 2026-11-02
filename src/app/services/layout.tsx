import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Services', template: '%s — Ekinoxis Labs' },
  description: 'Three ways to work with Ekinoxis Labs: AI and crypto consultation from $100, websites live in 5 days from $1,500, custom software from $12,000. Colombia and the USA, in English or Spanish. Start with a free 30-minute call.',
  alternates: { canonical: '/services' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
