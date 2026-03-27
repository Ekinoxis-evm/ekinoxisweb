import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import HackathonForm from '../HackathonForm'

export default async function EditHackathonPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: hackathon } = await supabase.from('hackathons').select('*').eq('id', params.id).single()
  if (!hackathon) notFound()
  return <HackathonForm hackathon={hackathon} />
}
