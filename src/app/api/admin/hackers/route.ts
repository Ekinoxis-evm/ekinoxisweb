import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const { error, db } = await requireAdmin()
  if (error) return error

  const { data, error: dbError } = await db!
    .from('hackers')
    .select('*')
    .order('display_order', { ascending: true })

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const { error, db } = await requireAdmin()
  if (error) return error

  const body = await request.json()
  const { data, error: dbError } = await db!.from('hackers').insert(body).select().single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  revalidatePath('/hackers')
  return NextResponse.json(data, { status: 201 })
}
