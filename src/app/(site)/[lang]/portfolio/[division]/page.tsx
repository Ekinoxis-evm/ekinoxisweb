import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/supabase/queries'
import { DIVISIONS, getDivision } from '@/lib/portfolio'
import { langOf } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import DivisionClient from './DivisionClient'

export const revalidate = 60

type Props = { params: { lang: string; division: string } }

export function generateStaticParams() {
  return DIVISIONS.map((d) => ({ division: d.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const division = getDivision(params.division)
  if (!division) return {}
  return pageMetadata(langOf(params), `/portfolio/${division.slug}`, {
    title: { en: division.en.short, es: division.es.short },
    description: { en: division.en.description, es: division.es.description },
  })
}

export default async function DivisionPage({ params }: Props) {
  const division = getDivision(params.division)
  if (!division) notFound()

  const products = await getProducts()
  const items = products.filter((p) => (p.project_type ?? 'product') === division.type)

  return <DivisionClient division={division} items={items} />
}
