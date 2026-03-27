import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export default async function AdminHackersPage() {
  const supabase = await createClient()
  const { data: hackers } = await supabase
    .from('hackers')
    .select('id, name, image_url, profile_en, university, github, linkedin, x')
    .order('display_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">EKX_ADMIN</span>
        <span className="text-outline">/</span>
        <span className="border border-primary/30 px-2 py-1">HACKERS</span>
      </div>

      <div className="flex items-end justify-between mb-8">
        <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface">
          HACKERS <span className="text-primary">({hackers?.length ?? 0})</span>
        </h1>
        <Link
          href="/admin/hackers/new"
          className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-200"
        >
          + NEW HACKER
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px bg-primary/10">
        <div className="bg-surface-container-high grid grid-cols-[48px_1fr_160px_160px_80px] gap-4 px-6 py-3">
          {['', 'NAME', 'ROLE', 'UNIVERSITY', 'ACTIONS'].map((h, i) => (
            <span key={i} className="font-mono text-[9px] text-outline tracking-widest uppercase">{h}</span>
          ))}
        </div>

        {hackers?.map((h, idx) => (
          <div key={h.id} className="bg-surface-container-low hover:bg-surface-container grid grid-cols-[48px_1fr_160px_160px_80px] gap-4 px-6 py-3 items-center group transition-colors duration-200">
            <div className="w-10 h-10 relative overflow-hidden grayscale">
              <Image src={h.image_url} alt={h.name} fill className="object-cover" />
            </div>
            <div>
              <div className="font-label text-sm text-on-surface uppercase tracking-tight">{h.name}</div>
              <div className="font-mono text-[9px] text-outline mt-0.5">NODE_{String(idx + 1).padStart(3, '0')}</div>
            </div>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wide truncate">{h.profile_en}</span>
            <span className="font-mono text-[10px] text-outline uppercase tracking-wide">{h.university ?? 'ANON'}</span>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link href={`/admin/hackers/${h.id}`} className="font-mono text-[9px] text-primary hover:underline uppercase tracking-widest">EDIT</Link>
            </div>
          </div>
        ))}

        {(!hackers || hackers.length === 0) && (
          <div className="bg-surface-container-low px-6 py-12 text-center">
            <p className="font-mono text-[10px] text-outline tracking-widest uppercase">NO HACKERS FOUND</p>
          </div>
        )}
      </div>
    </div>
  )
}
