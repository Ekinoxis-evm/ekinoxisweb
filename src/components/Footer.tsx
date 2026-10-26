'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { BrandLockup } from '@/components/ui/BrandLogo';
import { useBookCall } from '@/components/BookCall';

const TELEGRAM = 'https://t.me/ekinoxis';

export default function Footer() {
  const { language } = useLanguage();
  const bookCall = useBookCall();
  const t = content[language];
  const en = language === 'en';
  const currentYear = new Date().getFullYear();

  const socials = [
    { label: 'X', href: t.socials.x },
    { label: 'Instagram', href: t.socials.instagram },
    { label: 'LinkedIn', href: (t.socials as { linkedin?: string }).linkedin ?? '' },
    { label: 'Telegram', href: t.socials.telegram },
    { label: 'Discord', href: t.socials.discord },
    { label: 'GitHub', href: t.socials.github },
  ].filter((s) => s.href);

  // The same routes, in the same words, as the navigation bar.
  const columns = [
    {
      title: t.nav.services,
      links: [
        { href: '/services/consultation', label: en ? 'Consultation' : 'Consultoría' },
        { href: '/services/web-development', label: en ? 'Websites' : 'Sitios web' },
        { href: '/services/app-building', label: en ? 'Software & apps' : 'Software y apps' },
        { href: '/courses', label: t.nav.courses },
      ],
    },
    {
      title: t.nav.portfolio,
      links: [
        { href: '/portfolio/products', label: en ? 'Products' : 'Productos' },
        { href: '/portfolio/clients', label: en ? 'Clients' : 'Clientes' },
        { href: '/portfolio/experiments', label: en ? 'Experiments' : 'Experimentos' },
        { href: '/portfolio/proofs-of-concept', label: en ? 'Proofs of concept' : 'Pruebas de concepto' },
      ],
    },
    {
      title: en ? 'The lab' : 'El laboratorio',
      links: [
        { href: '/hacker-house', label: t.nav.hackerHouse },
        { href: '/hackers', label: t.nav.hackers },
        { href: '/education', label: t.nav.knowledge },
        { href: '/about', label: t.nav.about },
        { href: '/tech-stack', label: t.nav.techStack },
        { href: '/brand', label: t.nav.brand },
      ],
    },
  ];

  const linkClass =
    'inline-flex py-1 font-body text-sm text-on-surface-variant hover:text-primary transition-colors duration-200';

  return (
    <footer className="relative z-10 bg-black border-t border-primary/10 px-6 pt-16 pb-10">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top: brand + call to action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14">
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" aria-label="Ekinoxis" className="w-fit transition-opacity hover:opacity-80">
              <BrandLockup size={28} />
            </Link>
            <p className="font-body text-base text-on-surface-variant max-w-sm leading-relaxed">
              {en
                ? 'We unlock the power of frontier technologies like AI, blockchain and crypto.'
                : 'Desbloqueamos el poder de las tecnologías de frontera como la IA, el blockchain y las cripto.'}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button type="button" onClick={() => bookCall()}
                                className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-label text-[13px] font-bold uppercase tracking-widest text-surface-container-lowest hover:bg-primary-dim transition-colors"
              >
                {en ? 'Start a project' : 'Empieza un proyecto'}
              </button>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary/30 px-5 py-3 font-label text-[13px] font-bold uppercase tracking-widest text-primary hover:border-primary transition-colors"
              >
                Telegram <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <nav aria-label={en ? 'Footer' : 'Pie de página'} className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-4">{col.title}</p>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkClass}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-4">
                {en ? 'Where we are' : 'Dónde estamos'}
              </p>
              <address className="not-italic space-y-5 font-body text-sm text-on-surface-variant leading-relaxed">
                <div>
                  <p className="text-on-surface font-medium">Cali, Colombia</p>
                  <p>Zonamerica, Calle 36 #128-321</p>
                  <p>Valle del Cauca</p>
                </div>
                <div>
                  <p className="text-on-surface font-medium">Casper, Wyoming</p>
                  <p>159 N Wolcott St, Suite 133</p>
                  <p>United States</p>
                </div>
              </address>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between pt-8 border-t border-primary/5">
          <p className="font-mono text-[12px] uppercase tracking-widest text-outline/70">
            © {currentYear} Ekinoxis Labs · Cali — Casper
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 inline-flex font-mono text-[12px] uppercase tracking-widest text-outline hover:text-primary transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
