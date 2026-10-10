import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hacker House',
  description: 'The hackathons and hacker houses Ekinoxis Labs builds at, and what came out of them.',
  alternates: { canonical: '/hacker-house' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
