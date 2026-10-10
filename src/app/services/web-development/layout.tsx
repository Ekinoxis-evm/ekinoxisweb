import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Websites',
  description: 'Fast, well-built websites with fixed prices and a fixed start date.',
  alternates: { canonical: '/services/web-development' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
