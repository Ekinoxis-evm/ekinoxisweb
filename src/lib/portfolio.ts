import type { ProjectType } from '@/lib/supabase/types'

/**
 * The four divisions of the portfolio. Slugs stay in English for both
 * languages — the site switches language client-side on a single URL set.
 *
 * Order here is the order they appear on /portfolio and in the nav.
 */
export interface Division {
  /** URL segment under /portfolio */
  slug: string
  /** matches products.project_type */
  type: ProjectType
  /** terminal breadcrumb + UID prefix */
  uid: string
  /** how cards render: spec sheet, or client logo wall */
  layout: 'project' | 'client'
  /** grid gap tint, keeps each division visually distinct */
  accent: string
  en: { title: string; short: string; description: string }
  es: { title: string; short: string; description: string }
}

export const DIVISIONS: Division[] = [
  {
    slug: 'products',
    type: 'product',
    uid: 'PRD',
    layout: 'project',
    accent: 'bg-primary/10',
    en: {
      title: 'PRODUCTS',
      short: 'Products',
      description:
        'Ours. We own them, we pay for them, and real people use them.',
    },
    es: {
      title: 'PRODUCTOS',
      short: 'Productos',
      description:
        'Nuestros. Los financiamos nosotros, y los usa gente real.',
    },
  },
  {
    slug: 'experiments',
    type: 'experiment',
    uid: 'EXP',
    layout: 'project',
    accent: 'bg-tertiary-dim/10',
    en: {
      title: 'EXPERIMENTS',
      short: 'Experiments',
      description:
        'Live, but still being tested. Some become products. Some stay here.',
    },
    es: {
      title: 'EXPERIMENTOS',
      short: 'Experimentos',
      description:
        'En vivo, pero todavía a prueba. Algunos se vuelven productos. Otros se quedan aquí.',
    },
  },
  {
    slug: 'proofs-of-concept',
    type: 'poc',
    uid: 'POC',
    layout: 'project',
    accent: 'bg-secondary/10',
    en: {
      title: 'PROOFS OF CONCEPT',
      short: 'Proofs of Concept',
      description:
        'Built in a weekend to answer one question. Public, so you can see what we do under pressure.',
    },
    es: {
      title: 'PRUEBAS DE CONCEPTO',
      short: 'Pruebas de Concepto',
      description:
        'Construidas en un fin de semana para responder una pregunta. Públicas, para que veas qué hacemos bajo presión.',
    },
  },
  {
    slug: 'clients',
    type: 'client',
    uid: 'CLI',
    layout: 'client',
    accent: 'bg-on-surface/10',
    en: {
      title: 'CLIENTS',
      short: 'Clients',
      description:
        'Companies that hired us to build the software they run on.',
    },
    es: {
      title: 'CLIENTES',
      short: 'Clientes',
      description:
        'Empresas que nos contrataron para construir el software con el que operan.',
    },
  },
]

export function getDivision(slug: string): Division | undefined {
  return DIVISIONS.find((d) => d.slug === slug)
}
