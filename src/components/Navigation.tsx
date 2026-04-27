'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export default function Navigation() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = content[language].nav;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setExpandedMenu(null);
      }
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
      ],
    },
    services: {
      label: t.services,
      items: [
        { href: '/services/consultation', label: language === 'en' ? 'Consultation' : 'Consultoría' },
        { href: '/services/web-development', label: language === 'en' ? 'Web Dev' : 'Desarrollo Web' },
        { href: '/services/app-building', label: language === 'en' ? 'App Building' : 'Apps' },
      ],
    },
    'our-value': {
      label: language === 'en' ? 'Value' : 'Valor',
      items: [
        { href: '/tech-stack', label: t.techStack },
        { href: '/research', label: t.research },
        { href: '/certifications', label: t.certifications },
        { href: '/education', label: t.education },
      ],
    },
    products: { label: t.products, href: '/products' },
    'hacker-house': { label: t.hackerHouse, href: '/hacker-house' },
  };

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));
  const isMenuActive = (key: string) => {
    const m = menuItems[key as keyof typeof menuItems];
    return 'items' in m && m.items?.some((i) => isActive(i.href));
  };

  const linkBase = 'font-label text-xs uppercase tracking-tighter transition-colors duration-200 px-4 py-2';
  const linkActive = 'text-primary border-b-2 border-primary pb-1';
  const linkInactive = 'text-on-surface-variant hover:text-primary';

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.1 } },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl">
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <nav className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center h-16">

        {/* Logo */}
        <Link href="/" className="font-headline text-xl font-bold tracking-tighter text-primary uppercase hover:text-glow transition-all">
          EKINOXIS
        </Link>

        {/* Desktop nav */}
        {(
          <div className="hidden lg:flex items-center" ref={menuRef}>
            {/* About dropdown */}
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
            {/* Services dropdown */}
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
            {/* Our Value dropdown */}
            <DropdownMenu
              label={menuItems['our-value'].label}
              items={menuItems['our-value'].items}
              menuKey="our-value"
              expanded={expandedMenu}
              setExpanded={setExpandedMenu}
              isActive={isMenuActive('our-value')}
              isItemActive={isActive}
              variants={dropdownVariants}
              linkBase={linkBase}
              linkActive={linkActive}
              linkInactive={linkInactive}
            />
            {/* Products */}
            <Link
              href="/products"
              className={`${linkBase} ${isActive('/products') ? linkActive : linkInactive}`}
            >
              {menuItems['products'].label}
            </Link>
            {/* Hacker House */}
            <Link
              href="/hacker-house"
              className={`${linkBase} ${isActive('/hacker-house') ? linkActive : linkInactive}`}
            >
              {menuItems['hacker-house'].label}
            </Link>
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="font-mono text-xs text-primary hover:bg-primary/5 px-2 py-1 transition-all"
          >
            {language === 'en' ? 'EN/ES' : 'ES/EN'}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary p-1"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-outline-variant/20"
          >
            <div className="px-6 py-4 flex flex-col">
              {Object.entries(menuItems).map(([key, menu]) => {
                if ('href' in menu && menu.href) {
                  return (
                    <Link
                      key={key}
                      href={menu.href}
                      onClick={() => { setMobileMenuOpen(false); setExpandedMenu(null); }}
                      className={`py-4 font-label text-xs uppercase tracking-tighter border-b border-outline-variant/10 ${isActive(menu.href) ? 'text-primary' : 'text-on-surface-variant'}`}
                    >
                      {menu.label}
                    </Link>
                  );
                }
                if ('items' in menu) {
                  return (
                    <div key={key} className="border-b border-outline-variant/10">
                      <button
                        onClick={() => setExpandedMenu(expandedMenu === key ? null : key)}
                        className="w-full text-left py-4 font-label text-xs uppercase tracking-tighter text-on-surface-variant hover:text-primary transition-colors flex items-center justify-between"
                      >
                        {menu.label}
                        <span className="text-[8px] text-outline">{expandedMenu === key ? '▲' : '▼'}</span>
                      </button>
                      {expandedMenu === key && (
                        <div className="pb-2 flex flex-col">
                          {menu.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`pl-4 min-h-[44px] flex items-center font-mono text-[11px] uppercase tracking-widest ${isActive(item.href) ? 'text-primary' : 'text-outline'}`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── Reusable dropdown component ── */
interface DropdownMenuProps {
  label: string;
  items: { href: string; label: string }[];
  menuKey: string;
  expanded: string | null;
  setExpanded: (key: string | null) => void;
  isActive: boolean;
  isItemActive: (href: string) => boolean;
  variants: Variants;
  linkBase: string;
  linkActive: string;
  linkInactive: string;
}

function DropdownMenu({
  label, items, menuKey, expanded, setExpanded,
  isActive, isItemActive, variants, linkBase, linkActive, linkInactive,
}: DropdownMenuProps) {
  const isOpen = expanded === menuKey;
  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(isOpen ? null : menuKey)}
        className={`${linkBase} ${isActive ? linkActive : linkInactive} flex items-center gap-1`}
      >
        {label}
        <span className="text-[8px] text-outline">{isOpen ? '▲' : '▼'}</span>
      </button>
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
                  isItemActive(item.href)
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
