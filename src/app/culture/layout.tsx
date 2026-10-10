import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Culture',
  description: 'How Ekinoxis Labs works: the values behind a lab building with AI, blockchain and cryptography from the Colombian Pacific.',
  alternates: { canonical: '/culture' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
