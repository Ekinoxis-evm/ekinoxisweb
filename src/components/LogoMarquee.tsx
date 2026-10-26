import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * `plate` overrides the band's plate for one mark — a white wordmark among dark ones.
 * `href` makes the tile a link to that brand's site.
 */
export type MarqueeLogo = { name: string; src: string; plate?: 'dark' | 'light'; href?: string };

interface Props {
  eyebrow: string;
  title: string;
  link: { href: string; label: string };
  logos: MarqueeLogo[];
  /**
   * Client and tool marks are transparent PNGs drawn for a dark ground; school
   * and partner marks are dark logos that need the light plate the /education
   * page already uses.
   */
  plate: 'dark' | 'light';
  /** Square tiles for app icons, wide tiles for wordmarks. */
  shape?: 'wide' | 'square';
  /** Grey until hovered — matches the /tech-stack grid. */
  mono?: boolean;
  reverse?: boolean;
  /** Seconds each tile takes to cross; lower is faster. Long lists need a quicker pace. */
  speed?: number;
}

/** Enough tiles per half that a short list still fills a 2xl screen before it repeats. */
const MIN_TILES = 12;

function fill(logos: MarqueeLogo[]) {
  const out: MarqueeLogo[] = [];
  while (out.length < MIN_TILES) out.push(...logos);
  return out;
}

/**
 * One band of logos drifting sideways. Pure CSS — the track holds two identical
 * halves and slides by exactly one half, so the loop has no seam. Pauses on
 * hover; with reduced motion the repeats hide and the row wraps.
 */
export default function LogoMarquee({ eyebrow, title, link, logos, plate, shape = 'wide', mono = false, reverse = false, speed = 4 }: Props) {
  if (logos.length === 0) return null;
  const half = fill(logos);

  const tile = (logo: MarqueeLogo, key: string, repeat: boolean) => {
    const ground = logo.plate ?? plate;
    const face = `group/tile relative flex-shrink-0 ${
      shape === 'square' ? 'w-28 h-24 md:w-32 md:h-28 p-4 flex flex-col items-center gap-2' : 'w-36 h-20 md:w-44 md:h-24 p-4 md:p-5 block'
    } transition-all duration-500 ${
      ground === 'light'
        ? 'bg-on-surface/90 hover:bg-on-surface'
        : 'bg-surface-container-low border border-primary/10 hover:border-primary/50 hover:bg-surface-container'
    } hover:shadow-[0_0_24px_rgba(143,245,255,0.25)]`;
    const inner = (
      <>
        <span className={`relative block w-full ${shape === 'square' ? 'flex-1' : 'h-full'}`}>
          <Image
            src={logo.src}
            alt={shape === 'square' ? '' : logo.name}
            fill
            className={`object-contain transition-all duration-500 ${
              mono ? 'grayscale opacity-70 group-hover/tile:grayscale-0 group-hover/tile:opacity-100' : ground === 'light' ? 'opacity-80 group-hover/tile:opacity-100' : ''
            }`}
            sizes="176px"
            unoptimized={logo.src.startsWith('http')}
          />
        </span>
        {/* Square tiles carry an icon, not a wordmark — name it so it reads at a glance (the name is the label, so the icon's alt stays empty) */}
        {shape === 'square' && logo.name && (
          <span className="w-full truncate text-center font-mono text-[11px] uppercase tracking-wider text-outline group-hover/tile:text-on-surface transition-colors">
            {logo.name}
          </span>
        )}
      </>
    );
    return (
      <li key={key} title={logo.name} aria-hidden={repeat || undefined} className={repeat ? 'motion-reduce:hidden' : undefined}>
        {logo.href ? (
          <a href={logo.href} target="_blank" rel="noopener noreferrer" tabIndex={repeat ? -1 : undefined} className={face}>
            {inner}
          </a>
        ) : (
          <div className={face}>{inner}</div>
        )}
      </li>
    );
  };

  return (
    <section className="relative z-10 border-y border-primary/10 bg-black/60 overflow-hidden">
      {/* One slow light sweep across the band */}
      <div className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent animate-[scan_9s_linear_infinite]" />

      <div className="max-w-screen-2xl mx-auto px-6 pt-10 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="font-mono text-[12px] text-primary uppercase tracking-widest mb-3">{eyebrow}</p>
          <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tighter text-on-surface">{title}</h2>
        </div>
        <Link href={link.href} className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-primary hover:text-on-surface transition-colors">
          {link.label} <ArrowRight size={14} />
        </Link>
      </div>

      <div
        className="marquee relative pb-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div
          className={`animate-marquee flex w-max motion-reduce:w-auto ${reverse ? '[animation-direction:reverse]' : ''}`}
          style={{ ['--marquee-duration' as string]: `${half.length * speed}s` }}
        >
          <ul className="flex gap-4 pr-4 motion-reduce:flex-wrap motion-reduce:px-6">
            {half.map((logo, i) => tile(logo, `${logo.src}-${i}`, i >= logos.length))}
          </ul>
          <ul className="flex gap-4 pr-4 motion-reduce:hidden" aria-hidden="true">
            {half.map((logo, i) => tile(logo, `dup-${logo.src}-${i}`, true))}
          </ul>
        </div>
      </div>
    </section>
  );
}
