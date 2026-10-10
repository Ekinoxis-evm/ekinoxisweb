import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Hackers',
  description: 'The people building at Ekinoxis Labs.',
  alternates: { canonical: '/hackers' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
