'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'DASHBOARD', href: '/admin/dashboard' },
  { label: 'PRODUCTS', href: '/admin/products' },
  { label: 'HACKERS', href: '/admin/hackers' },
  { label: 'HACKATHONS', href: '/admin/hackathons' },
  { label: 'SERVICES', href: '/admin/services' },
  { label: 'EDUCATION', href: '/admin/education' },
  { label: 'CULTURE', href: '/admin/culture' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="hidden xl:flex flex-col w-56 fixed top-12 left-0 bottom-0 bg-black border-r border-outline-variant/20 z-40 overflow-y-auto">
      <div className="px-6 py-4 border-b border-outline-variant/20">
        <span className="font-mono text-[10px] text-outline tracking-widest uppercase">
          CONTROL PANEL
        </span>
      </div>

      <nav className="flex flex-col py-4 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-6 py-3 font-mono text-[10px] uppercase tracking-widest transition-all duration-200
                ${isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low border-l-2 border-transparent'
                }
              `}
            >
              {isActive && <span className="mr-2 text-primary">▶</span>}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-4 py-4 border-t border-outline-variant/20">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 border border-outline-variant/30 hover:border-error/40 text-outline hover:text-error font-mono text-[9px] uppercase tracking-widest py-2 transition-all duration-200"
        >
          SIGN OUT
        </button>
      </div>
    </aside>
  );
}
