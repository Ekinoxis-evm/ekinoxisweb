import { createServiceClient } from '@/lib/supabase/server'
import type { Lead } from '@/lib/supabase/types'
import LeadsClient from './LeadsClient'

/**
 * Every contact-form submission.
 *
 * Read with the service client on purpose: `public.leads` has RLS on with no
 * policies, so the session client (which the other admin pages use) would
 * come back empty. The route is already gated — this page sits inside the
 * (protected) layout, which redirects anyone who is not ADMIN_EMAIL.
 */

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage() {
  const db = createServiceClient()
  const { data, error } = await db
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) {
    return (
      <div className="font-mono text-sm text-error">
        Could not load leads: {error.message}
      </div>
    )
  }

  const leads = (data ?? []) as Lead[]
  const unread = leads.filter((l) => l.status === 'new').length
  // A lead with no notified_at never reached Telegram — usually because the
  // bot token is missing. Worth surfacing rather than discovering later.
  const unnotified = leads.filter((l) => !l.notified_at && l.status === 'new').length

  return <LeadsClient leads={leads} unread={unread} unnotified={unnotified} />
}
