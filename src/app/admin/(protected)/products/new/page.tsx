import { createClient } from '@/lib/supabase/server'
import ProductForm from '../ProductForm'

export default async function NewProductPage() {
  const supabase = await createClient()
  const [{ data: hackathons }, { data: hackers }] = await Promise.all([
    supabase.from('hackathons').select('*').order('start_date', { ascending: false }),
    supabase.from('hackers').select('*').order('display_order', { ascending: true }),
  ])

  return <ProductForm hackathons={hackathons ?? []} allHackers={hackers ?? []} />
}
