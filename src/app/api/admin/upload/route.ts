import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/admin-auth'

export async function POST(request: NextRequest) {
  const { error, db } = await requireAdmin()
  if (error) return error

  const formData = await request.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'general'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop()
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = await file.arrayBuffer()

  const { data, error: uploadError } = await db!.storage
    .from('ekinoxis-public')
    .upload(filename, buffer, { contentType: file.type, upsert: false })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = db!.storage
    .from('ekinoxis-public')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
