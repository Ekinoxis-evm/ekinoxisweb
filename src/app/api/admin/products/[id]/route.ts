import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { error, db } = await requireAdmin()
  if (error) return error

  const body = await request.json()
  const { hackerIds, ...productData } = body

  const { data: product, error: dbError } = await db!
    .from('products')
    .update(productData)
    .eq('id', params.id)
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  // Replace product_hackers: delete all then re-insert
  if (hackerIds !== undefined) {
    await db!.from('product_hackers').delete().eq('product_id', params.id)
    if (hackerIds.length > 0) {
      await db!.from('product_hackers').insert(
        hackerIds.map((id: string) => ({ product_id: params.id, hacker_id: id }))
      )
    }
  }

  revalidatePath('/products')
  return NextResponse.json(product)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { error, db } = await requireAdmin()
  if (error) return error

  const { error: dbError } = await db!.from('products').delete().eq('id', params.id)
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  revalidatePath('/products')
  return NextResponse.json({ success: true })
}
