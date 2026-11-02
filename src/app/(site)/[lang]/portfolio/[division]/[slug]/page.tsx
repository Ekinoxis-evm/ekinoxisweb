import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/supabase/queries'
import { getDivision, hasCaseStudy } from '@/lib/portfolio'
import { langOf } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import CaseStudyClient from './CaseStudyClient'

export const revalidate = 60

type Props = { params: { lang: string; division: string; slug: string } }

/** The row behind a case-study URL, or null when the URL should 404. */
async function load(divisionSlug: string, slug: string) {
  const division = getDivision(divisionSlug)
  if (!division) return null
  const product = await getProductBySlug(slug)
  // The division in the URL must match the row, so one page has one address.
  if (!product || (product.project_type ?? 'product') !== division.type || !hasCaseStudy(product)) return null
  return { division, product }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await load(params.division, params.slug)
  if (!found) return {}
  const { product } = found
  return pageMetadata(langOf(params), `/portfolio/${params.division}/${params.slug}`, {
    title: { en: `${product.name} — Case study`, es: `${product.name} — Caso de estudio` },
    ogTitle: { en: `${product.name} — Ekinoxis case study`, es: `${product.name} — Caso de estudio de Ekinoxis` },
    description: { en: product.description_en ?? '', es: product.description_es || product.description_en || '' },
    ...(product.image_url?.startsWith('http') ? { image: product.image_url } : {}),
  })
}

export default async function CaseStudyPage({ params }: Props) {
  const found = await load(params.division, params.slug)
  if (!found) notFound()
  return <CaseStudyClient division={found.division} product={found.product} />
}
