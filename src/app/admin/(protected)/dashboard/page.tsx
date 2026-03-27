import { createClient } from '@/lib/supabase/server'

async function getCounts() {
  const supabase = await createClient()
  const [products, hackers, hackathons] = await Promise.all([
    supabase.from('products').select('id, status', { count: 'exact' }),
    supabase.from('hackers').select('id', { count: 'exact' }),
    supabase.from('hackathons').select('id', { count: 'exact' }),
  ])
  return {
    products: products.count ?? 0,
    productsByStatus: {
      MVP: products.data?.filter((p) => p.status === 'MVP').length ?? 0,
      BETA: products.data?.filter((p) => p.status === 'BETA').length ?? 0,
      LAUNCHED: products.data?.filter((p) => p.status === 'LAUNCHED').length ?? 0,
    },
    hackers: hackers.count ?? 0,
    hackathons: hackathons.count ?? 0,
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts()

  const stats = [
    { label: 'TOTAL PRODUCTS', value: String(counts.products), sub: `${counts.productsByStatus.LAUNCHED} LAUNCHED · ${counts.productsByStatus.BETA} BETA · ${counts.productsByStatus.MVP} MVP` },
    { label: 'TEAM MEMBERS', value: String(counts.hackers), sub: 'ACTIVE HACKERS' },
    { label: 'HACKATHONS', value: String(counts.hackathons), sub: 'TRACKED EVENTS' },
  ]

  const quickLinks = [
    { label: 'ADD PRODUCT', href: '/admin/products/new', color: 'primary' },
    { label: 'ADD HACKER', href: '/admin/hackers/new', color: 'secondary' },
    { label: 'ADD HACKATHON', href: '/admin/hackathons/new', color: 'tertiary' },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-8">
        <span className="border border-primary/30 px-2 py-1">EKX_ADMIN</span>
        <span className="text-outline">/</span>
        <span className="border border-primary/30 px-2 py-1">DASHBOARD</span>
      </div>

      <h1 className="font-headline text-5xl font-bold tracking-tighter leading-[0.9] uppercase text-on-surface mb-10">
        CONTROL <span className="text-primary">PANEL</span>
      </h1>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-surface-container-low p-8 relative group">
            <div className="absolute top-4 right-4 font-mono text-[9px] text-outline/50 tracking-widest">
              STAT_{String(idx + 1).padStart(2, '0')}
            </div>
            <div className="font-mono text-[10px] text-outline tracking-widest uppercase mb-3">
              {stat.label}
            </div>
            <div className="font-headline text-5xl font-bold text-primary tracking-tighter mb-2">
              {stat.value}
            </div>
            <div className="font-mono text-[9px] text-on-surface-variant tracking-widest uppercase">
              {stat.sub}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-6">
        <div className="font-mono text-[10px] text-outline tracking-widest uppercase mb-4">
          QUICK ACTIONS
        </div>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-200
                ${link.color === 'primary' ? 'border-primary/40 text-primary hover:bg-primary/10' : ''}
                ${link.color === 'secondary' ? 'border-secondary/40 text-secondary hover:bg-secondary/10' : ''}
                ${link.color === 'tertiary' ? 'border-tertiary-dim/40 text-tertiary-dim hover:bg-tertiary-dim/10' : ''}
              `}
            >
              + {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
