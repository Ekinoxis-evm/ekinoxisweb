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
        'In-house IP we own, fund and keep shipping. Live products with real users, not demos.',
    },
    es: {
      title: 'PRODUCTOS',
      short: 'Productos',
      description:
        'IP propia que financiamos y seguimos desarrollando. Productos vivos con usuarios reales, no demos.',
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
        'Builds that shipped to a live URL while we test whether the idea earns a product. Some graduate, some stay here.',
    },
    es: {
      title: 'EXPERIMENTOS',
      short: 'Experimentos',
      description:
        'Desarrollos publicados en una URL en vivo mientras probamos si la idea merece ser producto. Algunos gradúan, otros se quedan aquí.',
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
        'Built to answer one question — usually in a hackathon weekend. Kept public as evidence of what the lab can do under pressure.',
    },
    es: {
      title: 'PRUEBAS DE CONCEPTO',
      short: 'Pruebas de Concepto',
      description:
        'Construidas para responder una sola pregunta — casi siempre en un fin de semana de hackathon. Públicas como evidencia de lo que el laboratorio hace bajo presión.',
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
        'Companies that hired Ekinoxis Labs to design and build the software they run on.',
    },
    es: {
      title: 'CLIENTES',
      short: 'Clientes',
      description:
        'Empresas que contrataron a Ekinoxis Labs para diseñar y construir el software con el que operan.',
    },
  },
]

export function getDivision(slug: string): Division | undefined {
  return DIVISIONS.find((d) => d.slug === slug)
}
