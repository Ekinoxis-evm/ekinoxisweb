import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ScanBadge from '@/components/ui/ScanBadge'

const statusVariant = {
  MVP: 'muted',
  BETA: 'secondary',
  LAUNCHED: 'tertiary',
} as const

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('id, name, status, website_url, technologies, categories, display_order')
    .order('display_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">EKX_ADMIN</span>
        <span className="text-outline">/</span>
        <span className="border border-primary/30 px-2 py-1">PRODUCTS</span>
      </div>

      <div className="flex items-end justify-between mb-8">
        <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface">
          PRODUCTS <span className="text-primary">({products?.length ?? 0})</span>
        </h1>
        <Link
          href="/admin/products/new"
          className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-colors duration-200"
        >
          + NEW PRODUCT
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px bg-primary/10">
        {/* Header */}
        <div className="bg-surface-container-high grid grid-cols-[1fr_120px_180px_100px] gap-4 px-6 py-3">
          {['NAME', 'STATUS', 'CATEGORIES', 'ACTIONS'].map((h) => (
            <span key={h} className="font-mono text-[9px] text-outline tracking-widest uppercase">{h}</span>
          ))}
        </div>

        {products?.map((p, idx) => (
          <div key={p.id} className="bg-surface-container-low hover:bg-surface-container grid grid-cols-[1fr_120px_180px_100px] gap-4 px-6 py-4 items-center group transition-colors duration-200">
            <div>
              <div className="font-label text-sm text-on-surface uppercase tracking-tight">{p.name}</div>
              <div className="font-mono text-[9px] text-outline mt-0.5">#{String(idx + 1).padStart(2, '0')}</div>
            </div>
            <ScanBadge variant={statusVariant[p.status]}>{p.status}</ScanBadge>
            <div className="flex flex-wrap gap-1">
              {p.categories.slice(0, 2).map((c: string) => (
                <ScanBadge key={c} variant="outline">{c}</ScanBadge>
              ))}
              {p.categories.length > 2 && (
                <ScanBadge variant="muted">+{p.categories.length - 2}</ScanBadge>
              )}
            </div>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link href={`/admin/products/${p.id}`} className="font-mono text-[9px] text-primary hover:underline uppercase tracking-widest">EDIT</Link>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <div className="bg-surface-container-low px-6 py-12 text-center">
            <p className="font-mono text-[10px] text-outline tracking-widest uppercase">NO PRODUCTS FOUND</p>
          </div>
        )}
      </div>
    </div>
  )
}
