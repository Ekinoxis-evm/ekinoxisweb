import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultation',
  description: 'Private sessions on AI, stablecoin payments, private agents and business automation. A free 30-minute call, then a two-hour personalized session for $100, with up to 5 people.',
  alternates: { canonical: '/services/consultation' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
