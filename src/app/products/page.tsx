import { getProducts, getHackathons } from '@/lib/supabase/queries'
import ProductsClient from './ProductsClient'

export const revalidate = 60

export default async function ProductsPage() {
  const [products, hackathons] = await Promise.all([getProducts(), getHackathons()])
  return <ProductsClient products={products} hackathons={hackathons} />
}
