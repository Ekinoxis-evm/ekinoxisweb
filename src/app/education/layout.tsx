import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'University partnerships, workshops and certifications in blockchain and AI across Latin America.',
  alternates: { canonical: '/education' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
