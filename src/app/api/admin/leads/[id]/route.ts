import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/supabase/admin-auth'

/** PATCH /api/admin/leads/[id] — move a lead through the follow-up states. */

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'] as const

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error: authError, db } = await requireAdmin()
  if (authError) return authError

  let body: { status?: string; notes?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const patch: { status?: string; notes?: string } = {}
  if (body.status !== undefined) {
    if (!(STATUSES as readonly string[]).includes(body.status)) {
      return NextResponse.json({ error: 'Unknown status' }, { status: 400 })
    }
    patch.status = body.status
  }
  if (body.notes !== undefined) patch.notes = String(body.notes).slice(0, 4000)

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  const { error } = await db!.from('leads').update(patch).eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
