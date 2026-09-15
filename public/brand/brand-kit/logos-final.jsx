/* global React */

// ═══════════════════════════════════════════════════════════
// EKINOXIS — FINAL LOCKUP
// Equinox solid half-disc + [ EKINOXIS ] bracket wordmark.
// One source of truth for the brand kit + future work.
// ═══════════════════════════════════════════════════════════

const EKX = {
  cyan: '#8ff5ff',
  cyanDim: 'rgba(143,245,255,.35)',
  ink: '#e8f2fb',
  mute: '#a2acb5',
  label: '#6c777f',
  ghost: '#3f4951',
  primaryDeep: '#005d63',
};

const ekxHead = (size, color = EKX.ink, weight = 700) => ({
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: weight,
  fontSize: size,
  letterSpacing: '-0.04em',
  lineHeight: 1,
  color,
  textTransform: 'uppercase',
});
const ekxMono = (size = 10, color = EKX.label) => ({
  fontFamily: "'Space Mono', ui-monospace, monospace",
  fontSize: size,
  letterSpacing: '0.22em',
  color,
  textTransform: 'uppercase',
});

// ─── The Mark ─────────────────────────────────────────────
function EkxMark({ size = 100, fill = EKX.cyan, ring = EKX.ghost, bg = '#000', axis = '#000', glow = true }) {
  const cx = size / 2, cy = size / 2, r = (size / 2) - Math.max(2, size * 0.025);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible', filter: glow ? `drop-shadow(0 0 ${size * 0.12}px rgba(143,245,255,.35))` : 'none' }}>
      <circle cx={cx} cy={cy} r={r} fill={bg} stroke={ring} strokeWidth={Math.max(1, size * 0.008)} />
      <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`} fill={fill} />
      <line x1={cx} y1={cy - r - Math.max(1, size * 0.02)} x2={cx} y2={cy + r + Math.max(1, size * 0.02)} stroke={axis} strokeWidth={Math.max(1.2, size * 0.012)} />
    </svg>
  );
}

// ─── The Wordmark (just the bracket-wrapped type, no symbol) ───
function EkxWordmark({ size = 40, color = EKX.ink, bracket = EKX.cyan, slug = null, slugMono = true }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: size * 0.16 }}>
      <span style={{ ...ekxHead(size * 1.25, bracket, 300), lineHeight: 1 }}>[</span>
      <span style={ekxHead(size, color)}>EKINOXIS</span>
      {slug && (
        slugMono
          ? <span style={ekxMono(size * 0.28, bracket)}>{`// ${slug}`}</span>
          : <span style={ekxHead(size * 0.5, bracket, 500)}>{slug}</span>
      )}
      <span style={{ ...ekxHead(size * 1.25, bracket, 300), lineHeight: 1 }}>]</span>
    </div>
  );
}

// ─── Master horizontal lockup ─────────────────────────────
function EkxLockup({ scale = 1, slug = null, tone = 'cyan-on-dark' }) {
  const fill = tone === 'mono-white' ? EKX.ink : (tone === 'mono-black' ? '#000' : EKX.cyan);
  const ring = tone === 'mono-white' ? EKX.ink : (tone === 'mono-black' ? '#000' : EKX.ghost);
  const wordColor = (tone === 'mono-black' || tone === 'cyan-on-light') ? '#000' : EKX.ink;
  const bracket = tone === 'mono-white' ? EKX.ink : (tone === 'mono-black' ? '#000' : EKX.cyan);
  const axis = tone === 'mono-white' ? '#000' : (tone === 'mono-black' ? EKX.ink : '#000');
  const bg = tone === 'cyan-on-dark' ? '#000' : 'transparent';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 26 * scale }}>
      <EkxMark size={92 * scale} fill={fill} ring={ring} bg={bg} axis={axis} glow={tone === 'cyan-on-dark'} />
      <EkxWordmark size={46 * scale} color={wordColor} bracket={bracket} slug={slug} />
    </div>
  );
}

// ─── Stacked lockup ───────────────────────────────────────
function EkxStacked({ scale = 1, slug = null, tone = 'cyan-on-dark' }) {
  const fill = tone === 'mono-white' ? EKX.ink : (tone === 'mono-black' ? '#000' : EKX.cyan);
  const ring = tone === 'mono-white' ? EKX.ink : (tone === 'mono-black' ? '#000' : EKX.ghost);
  const wordColor = (tone === 'mono-black' || tone === 'cyan-on-light') ? '#000' : EKX.ink;
  const bracket = tone === 'mono-white' ? EKX.ink : (tone === 'mono-black' ? '#000' : EKX.cyan);
  const axis = tone === 'mono-white' ? '#000' : (tone === 'mono-black' ? EKX.ink : '#000');
  const bg = tone === 'cyan-on-dark' ? '#000' : 'transparent';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 18 * scale }}>
      <EkxMark size={160 * scale} fill={fill} ring={ring} bg={bg} axis={axis} glow={tone === 'cyan-on-dark'} />
      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 10 * scale }}>
        <span style={{ ...ekxHead(60 * scale, bracket, 300), lineHeight: 1 }}>[</span>
        <span style={ekxHead(46 * scale, wordColor)}>EKINOXIS</span>
        <span style={{ ...ekxHead(60 * scale, bracket, 300), lineHeight: 1 }}>]</span>
      </div>
      {slug && <span style={{ ...ekxMono(11 * scale, bracket) }}>{slug}</span>}
    </div>
  );
}

window.EkxBrand = { EKX, ekxHead, ekxMono, EkxMark, EkxWordmark, EkxLockup, EkxStacked };
