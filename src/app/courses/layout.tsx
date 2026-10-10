import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Courses', template: '%s — Ekinoxis Labs' },
  description: 'Cohort-based, project-first courses: build your business stack, ship a web3 app.',
  alternates: { canonical: '/courses' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
