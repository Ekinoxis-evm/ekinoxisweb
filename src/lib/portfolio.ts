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
        'Built at hackathons, against the clock. Public, so you can see what we ship under pressure. Some become products.',
    },
    es: {
      title: 'EXPERIMENTOS',
      short: 'Experimentos',
      description:
        'Construidos en hackathons, contra el reloj. Públicos, para que veas qué entregamos bajo presión. Algunos se vuelven productos.',
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
        'Built to answer one question before anyone spends real money: will this idea work? Some for a client, some for us.',
    },
    es: {
      title: 'PRUEBAS DE CONCEPTO',
      short: 'Pruebas de Concepto',
      description:
        'Construidas para responder una pregunta antes de invertir en serio: ¿funciona esta idea? Algunas para un cliente, otras para nosotros.',
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
