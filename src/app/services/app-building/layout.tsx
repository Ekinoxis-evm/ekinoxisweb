import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Built for You',
  description: 'Mobile and web apps with AI and blockchain built in. Fixed price for fixed scope.',
  alternates: { canonical: '/services/app-building' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
