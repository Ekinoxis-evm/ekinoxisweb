import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand',
  description: 'The Ekinoxis brand kit: logo, colors and typography.',
  alternates: { canonical: '/brand' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
