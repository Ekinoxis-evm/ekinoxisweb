'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ScanBadge from '@/components/ui/ScanBadge'
import type { Lead, LeadStatus } from '@/lib/supabase/types'

const STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam']

const STATUS_VARIANT: Record<LeadStatus, 'primary' | 'tertiary' | 'secondary' | 'muted' | 'error'> = {
  new: 'primary',
  contacted: 'secondary',
  qualified: 'tertiary',
  won: 'tertiary',
  lost: 'muted',
  spam: 'error',
}

const TOPIC_LABEL: Record<string, string> = {
  consultation: 'CONSULTATION',
  web: 'WEB',
  app: 'APP',
  course: 'COURSE',
  talk: 'TALK',
  general: 'GENERAL',
}

function when(iso: string): string {
  const d = new Date(iso)
  const mins = Math.round((Date.now() - d.getTime()) / 60000)
  if (mins < 60) return `${mins}m ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)}h ago`
  return d.toISOString().slice(0, 10)
}

interface Props {
  leads: Lead[]
  unread: number
  unnotified: number
}

export default function LeadsClient({ leads, unread, unnotified }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all')

  async function setStatus(id: string, status: LeadStatus) {
    setBusy(id)
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  const shown = filter === 'all' ? leads : leads.filter((l) => l.status === filter)

  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">LEADS</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface">
          LEADS <span className="text-primary">({unread} new)</span>
        </h1>
        <div className="flex flex-wrap gap-2">
          {(['all', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`font-mono text-[9px] uppercase tracking-widest px-3 py-2 border transition-colors duration-200 ${
                filter === s
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-outline-variant/30 text-outline hover:border-primary/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {unnotified > 0 && (
        <p className="font-mono text-[10px] text-error uppercase tracking-widest border border-error/30 px-4 py-3 mb-6">
          {unnotified} new {unnotified === 1 ? 'lead' : 'leads'} never reached Telegram — check
          TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
        </p>
      )}

      {shown.length === 0 ? (
        <p className="font-mono text-xs text-outline uppercase tracking-widest py-12">
          Nothing here yet
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-px bg-primary/10">
          {shown.map((l) => {
            const isOpen = open === l.id
            return (
              <div key={l.id} className="bg-surface-container-low">
                <button
                  onClick={() => setOpen(isOpen ? null : l.id)}
                  className="w-full text-left hover:bg-surface-container transition-colors duration-200 px-6 py-4 grid grid-cols-1 sm:grid-cols-[110px_1fr_140px_90px] gap-3 sm:gap-4 items-center"
                >
                  <ScanBadge variant={STATUS_VARIANT[l.status as LeadStatus] ?? 'muted'}>
                    {l.status.toUpperCase()}
                  </ScanBadge>
                  <span className="min-w-0">
                    <span className="font-label text-sm text-on-surface uppercase tracking-tight block truncate">
                      {l.name}
                      {l.company ? ` · ${l.company}` : ''}
                    </span>
                    <span className="font-mono text-[10px] text-outline truncate block">
                      {l.email}
                      {l.budget ? ` · ${l.budget}` : ''}
                    </span>
                  </span>
                  <span className="font-mono text-[9px] text-primary/70 tracking-widest uppercase">
                    {TOPIC_LABEL[l.topic] ?? l.topic}
                  </span>
                  <span className="font-mono text-[9px] text-outline tracking-widest text-right">
                    {when(l.created_at)}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-primary/10">
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed whitespace-pre-wrap mb-6">
                      {l.message}
                    </p>

                    <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] text-outline uppercase tracking-widest mb-6">
                      <a href={`mailto:${l.email}`} className="text-primary hover:underline">
                        {l.email}
                      </a>
                      {l.whatsapp && (
                        <a
                          href={`https://wa.me/${l.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tertiary-dim hover:underline"
                        >
                          {l.whatsapp}
                        </a>
                      )}
                      <span>{l.language.toUpperCase()}</span>
                      {l.source_path && <span className="normal-case">{l.source_path}</span>}
                      {!l.notified_at && <span className="text-error">NOT NOTIFIED</span>}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          disabled={busy === l.id || l.status === s}
                          onClick={() => setStatus(l.id, s)}
                          className={`font-mono text-[9px] uppercase tracking-widest px-3 py-2 border transition-colors duration-200 ${
                            l.status === s
                              ? 'border-primary text-primary bg-primary/10 pointer-events-none'
                              : 'border-outline-variant/30 text-outline hover:border-primary/40 hover:text-primary'
                          } ${busy === l.id ? 'opacity-40' : ''}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
