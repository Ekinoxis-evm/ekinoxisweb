'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { BrandLockup } from '@/components/ui/BrandLogo';

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const currentYear = new Date().getFullYear();

  const socials = [
    { label: 'X', href: t.socials.x },
    { label: 'Instagram', href: t.socials.instagram },
    { label: 'LinkedIn', href: (t.socials as { linkedin?: string }).linkedin ?? '' },
    { label: 'Telegram', href: t.socials.telegram },
    { label: 'Discord', href: t.socials.discord },
    { label: 'GitHub', href: t.socials.github },
  ];

  return (
    <footer className="relative z-10 bg-black border-t border-primary/5 py-12 px-6">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-end">

        {/* Left — brand */}
        <div className="flex flex-col gap-3">
          <Link href="/brand" aria-label="Ekinoxis brand kit" className="w-fit transition-opacity hover:opacity-80">
            <BrandLockup size={26} />
          </Link>
          <p className="font-mono text-xs uppercase text-outline max-w-xs leading-relaxed">
            {language === 'en'
              ? 'We build with AI, blockchain and crypto. From Cali, Colombia.'
              : 'Construimos con IA, blockchain y cripto. Desde Cali, Colombia.'}
          </p>
          <div className="font-mono text-xs uppercase text-outline/60">
            © {currentYear} EKINOXIS LABS // USA - COLOMBIA
          </div>
        </div>

        {/* Right — social links */}
        <div className="flex flex-wrap items-end justify-start md:justify-end gap-x-8 gap-y-3">
          <Link
            href="/brand"
            className="py-2 inline-flex items-center font-mono text-xs uppercase text-outline hover:text-primary hover:translate-x-0.5 transition-all duration-200"
          >
            {t.nav.brand}
          </Link>
          {socials.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 inline-flex items-center font-mono text-xs uppercase text-outline hover:text-tertiary-dim hover:translate-x-0.5 transition-all duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Hidden addresses for SEO */}
      <address className="sr-only">
        <span>159 North Wolcott Street, Suite 133, Casper, WY, USA. Tel: {t.footer.usa.phone}</span>
        <span>Calle 36#128-321, Zona Franca, Cali, Valle del Cauca, Colombia. Tel: {t.footer.colombia.phone}</span>
      </address>
    </footer>
  );
}
