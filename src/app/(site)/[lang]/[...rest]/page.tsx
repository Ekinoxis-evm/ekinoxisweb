import { notFound } from 'next/navigation';

/** Any address under a language that no page claims is a 404 inside the site shell. */
export default function CatchAll() {
  notFound();
}
