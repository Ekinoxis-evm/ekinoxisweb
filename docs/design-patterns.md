# Design patterns (code recipes)

> The visual system itself is `DESIGN.md` (authority) and `.claude/rules/design.md`. This page holds only copy-paste patterns. If they disagree, DESIGN.md wins.


> **`DESIGN.md` (visual system, north star "The Ekinox Lab") and `PRODUCT.md` (users, positioning, evidence) at the repo root are the authority for design work.** Read them before any UI change; this section is the quick reference. Run `impeccable detect --json src/app src/components` after UI edits.

**Aesthetic**: Cypherpunk innovation lab. Sharp edges, high contrast, terminal viewports. No softness.

### Core Rules
- **0px border-radius everywhere** — `rounded-*` is forbidden except `rounded-full` for pills
- **No divider lines** — use surface tone shifts or `gap-px bg-primary/10` grid gaps
- **No drop shadows** — use ambient glows (`shadow-[0_0_20px_rgba(143,245,255,0.2)]`) or surface shifts
- **Glassmorphism** for floating elements — `backdrop-blur-xl` + semi-transparent surface
- **Scanline overlay** — fixed `div.scanline-overlay` at `z-[100] opacity-20` in layout.tsx

### Color Tokens (Tailwind)

| Token | Hex | Use |
|-------|-----|-----|
| `primary` | `#8ff5ff` | Electric Cyan — primary actions, active states |
| `primary-dim` | `#00deec` | Hover state for primary |
| `secondary` | `#9492ff` | Cosmic Blue — links, secondary elements |
| `tertiary-dim` | `#beee00` | Neon Lime — accents, success, status indicators |
| `on-surface` | `#e8f2fb` | Main body text |
| `on-surface-variant` | `#a2acb5` | Muted body text |
| `outline` | `#8a949c` | Muted labels |
| `outline-variant` | `#3f4951` | Ghost borders |
| `surface-container-lowest` | `#000000` | Main background |
| `surface-container-low` | `#09151c` | Card / section backgrounds |
| `surface-container` | `#0f1b23` | Hover state for cards |
| `surface-container-high` | `#14212a` | Elevated panels |
| `surface-container-highest` | `#192731` | Highest elevation |

**Backward-compat aliases** (do not use in new code):
- `cyber-blue` → `#00F0FF`, `cyber-purple` → `#8B5CF6`

### Typography

| Role | Font | Tailwind class |
|------|------|---------------|
| Headings | Space Grotesk | `font-headline` |
| Body | Inter | `font-body` |
| Labels / metadata | Space Grotesk | `font-label` |
| Terminal / code / UIDs | Space Mono | `font-mono` |

**Scale pattern**: Giant `font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]` headlines paired with `font-mono text-[12px] tracking-widest uppercase` metadata — creates the editorial tech tension.

### Animations (from `src/lib/animations.ts`)

All variants use `hidden` / `visible` keys:

```tsx
import { staggerContainer, fadeInUp } from '@/lib/animations';

// Usage:
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>...</motion.div>
</motion.div>
```

**Hero-specific keyframes** (in `globals.css`):
- `animate-hero-core` — 8s pulse-breathing + 60s slow-rotate (applied to hero sphere image)
- `hero-visual-glitch` — 4s step-end glitch flicker (applied to hero visual container)
- `animate-[ambient-pulse_Xs_...]` — glow blob animation (used in AnimatedBackground)

---

## Page Patterns

### Static pages (no DB data)

```tsx
'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function SomePage() {
  const { language } = useLanguage();
  const t = content[language].someSection;

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[12px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">EKX_ROOT</span>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">PAGE_NAME</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6">
              {t.title}
            </motion.h1>
          </motion.div>
          {/* Content */}
        </div>
      </div>
    </AnimatedBackground>
  );
}
```

### Dynamic pages (Supabase data)

Split into `page.tsx` (Server Component) + `PageClient.tsx` (Client Component):

```tsx
// page.tsx — async Server Component
import { getSomething } from '@/lib/supabase/queries';
import PageClient from './PageClient';
export const revalidate = 60;

export default async function SomePage() {
  const data = await getSomething();
  return <PageClient data={data} />;
}
```

```tsx
// PageClient.tsx — 'use client', receives data as props
'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { SomeType } from '@/lib/supabase/types';

interface Props { data: SomeType[] }

export default function PageClient({ data }: Props) {
  const { language } = useLanguage();
  const t = content[language].someSection;
  // render with language-aware field access: item.name_en / item.name_es
}
```

### Card / Grid pattern (Obsidian Architect)

```tsx
{/* Gap-px grid — background color creates the "border" */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10">
  {items.map((item, idx) => (
    <div key={idx} className="relative bg-surface-container-low p-10 group hover:bg-surface-container transition-colors duration-500">
      {/* UID top-right */}
      <div className="absolute top-4 right-4">
        <ScanBadge variant="muted">ITEM_{String(idx + 1).padStart(2, '0')}</ScanBadge>
      </div>
      {/* Hover bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  ))}
</div>
```

### ScanBadge variants

```tsx
<ScanBadge variant="primary">   // cyan text + border
<ScanBadge variant="secondary"> // blue/purple text + border
<ScanBadge variant="tertiary">  // neon lime text + border
<ScanBadge variant="muted">     // dim outline — for UIDs, system labels
<ScanBadge variant="outline">   // standard outline
<ScanBadge variant="error">     // error red
```

### Button variants

```tsx
<Button variant="primary">    // filled cyan bg
<Button variant="ghost">      // transparent, cyan border, fills on hover
<Button variant="secondary">  // transparent, blue border
<Button variant="tertiary">   // transparent, lime border
<Button variant="outline">    // transparent, outline border
// Sizes: sm | md (default) | lg
```

---
