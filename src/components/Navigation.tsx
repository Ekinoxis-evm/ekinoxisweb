'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';

export default function Navigation() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = content[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/education', label: t.education },
    { href: '/certifications', label: t.certifications },
    { href: '/hacker-house', label: t.hackerHouse },
    { href: '/products', label: t.products },
    { href: '/research', label: t.research },
    { href: '/culture', label: t.culture },
    { href: '/tech-stack', label: t.techStack },
    { href: '/services', label: t.services },
    { href: '/hackers', label: t.hackers },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
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
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12">
              <Image
                src="/logo/ekinoxis logo.gif"
                alt="Ekinoxis Logo"
                width={48}
                height={48}
                className="animate-pulse-slow group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-cyber-blue text-2xl font-bold text-glow group-hover:text-cyber-blue-light transition-colors">
              EKINOXIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-cyber-blue text-glow bg-cyber-blue/10 border border-cyber-blue/30'
                    : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
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
          <div className="lg:hidden py-4 border-t border-cyber-blue/20">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'text-cyber-blue text-glow bg-cyber-blue/10 border border-cyber-blue/30'
                      : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

