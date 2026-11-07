'use client';

import Link from '@/components/LocalizedLink';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { LEGAL_SLUGS, PRIVACY_EMAIL, legal, type LegalBlock, type LegalSlug } from '@/lib/legal';

/**
 * One legal document (privacy, terms, data deletion) laid out as a readable
 * page: a sticky table of contents on laptops, numbered sections with anchors,
 * definition tables drawn as hairline grids, and the sibling documents at the
 * end. The text itself lives in src/lib/legal.ts.
 */

const formatDate = (iso: string, lang: 'en' | 'es') =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

/** Email addresses in the text become mailto links; the rest is plain text. */
function withMailto(text: string) {
  const parts = text.split(/([\w.+-]+@ekinoxis\.xyz)/g);
  return parts.map((part, i) =>
    /@ekinoxis\.xyz$/.test(part) ? (
      <a key={i} href={`mailto:${part}`} className="text-primary underline-offset-4 hover:underline">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function Block({ block }: { block: LegalBlock }) {
  if ('p' in block) {
    return <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">{withMailto(block.p)}</p>;
  }
  if ('list' in block) {
    return (
      <ul className="space-y-3">
        {block.list.map((item, i) => (
          <li key={i} className="flex gap-4 font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            <span aria-hidden className="mt-[0.8em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{withMailto(item)}</span>
          </li>
        ))}
      </ul>
    );
  }
  const { head, rows } = block.table;
  // A definition grid: stacked on phones, two columns from `sm`. The 1px gap is the border.
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[minmax(0,34%)_1fr] gap-px bg-primary/10">
      <dt className="hidden sm:block bg-surface-container-high px-4 py-3 font-mono text-[12px] uppercase tracking-widest text-outline">{head[0]}</dt>
      <dd className="hidden sm:block bg-surface-container-high px-4 py-3 font-mono text-[12px] uppercase tracking-widest text-outline">{head[1]}</dd>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="bg-surface-container-low px-4 pt-4 pb-1 sm:py-4 font-label text-[13px] font-medium tracking-wide text-on-surface">{k}</dt>
          <dd className="bg-surface-container-low px-4 pb-4 pt-1 sm:py-4 font-body text-[15px] leading-relaxed text-on-surface-variant">{withMailto(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function LegalDocument({ slug }: { slug: LegalSlug }) {
  const { language } = useLanguage();
  const en = language === 'en';
  const doc = legal[language][slug];
  const siblings = LEGAL_SLUGS.filter((s) => s !== slug).map((s) => ({ href: `/${s}`, label: legal[language][s].label }));

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-12 md:py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">
          {/* Header */}
          <header className="rise mb-12 md:mb-20 max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-[12px] text-outline tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1 text-primary">Legal</span>
              <span>/</span>
              <span className="border border-primary/30 px-2 py-1">{doc.label}</span>
            </div>
            <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6">{doc.title}</h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-6">{doc.summary}</p>
            <div className="flex flex-wrap items-center gap-3">
              <ScanBadge variant="muted">{en ? 'Last updated' : 'Última actualización'} · {formatDate(doc.updated, language)}</ScanBadge>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contents */}
            <nav aria-label={en ? 'Contents' : 'Contenido'} className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-4">{en ? 'Contents' : 'Contenido'}</p>
                <ol className="flex flex-col gap-px bg-primary/10">
                  {doc.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block bg-surface-container-low px-4 py-3 font-label text-[13px] tracking-wide text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors duration-300"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* Document */}
            <article className="lg:col-span-8 xl:col-span-7 max-w-3xl">
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28 mb-14 md:mb-20">
                  <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight leading-tight text-on-surface mb-6">{s.heading}</h2>
                  <div className="space-y-5">
                    {s.blocks.map((b, i) => (
                      <Block key={i} block={b} />
                    ))}
                  </div>
                </section>
              ))}

              {/* Request line + siblings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 mt-6">
                <div className="bg-surface-container-low p-6 md:p-10">
                  <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-3">{en ? 'Your data' : 'Tus datos'}</p>
                  <p className="font-body text-[15px] text-on-surface-variant leading-relaxed mb-4">
                    {en ? 'A copy, a correction or a deletion: one email is enough.' : 'Una copia, una corrección o la eliminación: basta un correo.'}
                  </p>
                  <a href={`mailto:${PRIVACY_EMAIL}`} className="inline-flex min-h-[44px] items-center font-label text-[13px] font-bold uppercase tracking-widest text-primary hover:text-primary-dim transition-colors">
                    {PRIVACY_EMAIL}
                  </a>
                </div>
                <div className="bg-surface-container-low p-6 md:p-10">
                  <p className="font-mono text-[12px] text-outline uppercase tracking-widest mb-3">{en ? 'Also read' : 'Lee también'}</p>
                  <ul className="flex flex-col">
                    {siblings.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="inline-flex min-h-[44px] items-center font-label text-[13px] font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
