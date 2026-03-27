import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { error, db } = await requireAdmin()
  if (error) return error

  const body = await request.json()
  const { data, error: dbError } = await db!
    .from('hackers')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  revalidatePath('/hackers')
  return NextResponse.json(data)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { error, db } = await requireAdmin()
  if (error) return error

  const { error: dbError } = await db!.from('hackers').delete().eq('id', params.id)
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  revalidatePath('/hackers')
  return NextResponse.json({ success: true })
}
