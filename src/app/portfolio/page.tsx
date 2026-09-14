import type { Metadata } from 'next'
import { getProducts } from '@/lib/supabase/queries'
import PortfolioClient from './PortfolioClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Portfolio — Ekinoxis Labs',
  description:
    'Products, experiments, proofs of concept and client work built by Ekinoxis Labs — the first Innovation Laboratory of the Colombian Pacific.',
}

export default async function PortfolioPage() {
  const products = await getProducts()
  return <PortfolioClient products={products} />
}
