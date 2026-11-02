import type { Metadata } from 'next'
import { getProducts } from '@/lib/supabase/queries'
import { langOf } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import PortfolioClient from './PortfolioClient'

export const revalidate = 60

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  return pageMetadata(langOf(params), '/portfolio', {
    title: { en: 'Portfolio', es: 'Portafolio' },
    description: {
      en: 'Products, experiments, proofs of concept and client work built by Ekinoxis Labs — the first Innovation Laboratory of the Colombian Pacific.',
      es: 'Productos, experimentos, pruebas de concepto y trabajo para clientes construidos por Ekinoxis Labs — el primer Laboratorio de Innovación del Pacífico colombiano.',
    },
  })
}

export default async function PortfolioPage() {
  const products = await getProducts()
  return <PortfolioClient products={products} />
}
