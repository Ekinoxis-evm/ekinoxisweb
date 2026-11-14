import type { ProjectType } from '@/lib/supabase/types'

/**
 * The two divisions of the portfolio. Slugs stay in English for both
 * languages — Spanish pages live at the same path under /es.
 *
 * Order here is the order they appear on /portfolio and in the nav.
 * The old experiments / proofs-of-concept divisions are gone: they were legacy
 * labels for products at an early phase, and phase now says that.
 */
export interface Division {
  /** URL segment of its case studies: /portfolio/<slug>/<project> */
  slug: string
  /** products.project_type values shown here. experiment / poc are legacy and read as products. */
  types: ProjectType[]
  /** how cards render: spec sheet, or client logo wall */
  layout: 'project' | 'client'
  en: { title: string; short: string; description: string }
  es: { title: string; short: string; description: string }
}

export const DIVISIONS: Division[] = [
  {
    slug: 'products',
    types: ['product', 'experiment', 'poc'],
    layout: 'project',
    en: {
      title: 'PRODUCTS',
      short: 'Products',
      description: 'Ours. We build them, fund them and take each one from idea to live.',
    },
    es: {
      title: 'PRODUCTOS',
      short: 'Productos',
      description: 'Nuestros. Los construimos, los financiamos y llevamos cada uno de idea a en vivo.',
    },
  },
  {
    slug: 'clients',
    types: ['client'],
    layout: 'client',
    en: {
      title: 'CLIENTS',
      short: 'Clients',
      description: 'Companies that hired us to build the software they run on.',
    },
    es: {
      title: 'CLIENTES',
      short: 'Clientes',
      description: 'Empresas que nos contrataron para construir el software con el que operan.',
    },
  },
]

export function getDivision(slug: string): Division | undefined {
  return DIVISIONS.find((d) => d.slug === slug)
}

/** The division a product row is shown in. */
function divisionForType(type: string | null | undefined): Division | undefined {
  return DIVISIONS.find((d) => d.types.includes((type ?? 'product') as ProjectType))
}

/**
 * A row has a case-study page once it has a slug and a body in at least one
 * language. Cards link to it only then, so a half-filled row never 404s.
 */
export function hasCaseStudy(p: { slug?: string | null; case_study_en?: string | null; case_study_es?: string | null }): boolean {
  return Boolean(p.slug && (p.case_study_en?.trim() || p.case_study_es?.trim()))
}

export function caseStudyHref(p: { slug?: string | null; project_type?: string | null }): string | null {
  const division = divisionForType(p.project_type)
  return p.slug && division ? `/portfolio/${division.slug}/${p.slug}` : null
}

/**
 * Build phases, in the order a product travels. Each one is graded by traction,
 * not by effort: a product moves up only when real users, then real income, say so.
 *
 * The database stores IDEA / MVP / BETA / LAUNCHED (the `product_status` enum);
 * these are the display names, so renaming a phase never needs a migration.
 */
export type PhaseKey = 'idea' | 'alpha' | 'beta' | 'live'

export interface Phase {
  key: PhaseKey
  /** products.status values that land in this phase */
  statuses: string[]
  variant: 'muted' | 'primary' | 'secondary' | 'tertiary'
  en: { label: string; hint: string }
  es: { label: string; hint: string }
}

export const PHASES: Phase[] = [
  {
    key: 'idea',
    statuses: ['IDEA'],
    variant: 'muted',
    en: { label: 'Idea', hint: 'A problem worth solving. Nothing working yet.' },
    es: { label: 'Idea', hint: 'Un problema que vale la pena resolver. Aún nada funcional.' },
  },
  {
    key: 'alpha',
    statuses: ['MVP', 'POC'],
    variant: 'primary',
    en: { label: 'Alpha', hint: 'It works. Only our team and a few invited people use it.' },
    es: { label: 'Alpha', hint: 'Funciona. Solo lo usan nuestro equipo y algunos invitados.' },
  },
  {
    key: 'beta',
    statuses: ['BETA'],
    variant: 'secondary',
    en: { label: 'Beta', hint: 'Real users outside the team. We measure how they use it.' },
    es: { label: 'Beta', hint: 'Usuarios reales fuera del equipo. Medimos cómo lo usan.' },
  },
  {
    key: 'live',
    statuses: ['LAUNCHED'],
    variant: 'tertiary',
    en: { label: 'Live', hint: 'Real users and real income, tracked every month.' },
    es: { label: 'En vivo', hint: 'Usuarios e ingresos reales, medidos cada mes.' },
  },
]

export function phaseForStatus(status: string | null | undefined): Phase {
  return PHASES.find((p) => p.statuses.includes(status ?? '')) ?? PHASES[1]
}

/** Where a division lives now that /portfolio is one page: an anchor, never its own route. */
export function divisionHref(d: Division): string {
  return d.layout === 'client' ? '/portfolio#clients' : '/portfolio#products'
}
