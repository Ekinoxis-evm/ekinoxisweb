import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/supabase/queries'
import { getDivision, hasCaseStudy } from '@/lib/portfolio'
import CaseStudyClient from './CaseStudyClient'

export const revalidate = 60

type Params = { params: Promise<{ division: string; slug: string }> }

/** The row behind a case-study URL, or null when the URL should 404. */
async function load(divisionSlug: string, slug: string) {
  const division = getDivision(divisionSlug)
  if (!division) return null
  const product = await getProductBySlug(slug)
  // The division in the URL must match the row, so one page has one address.
  if (!product || (product.project_type ?? 'product') !== division.type || !hasCaseStudy(product)) return null
  return { division, product }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { division, slug } = await params
  const found = await load(division, slug)
  if (!found) return {}
  const { product } = found
  return {
    title: `${product.name} — Case study`,
    description: product.description_en,
    openGraph: {
      title: `${product.name} — Ekinoxis case study`,
      description: product.description_en,
      ...(product.image_url?.startsWith('http') ? { images: [product.image_url] } : {}),
    },
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { division, slug } = await params
  const found = await load(division, slug)
  if (!found) notFound()
  return <CaseStudyClient division={found.division} product={found.product} />
}
