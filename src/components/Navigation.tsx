'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';

export default function Navigation() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = content[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setExpandedMenu(null);
      }
    };
    // Only attach for desktop menu, not mobile
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = {
    'about-us': {
      label: language === 'en' ? 'About Us' : 'Nosotros',
      items: [
        { href: '/culture', label: t.culture },
        { href: '/hackers', label: t.hackers },
        { href: '/tech-stack', label: t.techStack },
      ],
    },
    'our-value': {
      label: language === 'en' ? 'Our Value' : 'Nuestro Valor',
      items: [
        { href: '/products', label: t.products },
        { href: '/services', label: t.services },
        { href: '/research', label: t.research },
        { href: '/certifications', label: t.certifications },
        { href: '/education', label: t.education },
      ],
    },
    'hacker-house': {
      label: t.hackerHouse,
      href: '/hacker-house',
    },
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isMenuActive = (menuKey: string) => {
    if (menuKey === 'hacker-house') {
      return isActive('/hacker-house');
    }
    const menu = menuItems[menuKey as keyof typeof menuItems];
    return 'items' in menu && menu.items?.some(item => isActive(item.href));
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-black/95 backdrop-blur-md border-b border-cyber-blue/30 shadow-lg'
          : 'bg-cyber-black/80 backdrop-blur-md border-b border-cyber-blue/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Only logo, no text */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-12 h-12">
              <Image
                src="/logo/ekinoxis logo.gif"
                alt="Ekinoxis Logo"
                width={48}
                height={48}
                className="animate-pulse-slow group-hover:scale-110 transition-transform"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" ref={menuRef}>
            {/* About Us Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExpandedMenu(expandedMenu === 'about-us' ? null : 'about-us')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isMenuActive('about-us')
                    ? 'text-cyber-blue text-glow bg-cyber-blue/10 border border-cyber-blue/30'
                    : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
                }`}
              >
                {menuItems['about-us'].label}
                <span className="ml-2">{expandedMenu === 'about-us' ? '▲' : '▼'}</span>
              </button>
              {expandedMenu === 'about-us' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-cyber-black/95 backdrop-blur-md border border-cyber-blue/30 rounded-lg shadow-lg overflow-hidden">
                  {menuItems['about-us'].items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setExpandedMenu(null)}
                      className={`block px-4 py-3 text-sm transition-all ${
                        isActive(item.href)
                          ? 'text-cyber-blue bg-cyber-blue/10'
                          : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Our Value Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExpandedMenu(expandedMenu === 'our-value' ? null : 'our-value')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isMenuActive('our-value')
                    ? 'text-cyber-blue text-glow bg-cyber-blue/10 border border-cyber-blue/30'
                    : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
                }`}
              >
                {menuItems['our-value'].label}
                <span className="ml-2">{expandedMenu === 'our-value' ? '▲' : '▼'}</span>
              </button>
              {expandedMenu === 'our-value' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-cyber-black/95 backdrop-blur-md border border-cyber-blue/30 rounded-lg shadow-lg overflow-hidden">
                  {menuItems['our-value'].items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setExpandedMenu(null)}
                      className={`block px-4 py-3 text-sm transition-all ${
                        isActive(item.href)
                          ? 'text-cyber-blue bg-cyber-blue/10'
                          : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hacker House - Direct Link */}
            <Link
              href={menuItems['hacker-house'].href!}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(menuItems['hacker-house'].href!)
                  ? 'text-cyber-blue text-glow bg-cyber-blue/10 border border-cyber-blue/30'
                  : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
              }`}
            >
              {menuItems['hacker-house'].label}
            </Link>
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="ml-4 px-4 py-2 border border-cyber-blue/50 rounded-lg hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all text-cyber-blue font-medium text-sm"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="px-3 py-2 border border-cyber-blue/50 rounded-lg hover:border-cyber-blue text-cyber-blue text-sm"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-cyber-blue hover:text-cyber-blue-light transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-cyber-blue/20 relative z-50" style={{ pointerEvents: 'auto' }}>
            <div className="flex flex-col space-y-2">
              {/* About Us Mobile */}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpandedMenu(expandedMenu === 'about-us-mobile' ? null : 'about-us-mobile');
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5 transition-all touch-manipulation"
                  style={{ pointerEvents: 'auto' }}
                >
                  {menuItems['about-us'].label} {expandedMenu === 'about-us-mobile' ? '▲' : '▼'}
                </button>
                {expandedMenu === 'about-us-mobile' && (
                  <div className="pl-4 space-y-1 mt-1" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 60 }}>
                    {menuItems['about-us'].items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileMenuOpen(false);
                          setExpandedMenu(null);
                          router.push(item.href);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileMenuOpen(false);
                          setExpandedMenu(null);
                          router.push(item.href);
                        }}
                        className={`block px-4 py-2 rounded-lg text-sm touch-manipulation ${
                          isActive(item.href)
                            ? 'text-cyber-blue bg-cyber-blue/10'
                            : 'text-gray-400 hover:text-cyber-blue'
                        }`}
                        style={{ 
                          display: 'block', 
                          pointerEvents: 'auto', 
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: 61,
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Our Value Mobile */}
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpandedMenu(expandedMenu === 'our-value-mobile' ? null : 'our-value-mobile');
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5 transition-all touch-manipulation"
                  style={{ pointerEvents: 'auto' }}
                >
                  {menuItems['our-value'].label} {expandedMenu === 'our-value-mobile' ? '▲' : '▼'}
                </button>
                {expandedMenu === 'our-value-mobile' && (
                  <div className="pl-4 space-y-1 mt-1" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 60 }}>
                    {menuItems['our-value'].items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileMenuOpen(false);
                          setExpandedMenu(null);
                          router.push(item.href);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileMenuOpen(false);
                          setExpandedMenu(null);
                          router.push(item.href);
                        }}
                        className={`block px-4 py-2 rounded-lg text-sm touch-manipulation ${
                          isActive(item.href)
                            ? 'text-cyber-blue bg-cyber-blue/10'
                            : 'text-gray-400 hover:text-cyber-blue'
                        }`}
                        style={{ 
                          display: 'block', 
                          pointerEvents: 'auto', 
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: 61,
                          WebkitTapHighlightColor: 'transparent'
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Hacker House Mobile */}
              <a
                href={menuItems['hacker-house'].href!}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  router.push(menuItems['hacker-house'].href!);
                }}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                  isActive(menuItems['hacker-house'].href!)
                    ? 'text-cyber-blue text-glow bg-cyber-blue/10 border border-cyber-blue/30'
                    : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
                }`}
                style={{ display: 'block', pointerEvents: 'auto', cursor: 'pointer' }}
              >
                {menuItems['hacker-house'].label}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
