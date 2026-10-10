import type { Metadata } from 'next';

// A confirmation screen after checkout — useful to the buyer, noise to a search engine.
export const metadata: Metadata = {
  title: 'Enrollment confirmed',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
