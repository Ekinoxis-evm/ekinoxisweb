import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consultation',
  description: 'Private sessions on AI, stablecoin payments, private agents and business automation. From $500 for 3 hours with up to 5 people.',
  alternates: { canonical: '/services/consultation' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
