'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavItem {
  label: string;
  href: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  title?: string;
}

export default function SidebarNav({ items, title }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden xl:flex flex-col w-56 fixed top-16 left-0 bottom-0 bg-black border-r border-outline-variant/20 z-40 overflow-y-auto">
      {title && (
        <div className="px-6 py-4 border-b border-outline-variant/20">
          <span className="font-mono text-[10px] text-outline tracking-widest uppercase">{title}</span>
        </div>
      )}
      <nav className="flex flex-col py-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-6 py-3 font-label text-xs uppercase tracking-tighter transition-all duration-200
                ${isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low border-l-4 border-transparent'
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
