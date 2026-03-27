import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProductForm from '../ProductForm'
import type { Hacker } from '@/lib/supabase/types'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const [{ data: product }, { data: hackathons }, { data: allHackers }] = await Promise.all([
    supabase.from('products').select('*, hackathon:hackathons(*), product_hackers(hacker_id)').eq('id', params.id).single(),
    supabase.from('hackathons').select('*').order('start_date', { ascending: false }),
    supabase.from('hackers').select('*').order('display_order', { ascending: true }),
  ])

  if (!product) notFound()

  // Resolve hacker objects from junction
  const hackerIds = (product.product_hackers as { hacker_id: string }[]).map((ph) => ph.hacker_id)
  const hackers: Hacker[] = (allHackers ?? []).filter((h) => hackerIds.includes(h.id))

  const productWithRelations = {
    ...product,
    hackathon: product.hackathon ?? null,
    hackers,
  }

  return (
    <ProductForm
      product={productWithRelations}
      hackathons={hackathons ?? []}
      allHackers={allHackers ?? []}
    />
  )
}
