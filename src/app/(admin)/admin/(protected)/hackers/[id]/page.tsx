import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import HackerForm from '../HackerForm'

export default async function EditHackerPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: hacker } = await supabase.from('hackers').select('*').eq('id', params.id).single()
  if (!hacker) notFound()
  return <HackerForm hacker={hacker} />
}
