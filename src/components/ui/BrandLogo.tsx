/**
 * The Ekinoxis logo, drawn from the brand masters in `public/brand/logo/`.
 *
 * Geometry is inlined rather than loaded as a file so the lockup stays vector-sharp
 * at any size, inherits the loaded Space Grotesk face, and costs no extra request.
 * The mark: a solid half-disc inside a circle, split by a vertical axis — the equinox,
 * the moment light and dark are equal. The axis line is painted in the *background*
 * colour, so it reads as a gap; pass `axis` when sitting on anything but black.
 */

type Tone = 'cyan' | 'white' | 'black';

const TONES: Record<Tone, { ring: string; disc: string; type: string; bracket: string }> = {
  cyan: { ring: '#3F4951', disc: '#8FF5FF', type: '#E8F2FB', bracket: '#8FF5FF' },
  white: { ring: '#6C777F', disc: '#E8F2FB', type: '#E8F2FB', bracket: '#E8F2FB' },
  black: { ring: '#6C777F', disc: '#000000', type: '#000000', bracket: '#000000' },
};

interface MarkProps {
  size?: number;
  tone?: Tone;
  /** Colour of the splitting axis — match the surface behind the mark. */
  axis?: string;
  className?: string;
}

export function BrandMark({ size = 32, tone = 'cyan', axis = '#000000', className }: MarkProps) {
  const c = TONES[tone];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="100" cy="100" r="95" fill="none" stroke={c.ring} strokeWidth="1.6" />
      <path d="M 100 5 A 95 95 0 0 1 100 195 Z" fill={c.disc} />
      <line x1="100" y1="1" x2="100" y2="199" stroke={axis} strokeWidth="2.4" />
    </svg>
  );
}

interface LockupProps {
  /** Height of the mark in px; the wordmark scales with it. */
  size?: number;
  tone?: Tone;
  axis?: string;
  /** `horizontal` = mark beside wordmark. `stacked` = mark above it. */
  orientation?: 'horizontal' | 'stacked';
  className?: string;
}

export function BrandLockup({
  size = 32,
  tone = 'cyan',
  axis = '#000000',
  orientation = 'horizontal',
  className = '',
}: LockupProps) {
  const c = TONES[tone];
  const stacked = orientation === 'stacked';

  return (
    <span
      className={`inline-flex items-center ${stacked ? 'flex-col gap-3' : 'gap-3'} ${className}`}
    >
      <BrandMark size={size} tone={tone} axis={axis} />
      <span
        className="font-headline font-bold uppercase leading-none whitespace-nowrap"
        style={{ fontSize: size * 0.64, letterSpacing: '-0.04em' }}
      >
        <span style={{ color: c.bracket, fontWeight: 300 }}>[</span>
        <span style={{ color: c.type, padding: '0 0.22em' }}>EKINOXIS</span>
        <span style={{ color: c.bracket, fontWeight: 300 }}>]</span>
      </span>
    </span>
  );
}
