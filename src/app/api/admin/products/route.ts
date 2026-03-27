import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/admin-auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const { error, db } = await requireAdmin()
  if (error) return error

  const { data, error: dbError } = await db!
    .from('products')
    .select('*, hackathon:hackathons(id, name)')
    .order('display_order', { ascending: true })

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const { error, db } = await requireAdmin()
  if (error) return error

  const body = await request.json()
  const { hackerIds, ...productData } = body

  const { data: product, error: dbError } = await db!
    .from('products')
    .insert(productData)
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  // Insert product_hackers junction rows
  if (hackerIds?.length > 0) {
    await db!.from('product_hackers').insert(
      hackerIds.map((id: string) => ({ product_id: product.id, hacker_id: id }))
    )
  }

  revalidatePath('/products')
  return NextResponse.json(product, { status: 201 })
}
