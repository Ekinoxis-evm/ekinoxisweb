import { createClient, createServiceClient } from './server'
import { NextResponse } from 'next/server'

export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), db: null }
  }

  return { error: null, db: createServiceClient() }
}
