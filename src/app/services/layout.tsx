import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Services', template: '%s — Ekinoxis Labs' },
  description: 'Consultation, websites and custom software with AI and blockchain built in — from Ekinoxis Labs in Cali, Colombia.',
  alternates: { canonical: '/services' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
