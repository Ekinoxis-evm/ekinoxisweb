'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Button from '@/components/ui/Button';
import ScanBadge from '@/components/ui/ScanBadge';
import { BrandMark } from '@/components/ui/BrandLogo';
import { staggerContainer, fadeInUp } from '@/lib/animations';

/* ── Asset registry ─────────────────────────────────────────────────────────
   Mirrors public/brand/. Each colorway ships as an SVG master and a 2× PNG
   with the type baked in, so neither needs the font installed to render. */

type Colorway = 'cyan-on-black' | 'cyan-transparent' | 'cyan-on-light' | 'white' | 'black';

interface Lockup {
  key: 'horizontal' | 'stacked' | 'mark' | 'wordmark';
  name: string;
  use: { en: string; es: string };
  /** Native PNG pixels — drives the preview aspect ratio. */
  w: number;
  h: number;
  /** Preview height on the plate — equalises optical weight across shapes. */
  preview: string;
  colorways: Colorway[];
}

const LOCKUPS: Lockup[] = [
  {
    key: 'horizontal',
    name: 'HORIZONTAL',
    use: {
      en: 'The primary lockup. Headers, letterheads, decks, anything wider than tall.',
      es: 'El lockup principal. Encabezados, membretes, presentaciones, todo más ancho que alto.',
    },
    w: 1396,
    h: 408,
    preview: 'h-16 md:h-20 w-auto max-w-[80%]',
    colorways: ['cyan-on-black', 'cyan-transparent', 'cyan-on-light', 'white', 'black'],
  },
  {
    key: 'stacked',
    name: 'STACKED',
    use: {
      en: 'Mark above wordmark. Square formats, stamps, merch, profile headers.',
      es: 'Símbolo sobre el logotipo. Formatos cuadrados, sellos, merch, portadas.',
    },
    w: 826,
    h: 848,
    preview: 'h-36 md:h-44 w-auto',
    colorways: ['cyan-on-black', 'cyan-transparent', 'white'],
  },
  {
    key: 'mark',
    name: 'MARK',
    use: {
      en: 'Symbol alone. Avatars, favicons, app icons, tight spaces. Minimum 24px.',
      es: 'Solo el símbolo. Avatares, favicons, íconos de app, espacios reducidos. Mínimo 24px.',
    },
    w: 400,
    h: 400,
    preview: 'h-28 md:h-36 w-auto',
    colorways: ['cyan-on-black', 'cyan-transparent', 'white', 'black'],
  },
  {
    key: 'wordmark',
    name: 'WORDMARK',
    use: {
      en: 'Type only. Where the mark already appears nearby — footers, signatures.',
      es: 'Solo tipografía. Donde el símbolo ya aparece cerca — pies de página, firmas.',
    },
    w: 1047,
    h: 364,
    preview: 'h-12 md:h-14 w-auto max-w-[80%]',
    colorways: ['cyan-on-black', 'cyan-transparent', 'cyan-on-light', 'white', 'black'],
  },
];

const file = (l: Lockup['key'], c: Colorway, ext: 'svg' | 'png') =>
  `/brand/logo/${l}/${ext}/ekinoxis-${l}-${c}.${ext}`;

/** Colorways that need a light plate behind them to be legible. */
const LIGHT_PLATE: Colorway[] = ['cyan-on-light', 'black'];

/* ── Palette ── */

interface Swatch {
  name: string;
  hex: string;
  role: { en: string; es: string };
}

const PALETTE: { group: string; swatches: Swatch[] }[] = [
  {
    group: 'CORE',
    swatches: [
      { name: 'Electric Cyan', hex: '#8FF5FF', role: { en: 'The accent. Mark, brackets, highlights', es: 'El acento. Símbolo, corchetes, destacados' } },
      { name: 'Primary Fixed', hex: '#00EEFC', role: { en: 'Saturated cyan for fills on light', es: 'Cian saturado para rellenos en claro' } },
      { name: 'Primary Dim', hex: '#00DEEC', role: { en: 'Hover / pressed', es: 'Hover / presionado' } },
      { name: 'Ink', hex: '#E8F2FB', role: { en: 'Foreground text on dark', es: 'Texto principal sobre oscuro' } },
      { name: 'Black', hex: '#000000', role: { en: 'The canvas', es: 'El lienzo' } },
    ],
  },
  {
    group: 'COSMIC BLUE',
    swatches: [
      { name: 'Secondary', hex: '#9492FF', role: { en: 'Links, secondary elements', es: 'Enlaces, elementos secundarios' } },
      { name: 'Secondary Dim', hex: '#625DFF', role: { en: 'Hover', es: 'Hover' } },
      { name: 'Secondary Container', hex: '#3106FF', role: { en: 'Deep fills', es: 'Rellenos profundos' } },
    ],
  },
  {
    group: 'NEON LIME',
    swatches: [
      { name: 'Tertiary', hex: '#F3FFCA', role: { en: 'Soft accent', es: 'Acento suave' } },
      { name: 'Tertiary Dim', hex: '#BEEE00', role: { en: 'Status, success', es: 'Estado, éxito' } },
      { name: 'Tertiary Fixed', hex: '#CAFD00', role: { en: 'High-energy accent', es: 'Acento de alta energía' } },
    ],
  },
  {
    group: 'SURFACES',
    swatches: [
      { name: 'Lowest', hex: '#000000', role: { en: 'Page background', es: 'Fondo de página' } },
      { name: 'Container Low', hex: '#09151C', role: { en: 'Cards, sections', es: 'Tarjetas, secciones' } },
      { name: 'Container', hex: '#0F1B23', role: { en: 'Card hover', es: 'Hover de tarjeta' } },
      { name: 'Container High', hex: '#14212A', role: { en: 'Elevated panels', es: 'Paneles elevados' } },
      { name: 'Container Highest', hex: '#192731', role: { en: 'Highest elevation', es: 'Máxima elevación' } },
    ],
  },
  {
    group: 'LINES & STATE',
    swatches: [
      { name: 'On-surface variant', hex: '#A2ACB5', role: { en: 'Muted body text', es: 'Texto atenuado' } },
      { name: 'Outline', hex: '#6C777F', role: { en: 'Labels, very muted', es: 'Etiquetas, muy atenuado' } },
      { name: 'Outline variant', hex: '#3F4951', role: { en: 'Ghost borders', es: 'Bordes fantasma' } },
      { name: 'Error', hex: '#FF716C', role: { en: 'Errors, destructive', es: 'Errores, destructivo' } },
    ],
  },
];

/* ── Type ── */

const FACES = [
  {
    name: 'Space Grotesk',
    className: 'font-headline',
    role: { en: 'Headlines · wordmark · labels · buttons', es: 'Titulares · logotipo · etiquetas · botones' },
    weights: '300 — 700',
    rule: { en: 'Headlines: 700, uppercase, tracking −0.04em, line-height 0.9', es: 'Titulares: 700, mayúsculas, tracking −0.04em, interlineado 0.9' },
    specimen: 'INNOVATION WITHOUT FRONTIERS',
    size: 'text-3xl md:text-5xl font-bold tracking-tighter uppercase',
  },
  {
    name: 'Inter',
    className: 'font-body',
    role: { en: 'Body copy', es: 'Texto corrido' },
    weights: '300 — 700',
    rule: { en: 'Body: 300 (light), line-height 1.65', es: 'Cuerpo: 300 (light), interlineado 1.65' },
    specimen: 'The first innovation laboratory of the Colombian Pacific.',
    size: 'text-lg md:text-2xl font-light leading-relaxed',
  },
  {
    name: 'Space Mono',
    className: 'font-mono',
    role: { en: 'Labels · numbers · code', es: 'Etiquetas · números · código' },
    weights: '400, 700',
    rule: { en: 'Metadata: 400, 10px, uppercase, tracking +0.2em', es: 'Metadatos: 400, 10px, mayúsculas, tracking +0.2em' },
    specimen: 'CALI, COLOMBIA // 3.4516° N // 0123456789',
    size: 'text-sm md:text-lg tracking-widest uppercase',
  },
];

/* ── Rules ── */

const RULES = {
  do: {
    en: [
      'Keep clear space of at least one bracket-height around the lockup',
      'Use cyan-on-black or cyan-transparent on any dark surface',
      'Use cyan-on-light on white, paper and documents',
      'Keep the axis line vertical, always',
      'Ambient cyan glow is allowed on dark surfaces',
    ],
    es: [
      'Mantén un margen libre de al menos la altura de un corchete alrededor del lockup',
      'Usa cyan-on-black o cyan-transparent sobre cualquier superficie oscura',
      'Usa cyan-on-light sobre blanco, papel y documentos',
      'Mantén el eje siempre vertical',
      'El resplandor cian ambiental está permitido sobre oscuro',
    ],
  },
  dont: {
    en: [
      'Never recolor outside the five approved colorways',
      'Never distort, rotate, stretch or outline the mark',
      'Never add drop shadows, bevels or gradients to the logo',
      'Never place the mark below 24px, or the lockup below 120px wide',
      'Never rebuild the wordmark in another typeface',
    ],
    es: [
      'Nunca recolorees fuera de las cinco versiones aprobadas',
      'Nunca distorsiones, rotes, estires ni contornees el símbolo',
      'Nunca agregues sombras, bordes biselados ni degradados al logo',
      'Nunca uses el símbolo bajo 24px, ni el lockup bajo 120px de ancho',
      'Nunca reconstruyas el logotipo en otra tipografía',
    ],
  },
};

const FAVICONS = [16, 32, 48, 180, 512];

/* ── Page ── */

export default function BrandPage() {
  const { language } = useLanguage();
  const t = content[language].brand;
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1400);
    } catch {
      /* Clipboard denied — the hex is on screen anyway. */
    }
  };

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* ── Header ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6"
            >
              <span className="border border-primary/30 px-2 py-1">BRAND</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-8">
                <motion.h1
                  variants={fadeInUp}
                  className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface uppercase mb-6"
                >
                  {t.title}
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="max-w-2xl text-lg md:text-xl text-on-surface-variant font-light leading-relaxed"
                >
                  {t.description}
                </motion.p>
              </div>

              <motion.div variants={fadeInUp} className="lg:col-span-4 flex flex-col gap-4">
                <a href="/brand/ekinoxis-brand-kit.zip" download>
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    {t.downloadAll}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
                    </svg>
                  </Button>
                </a>
                <a
                  href="/brand/brand-kit/Ekinoxis%20Brand%20Kit.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="lg" className="w-full justify-center">
                    {t.openBook}
                  </Button>
                </a>
                <p className="font-mono text-[10px] text-outline tracking-widest uppercase">
                  ZIP · 0.9 MB · SVG + PNG + {language === 'en' ? 'DOCS' : 'DOCS'}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── The mark ── */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-28 grid grid-cols-1 lg:grid-cols-12 gap-px bg-primary/10 border border-primary/10"
          >
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-5 bg-black flex items-center justify-center py-20 relative overflow-hidden"
            >
              <div className="absolute w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" style={{ borderRadius: '50%' }} />
              <BrandMark size={220} className="relative" />
              <div className="absolute top-4 right-4">
                <ScanBadge variant="muted">THE MARK</ScanBadge>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-7 bg-surface-container-low p-10 lg:p-14">
              <span className="font-mono text-[10px] text-primary tracking-widest uppercase block mb-6">
                {t.markLabel}
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-on-surface uppercase mb-6">
                {t.markTitle}
              </h2>
              <p className="text-on-surface-variant font-light leading-relaxed mb-8">{t.markBody}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-primary/10">
                {[
                  { k: t.markSpecGeometry, v: '95r · 1.6 stroke' },
                  { k: t.markSpecAxis, v: '2.4 · 90°' },
                  { k: t.markSpecMin, v: '24 px' },
                ].map((s) => (
                  <div key={s.k} className="bg-surface-container-low p-5">
                    <span className="font-mono text-[10px] text-outline tracking-widest uppercase block mb-2">{s.k}</span>
                    <span className="font-mono text-sm text-primary">{s.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.section>

          {/* ── Lockups ── */}
          <section className="mt-28">
            <SectionHead index="01" label={t.lockupsLabel} title={t.lockupsTitle} body={t.lockupsBody} />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10"
            >
              {LOCKUPS.map((l, idx) => (
                <motion.div key={l.key} variants={fadeInUp} className="bg-surface-container-low group">
                  {/* Preview plate */}
                  <div className="relative bg-black flex items-center justify-center p-12 min-h-[260px]">
                    <div className="absolute top-4 right-4">
                      <ScanBadge variant="muted">{String(idx + 1).padStart(2, '0')}</ScanBadge>
                    </div>
                    <Image
                      src={file(l.key, 'cyan-transparent', 'png')}
                      alt={`Ekinoxis ${l.name.toLowerCase()} logo`}
                      width={l.w}
                      height={l.h}
                      className={l.preview}
                    />
                  </div>

                  {/* Meta + downloads */}
                  <div className="p-8 lg:p-10">
                    <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface uppercase mb-3">
                      {l.name}
                    </h3>
                    <p className="text-sm text-on-surface-variant font-light leading-relaxed mb-8">
                      {l.use[language]}
                    </p>

                    <div className="space-y-px bg-primary/10">
                      {l.colorways.map((c) => (
                        <div
                          key={c}
                          className="bg-surface-container-low hover:bg-surface-container transition-colors duration-300 flex items-center justify-between gap-4 py-3 px-4"
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-4 h-4 shrink-0 border ${
                                LIGHT_PLATE.includes(c) ? 'border-outline/40' : 'border-primary/20'
                              }`}
                              style={{
                                background:
                                  c === 'cyan-on-light' ? '#FFFFFF'
                                  : c === 'black' ? '#FFFFFF'
                                  : c === 'white' ? '#0F1B23'
                                  : '#000000',
                                boxShadow: `inset 0 0 0 4px ${
                                  c === 'black' ? '#000000' : c === 'white' ? '#E8F2FB' : '#8FF5FF'
                                }`,
                              }}
                            />
                            <span className="font-mono text-[11px] text-on-surface-variant tracking-wider uppercase truncate">
                              {c.replace(/-/g, ' ')}
                            </span>
                          </span>
                          <span className="flex items-center gap-2 shrink-0">
                            <DownloadChip href={file(l.key, c, 'svg')} label="SVG" />
                            <DownloadChip href={file(l.key, c, 'png')} label="PNG" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── Color ── */}
          <section className="mt-28">
            <SectionHead index="02" label={t.colorLabel} title={t.colorTitle} body={t.colorBody} />

            <div className="space-y-12">
              {PALETTE.map((group) => (
                <div key={group.group}>
                  <span className="font-mono text-[10px] text-outline tracking-widest uppercase block mb-4">
                    {group.group}
                  </span>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-primary/10 border border-primary/10"
                  >
                    {group.swatches.map((s) => (
                      <motion.button
                        key={s.name + s.hex}
                        variants={fadeInUp}
                        type="button"
                        onClick={() => copy(s.hex)}
                        className="bg-surface-container-low text-left group hover:bg-surface-container transition-colors duration-300"
                        aria-label={`${t.copyHex} ${s.hex}`}
                      >
                        <div
                          className="h-24 w-full border-b border-primary/10"
                          style={{ background: s.hex }}
                        />
                        <div className="p-5">
                          <span className="font-label text-xs text-on-surface uppercase tracking-wide block mb-2">
                            {s.name}
                          </span>
                          <span className="font-mono text-[11px] text-primary block mb-3">
                            {copied === s.hex ? t.copied : s.hex}
                          </span>
                          <span className="font-mono text-[10px] text-outline uppercase tracking-widest leading-relaxed block">
                            {s.role[language]}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Gradients */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10">
              {[
                { name: 'CYBER', css: 'linear-gradient(135deg, #8FF5FF 0%, #9492FF 100%)' },
                { name: 'DARK', css: 'linear-gradient(180deg, #000000 0%, #060F16 100%)' },
              ].map((g) => (
                <div key={g.name} className="bg-surface-container-low">
                  <div className="h-24 border-b border-primary/10" style={{ background: g.css }} />
                  <div className="p-5">
                    <span className="font-label text-xs text-on-surface uppercase tracking-wide block mb-2">
                      {g.name}
                    </span>
                    <code className="font-mono text-[10px] text-outline break-all">{g.css}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Typography ── */}
          <section className="mt-28">
            <SectionHead index="03" label={t.typeLabel} title={t.typeTitle} body={t.typeBody} />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-px bg-primary/10 border border-primary/10"
            >
              {FACES.map((f, idx) => (
                <motion.div
                  key={f.name}
                  variants={fadeInUp}
                  className="relative bg-surface-container-low p-10 lg:p-14 group hover:bg-surface-container transition-colors duration-500"
                >
                  <div className="absolute top-4 right-4">
                    <ScanBadge variant="muted">{String(idx + 1).padStart(2, '0')}</ScanBadge>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
                    <div className="lg:col-span-3">
                      <h3 className={`${f.className} text-xl text-on-surface mb-2`}>{f.name}</h3>
                      <p className="font-mono text-[10px] text-outline tracking-widest uppercase mb-1">
                        {f.weights}
                      </p>
                      <p className="font-mono text-[10px] text-primary/70 tracking-widest uppercase leading-relaxed">
                        {f.role[language]}
                      </p>
                    </div>
                    <div className="lg:col-span-9">
                      <p className={`${f.className} ${f.size} text-on-surface mb-4 break-words`}>
                        {f.specimen}
                      </p>
                      <p className="font-mono text-[10px] text-outline tracking-widest uppercase">
                        {f.rule[language]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <a
              href="https://fonts.google.com/?query=Space+Grotesk+Inter+Space+Mono"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] text-primary/70 hover:text-primary tracking-widest uppercase transition-colors"
            >
              {t.fontsLink} →
            </a>
          </section>

          {/* ── Icons & social ── */}
          <section className="mt-28">
            <SectionHead index="04" label={t.iconsLabel} title={t.iconsTitle} body={t.iconsBody} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10 border border-primary/10">
              {/* Favicons */}
              <div className="bg-surface-container-low p-10 lg:p-14">
                <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface uppercase mb-8">
                  {t.faviconTitle}
                </h3>
                <div className="flex flex-wrap items-end gap-6">
                  {FAVICONS.map((s) => (
                    <a
                      key={s}
                      href={`/brand/favicon/favicon-${s}.png`}
                      download
                      className="group flex flex-col items-center gap-3"
                    >
                      <span className="bg-black p-3 border border-primary/10 group-hover:border-primary/40 transition-colors">
                        <Image
                          src={`/brand/favicon/favicon-${s}.png`}
                          alt={`Ekinoxis favicon ${s}px`}
                          width={s}
                          height={s}
                          className="block"
                          style={{ width: Math.min(s, 64), height: Math.min(s, 64) }}
                        />
                      </span>
                      <span className="font-mono text-[10px] text-outline group-hover:text-primary tracking-widest transition-colors">
                        {s}PX
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social avatars */}
              <div className="bg-surface-container-low p-10 lg:p-14">
                <h3 className="font-headline text-2xl font-bold tracking-tighter text-on-surface uppercase mb-8">
                  {t.socialTitle}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { f: 'ekinoxis-avatar-1024.png', label: 'AVATAR' },
                    { f: 'ekinoxis-avatar-with-wordmark-1024.png', label: 'AVATAR + TYPE' },
                  ].map((a) => (
                    <a key={a.f} href={`/brand/social/${a.f}`} download className="group">
                      <span className="block border border-primary/10 group-hover:border-primary/40 transition-colors">
                        <Image
                          src={`/brand/social/${a.f}`}
                          alt={`Ekinoxis ${a.label.toLowerCase()}`}
                          width={1024}
                          height={1024}
                          className="w-full h-auto block"
                        />
                      </span>
                      <span className="font-mono text-[10px] text-outline group-hover:text-primary tracking-widest uppercase mt-3 block transition-colors">
                        {a.label} · 1024 →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Rules ── */}
          <section className="mt-28">
            <SectionHead index="05" label={t.rulesLabel} title={t.rulesTitle} body={t.rulesBody} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10">
              <div className="bg-surface-container-low p-10 lg:p-14">
                <span className="font-mono text-[10px] text-tertiary-dim tracking-widest uppercase block mb-6">
                  {t.doLabel}
                </span>
                <ul className="space-y-5">
                  {RULES.do[language].map((r) => (
                    <li key={r} className="flex gap-4 text-on-surface-variant font-light leading-relaxed">
                      <span className="text-tertiary-dim font-mono text-xs mt-1 shrink-0">+</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-surface-container-low p-10 lg:p-14">
                <span className="font-mono text-[10px] text-error tracking-widest uppercase block mb-6">
                  {t.dontLabel}
                </span>
                <ul className="space-y-5">
                  {RULES.dont[language].map((r) => (
                    <li key={r} className="flex gap-4 text-on-surface-variant font-light leading-relaxed">
                      <span className="text-error font-mono text-xs mt-1 shrink-0">−</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Closing CTA ── */}
          <section className="mt-28 border border-primary/10 bg-surface-container-low p-10 lg:p-16 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-on-surface uppercase mb-3">
                {t.ctaTitle}
              </h2>
              <p className="text-on-surface-variant font-light max-w-xl leading-relaxed">{t.ctaBody}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="/brand/ekinoxis-brand-kit.zip" download>
                <Button variant="primary" size="lg" className="w-full justify-center">
                  {t.downloadAll}
                </Button>
              </a>
              <a href="https://t.me/ekinoxis" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" className="w-full justify-center">
                  {t.ctaContact}
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </AnimatedBackground>
  );
}

/* ── Local bits ── */

function SectionHead({
  index,
  label,
  title,
  body,
}: {
  index: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-10"
    >
      <motion.span
        variants={fadeInUp}
        className="font-mono text-[10px] text-primary tracking-widest uppercase block mb-4"
      >
        {index} / {label}
      </motion.span>
      <motion.h2
        variants={fadeInUp}
        className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-on-surface uppercase mb-4"
      >
        {title}
      </motion.h2>
      <motion.p variants={fadeInUp} className="max-w-2xl text-on-surface-variant font-light leading-relaxed">
        {body}
      </motion.p>
    </motion.div>
  );
}

function DownloadChip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border border-outline-variant/60 text-outline hover:border-primary hover:text-primary transition-colors"
    >
      {label}
    </a>
  );
}
