# Ekinoxis Design System — The Obsidian Architect

Use this reference whenever editing any `.tsx`, `.css`, or Tailwind config in this project.

---

## Core Rules (Non-Negotiable)

- **0px border-radius everywhere** — never use `rounded-sm/md/lg/xl`. Only `rounded-full` for pills.
- **No divider lines** — use `gap-px bg-primary/10` grid gaps or surface tone shifts instead.
- **No drop shadows** — use ambient glow `shadow-[0_0_20px_rgba(143,245,255,0.2)]` or surface shifts.
- **No hover scale** — use `hover:bg-surface-container transition-colors duration-500` instead of `hover:scale-105`.
- **Glassmorphism for floats** — `backdrop-blur-xl` + semi-transparent surface on elevated elements.
- **Scanline overlay** — always present in layout.tsx as `div.scanline-overlay z-[100] opacity-20`.

---

## Color Tokens

| Token | Use |
|-------|-----|
| `text-primary` / `bg-primary` | Electric Cyan `#8ff5ff` — CTAs, active states, headlines |
| `text-secondary` | Cosmic Blue `#9492ff` — links, secondary elements |
| `text-tertiary-dim` | Neon Lime `#beee00` — accents, status indicators, success |
| `text-on-surface` | `#e8f2fb` — main body text |
| `text-on-surface-variant` | `#a2acb5` — muted body text |
| `text-outline` | `#6c777f` — very muted, labels, metadata |
| `text-outline-variant` | `#3f4951` — ghost borders |
| `bg-surface-container-lowest` | `#000000` — page background |
| `bg-surface-container-low` | `#09151c` — card/section bg |
| `bg-surface-container` | `#0f1b23` — card hover state |
| `bg-surface-container-high` | `#14212a` — elevated panels |

**Do NOT use** `cyber-blue`, `cyber-purple` in new code — use `primary` and `secondary`.

---

## Typography Classes

| Class | Font | Use for |
|-------|------|---------|
| `font-headline` | Space Grotesk | Page titles, section headings, button text |
| `font-body` | Inter | Descriptions, paragraphs, body content |
| `font-label` | Space Grotesk | Small labels, category tags, uppercase metadata |
| `font-mono` | Space Mono | UIDs, system readouts, code, terminal text |

**Scale pattern**: Giant `font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]` headline + `font-mono text-[10px] tracking-widest uppercase` metadata — this tension is the core of the aesthetic.

---

## ScanBadge Variants

```tsx
import ScanBadge from '@/components/ui/ScanBadge';

<ScanBadge variant="primary">    // cyan — main status, active labels
<ScanBadge variant="secondary">  // blue — secondary info
<ScanBadge variant="tertiary">   // neon lime — success, "active" indicators
<ScanBadge variant="muted">      // dim — UIDs like PROD_01, NODE_003
<ScanBadge variant="outline">    // standard outline
<ScanBadge variant="error">      // error red
```

---

## Button Variants

```tsx
import Button from '@/components/ui/Button';

<Button variant="primary">   // filled cyan — main CTA
<Button variant="ghost">     // transparent, cyan border, fills on hover
<Button variant="secondary"> // transparent, blue border
<Button variant="tertiary">  // transparent, lime border
<Button variant="outline">   // transparent, outline border
// Sizes: size="sm" | size="md" (default) | size="lg"
```

---

## The Gap-px Card Grid (canonical pattern)

```tsx
{/* Background color = the "border" between cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10">
  {items.map((item, idx) => (
    <div
      key={idx}
      className="relative bg-surface-container-low p-10 group hover:bg-surface-container transition-colors duration-500"
    >
      {/* UID tag — top right */}
      <div className="absolute top-4 right-4">
        <ScanBadge variant="muted">ITEM_{String(idx + 1).padStart(2, '0')}</ScanBadge>
      </div>

      {/* content */}

      {/* Hover bottom glow line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  ))}
</div>
```

---

## Animations

```tsx
import { staggerContainer, fadeInUp, fadeIn, terminalReveal } from '@/lib/animations';

// Always use "hidden" / "visible" keys — NOT "initial" / "animate"
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>content</motion.div>
  <motion.div variants={fadeInUp}>content</motion.div>
</motion.div>

// For scroll-triggered:
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
```

**Hero-only keyframes** (globals.css):
- `animate-hero-core` — 8s breathing pulse + 60s slow rotation (sphere image)
- `hero-visual-glitch` — 4s step-end glitch flicker (sphere container)
- `animate-[ambient-pulse_Xs_...]` — glow blob pulse (AnimatedBackground)
