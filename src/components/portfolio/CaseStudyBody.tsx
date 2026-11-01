import type { ReactNode } from 'react';

/**
 * Renders the light markdown stored in products.case_study_en / _es.
 *
 * Supported: `## heading`, `### subheading`, `- list item`, blank-line
 * paragraphs, `**bold**` and `[text](https://…)`. Nothing else, on purpose:
 * the output is built as React elements (no HTML injection) and links are
 * limited to http(s) and site-relative paths, so a pasted `javascript:` URL
 * renders as plain text.
 */

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function safeHref(href: string): string | null {
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  try {
    const u = new URL(href);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}

function inline(text: string, keyBase: string): ReactNode[] {
  return text.split(INLINE).filter(Boolean).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key} className="font-semibold text-on-surface">{part.slice(2, -2)}</strong>;
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const href = safeHref(link[2]);
      if (!href) return link[1];
      const external = !href.startsWith('/');
      return (
        <a
          key={key}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-200"
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export default function CaseStudyBody({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, '\n').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {blocks.map((block, bi) => {
        const key = `b${bi}`;
        if (block.startsWith('### ')) {
          return (
            <h3 key={key} className="font-headline text-xl font-bold tracking-tight text-on-surface mt-4">
              {inline(block.slice(4), key)}
            </h3>
          );
        }
        if (block.startsWith('## ')) {
          return (
            <h2 key={key} className="font-headline text-3xl md:text-4xl font-bold tracking-tighter leading-[0.95] text-on-surface mt-8">
              {inline(block.slice(3), key)}
            </h2>
          );
        }
        const lines = block.split('\n');
        if (lines.every((l) => /^[-*] /.test(l.trim()))) {
          return (
            <ul key={key} className="flex flex-col gap-px bg-primary/10">
              {lines.map((l, li) => (
                <li key={`${key}-${li}`} className="bg-surface-container-low px-5 py-4 font-body text-base text-on-surface-variant leading-relaxed">
                  {inline(l.trim().slice(2), `${key}-${li}`)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={key} className="font-body text-lg text-on-surface-variant leading-relaxed">
            {inline(lines.join(' '), key)}
          </p>
        );
      })}
    </div>
  );
}
