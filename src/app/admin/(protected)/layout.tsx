import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export const metadata = {
  title: 'Admin — Ekinoxis',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL
  const isAdmin = user && user.email === adminEmail

  // Redirect to login if no valid admin session
  // (login page itself is outside this layout — see file structure)
  if (!isAdmin) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanline-overlay opacity-20" />

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-surface-container-low border-b border-outline-variant/20 z-50 flex items-center px-6 gap-4">
        <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
          EKX_ADMIN
        </span>
        <span className="text-outline-variant/40 text-xs">|</span>
        <span className="font-mono text-[10px] text-outline tracking-widest uppercase">
          {user.email}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-tertiary-dim" />
          <span className="font-mono text-[9px] text-tertiary-dim tracking-widest uppercase">
            SESSION ACTIVE
          </span>
        </div>
      </header>

      <div className="flex pt-12">
        <AdminSidebar />

        {/* Main content — offset for sidebar */}
        <main className="flex-1 xl:ml-56 min-h-screen p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
