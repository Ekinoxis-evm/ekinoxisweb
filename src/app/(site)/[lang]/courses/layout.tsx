import type { Metadata } from 'next';
import { langOf } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/courses', {
    section: true,
    title: { en: 'Courses', es: 'Cursos' },
    description: {
      en: 'Cohort-based, project-first courses: build your business stack, ship a web3 app.',
      es: 'Cursos por cohortes y basados en proyectos: construye el stack de tu negocio, lanza una app web3.',
    },
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
