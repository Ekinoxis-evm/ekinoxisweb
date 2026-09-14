import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/supabase/queries'
import { DIVISIONS, getDivision } from '@/lib/portfolio'
import DivisionClient from './DivisionClient'

export const revalidate = 60

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ division: d.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ division: string }> }
): Promise<Metadata> {
  const { division: slug } = await params
  const division = getDivision(slug)
  if (!division) return {}
  return {
    title: `${division.en.short} — Ekinoxis Labs`,
    description: division.en.description,
  }
}

export default async function DivisionPage(
  { params }: { params: Promise<{ division: string }> }
) {
  const { division: slug } = await params
  const division = getDivision(slug)
  if (!division) notFound()

  const products = await getProducts()
  const items = products.filter((p) => (p.project_type ?? 'product') === division.type)

  return <DivisionClient division={division} items={items} />
}
