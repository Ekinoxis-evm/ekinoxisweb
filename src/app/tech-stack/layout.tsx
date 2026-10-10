import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: 'The tools Ekinoxis Labs builds with: AI, blockchain, cloud and front-end.',
  alternates: { canonical: '/tech-stack' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
