import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ScanBadge from '@/components/ui/ScanBadge'

function getHackathonStatus(start: string | null, end: string | null) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const s = start ? new Date(start) : null
  const e = end ? new Date(end) : null
  if (s && s > today) return { label: 'INCOMING', variant: 'tertiary' as const }
  if (s && e && s <= today && e >= today) return { label: 'ONGOING', variant: 'primary' as const }
  return { label: 'PAST', variant: 'muted' as const }
}

export default async function AdminHackathonsPage() {
  const supabase = await createClient()
  const { data: hackathons } = await supabase
    .from('hackathons')
    .select('id, name, start_date, end_date, website')
    .order('start_date', { ascending: false })

  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">EKX_ADMIN</span>
        <span className="text-outline">/</span>
        <span className="border border-primary/30 px-2 py-1">HACKATHONS</span>
      </div>

      <div className="flex items-end justify-between mb-8">
        <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface">
          HACKATHONS <span className="text-primary">({hackathons?.length ?? 0})</span>
        </h1>
        <Link
          href="/admin/hackathons/new"
          className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-200"
        >
          + NEW HACKATHON
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px bg-primary/10">
        <div className="bg-surface-container-high grid grid-cols-[1fr_130px_220px_80px] gap-4 px-6 py-3">
          {['NAME', 'STATUS', 'DATES', 'ACTIONS'].map((h) => (
            <span key={h} className="font-mono text-[9px] text-outline tracking-widest uppercase">{h}</span>
          ))}
        </div>

        {hackathons?.map((h) => {
          const status = getHackathonStatus(h.start_date, h.end_date)
          const dateStr = h.start_date
            ? `${h.start_date}${h.end_date ? ` → ${h.end_date}` : ''}`
            : 'NO DATES SET'
          return (
            <div key={h.id} className="bg-surface-container-low hover:bg-surface-container grid grid-cols-[1fr_130px_220px_80px] gap-4 px-6 py-4 items-center group transition-colors duration-200">
              <div className="font-label text-sm text-on-surface uppercase tracking-tight">{h.name}</div>
              <ScanBadge variant={status.variant}>{status.label}</ScanBadge>
              <span className="font-mono text-[10px] text-on-surface-variant tracking-widest">{dateStr}</span>
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link href={`/admin/hackathons/${h.id}`} className="font-mono text-[9px] text-primary hover:underline uppercase tracking-widest">EDIT</Link>
              </div>
            </div>
          )
        })}

        {(!hackathons || hackathons.length === 0) && (
          <div className="bg-surface-container-low px-6 py-12 text-center">
            <p className="font-mono text-[10px] text-outline tracking-widest uppercase">NO HACKATHONS FOUND</p>
          </div>
        )}
      </div>
    </div>
  )
}
