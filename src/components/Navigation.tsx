'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { BrandLockup } from '@/components/ui/BrandLogo';

/** A leaf link in the nav. `exact` stops a parent route from matching its children. */
type NavItem = { href: string; label: string; exact?: boolean };

export default function Navigation() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const t = content[language].nav;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // menuRef covers the desktop nav; mobileMenuRef covers the mobile overlay.
      // On touch devices the emulated mousedown fires before click — collapsing
      // the accordion here would unmount sub-links before their tap completes.
      if (menuRef.current?.contains(target)) return;
      if (mobileMenuRef.current?.contains(target)) return;
      setExpandedMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMenu(null);
  }, [pathname]);

  const menuItems = {
    'about-us': {
      label: language === 'en' ? 'About' : 'Nosotros',
      items: [
        { href: '/culture', label: t.culture },
        { href: '/hackers', label: t.hackers },
        { href: '/tech-stack', label: t.techStack },
        { href: '/brand', label: t.brand },
      ],
    },
    services: {
      label: t.services,
      items: [
        { href: '/services/consultation', label: language === 'en' ? 'Consultation' : 'Consultoría' },
        { href: '/services/web-development', label: language === 'en' ? 'Web Dev' : 'Desarrollo Web' },
        { href: '/services/app-building', label: language === 'en' ? 'App Building' : 'Desarrollo de Apps' },
      ],
    },
    learn: {
      label: t.learn,
      items: [
        { href: '/courses', label: t.courses },
        { href: '/education', label: t.knowledge },
      ],
    },
    portfolio: {
      label: t.portfolio,
      href: '/portfolio',
      items: [
        { href: '/portfolio', label: language === 'en' ? 'All work' : 'Todo', exact: true },
        { href: '/portfolio/products', label: language === 'en' ? 'Products' : 'Productos' },
        { href: '/portfolio/experiments', label: language === 'en' ? 'Experiments' : 'Experimentos' },
        { href: '/portfolio/proofs-of-concept', label: language === 'en' ? 'Proofs of Concept' : 'Pruebas de Concepto' },
        { href: '/portfolio/clients', label: language === 'en' ? 'Clients' : 'Clientes' },
      ],
    },
    'hacker-house': { label: t.hackerHouse, href: '/hacker-house' },
  };

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || (href !== '/' && pathname.startsWith(href));
  const isMenuActive = (key: string) => {
    const m = menuItems[key as keyof typeof menuItems];
    return 'items' in m && m.items?.some((i) => isActive(i.href, (i as NavItem).exact));
  };

  const linkBase = 'font-label text-[13px] font-medium uppercase tracking-tighter transition-colors duration-200 px-4 py-2';
  const linkActive = 'text-primary bg-primary/10 border-b-2 border-primary shadow-[0_0_12px_rgba(143,245,255,0.15)]';
  const linkInactive = 'text-on-surface-variant hover:text-primary border-b-2 border-transparent';

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.1 } },
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl">
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <nav className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center h-16">

          {/* Logo — brand lockup: mark + wordmark */}
          <Link
            href="/"
            aria-label="Ekinoxis"
            className="group flex items-center shrink-0 transition-opacity hover:opacity-80"
          >
            <BrandLockup size={28} className="group-hover:[&_svg_path]:drop-shadow-[0_0_8px_rgba(143,245,255,0.6)]" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center" ref={menuRef}>
            <DropdownMenu
              label={menuItems['about-us'].label}
              items={menuItems['about-us'].items}
              menuKey="about-us"
              expanded={expandedMenu}
              setExpanded={setExpandedMenu}
              isActive={isMenuActive('about-us')}
              isItemActive={isActive}
              variants={dropdownVariants}
              linkBase={linkBase}
              linkActive={linkActive}
              linkInactive={linkInactive}
            />
            <DropdownMenu
              label={menuItems['services'].label}
              items={menuItems['services'].items}
              menuKey="services"
              expanded={expandedMenu}
              setExpanded={setExpandedMenu}
              isActive={isMenuActive('services')}
              isItemActive={isActive}
              variants={dropdownVariants}
              linkBase={linkBase}
              linkActive={linkActive}
              linkInactive={linkInactive}
            />
            <DropdownMenu
              label={menuItems['learn'].label}
              items={menuItems['learn'].items}
              menuKey="learn"
              expanded={expandedMenu}
              setExpanded={setExpandedMenu}
              isActive={isMenuActive('learn')}
              isItemActive={isActive}
              variants={dropdownVariants}
              linkBase={linkBase}
              linkActive={linkActive}
              linkInactive={linkInactive}
            />
            <DropdownMenu
              label={menuItems['portfolio'].label}
              href={menuItems['portfolio'].href}
              items={menuItems['portfolio'].items}
              menuKey="portfolio"
              expanded={expandedMenu}
              setExpanded={setExpandedMenu}
              isActive={isMenuActive('portfolio')}
              isItemActive={isActive}
              variants={dropdownVariants}
              linkBase={linkBase}
              linkActive={linkActive}
              linkInactive={linkInactive}
            />
            <Link
              href="/hacker-house"
              className={`${linkBase} ${isActive('/hacker-house') ? linkActive : linkInactive}`}
            >
              {menuItems['hacker-house'].label}
            </Link>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="font-mono text-[13px] text-primary hover:bg-primary/5 min-h-[44px] px-3 flex items-center transition-all"
            >
              {language === 'en' ? 'EN/ES' : 'ES/EN'}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-primary p-3 -mr-2"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — fixed overlay OUTSIDE the header to avoid touch-event clipping */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            ref={mobileMenuRef}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-black/95 backdrop-blur-xl border-t border-outline-variant/20 max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <div className="px-6 py-2 flex flex-col">
              {Object.entries(menuItems).map(([key, menu]) => {
                if ('items' in menu && menu.items) {
                  return (
                    <div key={key} className="border-b border-outline-variant/10">
                      <button
                        onClick={() => setExpandedMenu(expandedMenu === key ? null : key)}
                        className="w-full text-left py-4 font-label text-[13px] font-medium uppercase tracking-tighter text-on-surface-variant flex items-center justify-between"
                      >
                        {menu.label}
                        <span className="text-[10px] text-outline">{expandedMenu === key ? '▲' : '▼'}</span>
                      </button>
                      {expandedMenu === key && (
                        <div className="pb-2 flex flex-col">
                          {menu.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`pl-4 min-h-[44px] flex items-center font-mono text-[12px] uppercase tracking-widest ${isActive(item.href, (item as NavItem).exact) ? 'text-primary border-l-2 border-primary bg-primary/5' : 'text-on-surface-variant'}`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                if ('href' in menu && menu.href) {
                  return (
                    <Link
                      key={key}
                      href={menu.href}
                      className={`py-4 font-label text-[13px] font-medium uppercase tracking-tighter border-b border-outline-variant/10 ${isActive(menu.href) ? 'text-primary border-l-2 border-l-primary pl-3 bg-primary/5' : 'text-on-surface-variant'}`}
                    >
                      {menu.label}
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Reusable desktop dropdown component ── */
interface DropdownMenuProps {
  label: string;
  /** when set, the label navigates here and only the caret toggles the menu */
  href?: string;
  items: { href: string; label: string; exact?: boolean }[];
  menuKey: string;
  expanded: string | null;
  setExpanded: (key: string | null) => void;
  isActive: boolean;
  isItemActive: (href: string, exact?: boolean) => boolean;
  variants: Variants;
  linkBase: string;
  linkActive: string;
  linkInactive: string;
}

function DropdownMenu({
  label, href, items, menuKey, expanded, setExpanded,
  isActive, isItemActive, variants, linkBase, linkActive, linkInactive,
}: DropdownMenuProps) {
  const isOpen = expanded === menuKey;
  return (
    <div className="relative">
      {href ? (
        <div className={`${isActive ? linkActive : linkInactive} flex items-center`}>
          <Link
            href={href}
            onClick={() => setExpanded(null)}
            className="font-label text-[13px] font-medium uppercase tracking-tighter transition-colors duration-200 pl-4 py-2"
          >
            {label}
          </Link>
          <button
            onClick={() => setExpanded(isOpen ? null : menuKey)}
            aria-label={`${label} menu`}
            aria-expanded={isOpen}
            className="pl-1 pr-4 py-2 text-[8px] text-outline hover:text-primary transition-colors duration-200"
          >
            {isOpen ? '▲' : '▼'}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setExpanded(isOpen ? null : menuKey)}
          className={`${linkBase} ${isActive ? linkActive : linkInactive} flex items-center gap-1`}
        >
          {label}
          <span className="text-[10px] text-outline">{isOpen ? '▲' : '▼'}</span>
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-1 min-w-[160px] bg-surface-container-high/95 backdrop-blur-xl border border-outline-variant/20 overflow-hidden z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setExpanded(null)}
                className={`block px-4 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  isItemActive(item.href, item.exact)
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
