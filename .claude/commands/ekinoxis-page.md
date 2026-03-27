# Ekinoxis — New Page Template

Use this when creating any new page under `src/app/`. Copy the template, fill in the blanks.

---

## Full Page Template

```tsx
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScanBadge from '@/components/ui/ScanBadge';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function PAGE_NAMEPage() {
  const { language } = useLanguage();
  const t = content[language].SECTION_KEY;

  return (
    <AnimatedBackground variant="ambient">
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-screen-2xl mx-auto">

          {/* ── Page Header ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            {/* Breadcrumb metadata readout */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
              <span className="border border-primary/30 px-2 py-1">EKX_ROOT</span>
              <span className="text-outline">/</span>
              <span className="border border-primary/30 px-2 py-1">PAGE_SLUG</span>
            </motion.div>

            {/* Giant headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-6"
            >
              {t.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed"
            >
              {t.description}
            </motion.p>
          </motion.div>

          {/* ── Content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10"
          >
            {t.items.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="relative bg-surface-container-low p-10 group hover:bg-surface-container transition-colors duration-500"
              >
                <div className="absolute top-4 right-4">
                  <ScanBadge variant="muted">ITEM_{String(idx + 1).padStart(2, '0')}</ScanBadge>
                </div>
                <span className="font-mono text-primary text-sm mb-4 block">
                  {String(idx + 1).padStart(2, '0')} / LABEL
                </span>
                <h2 className="font-headline text-2xl font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors mb-3">
                  {item.title}
                </h2>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>

          {/* ── Bottom readout ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 flex items-center justify-between font-mono text-[10px] text-outline tracking-widest uppercase"
          >
            <span>COUNT: {t.items?.length}</span>
            <span>STATUS: ACTIVE</span>
            <span>REGISTRY: EKX_LABS</span>
          </motion.div>

        </div>
      </div>
    </AnimatedBackground>
  );
}
```

---

## After creating the page, also do:

1. **Add nav route** in `src/components/Navigation.tsx` → find the right `menuItems` dropdown and add `{ href: '/your-route', label: t.yourLabel }`
2. **Add nav label** in `src/lib/content.ts` → `en.nav.yourLabel` and `es.nav.yourLabel`
3. **Add content** in `src/lib/content.ts` → both `en.yourSection` and `es.yourSection`

---

## 8 Key Conventions

1. `'use client'` on every page — required for Framer Motion + Context hooks
2. `hidden` / `visible` keys with `staggerContainer` and `fadeInUp` — not `initial`/`animate`
3. **0px radius** — never use `rounded-sm/md/lg/xl` — only `rounded-full` for pills
4. **Surface shifts** for hover — `hover:bg-surface-container` not `hover:scale-105`
5. **`gap-px bg-primary/10`** — canonical grid-border pattern for card layouts
6. **Ambient glow** not drop shadow — `shadow-[0_0_20px_rgba(143,245,255,0.2)]` if glow is needed
7. **`font-mono text-[10px] tracking-widest uppercase`** — all metadata, UIDs, system labels
8. **Bilingual** — every visible string needs both `en` and `es` in `content.ts`

---

## AnimatedBackground Variants

```tsx
<AnimatedBackground variant="ambient">   // default — 3 colored glow blobs (most pages)
<AnimatedBackground variant="grid">      // subtle dot grid
<AnimatedBackground variant="gradient">  // radial gradient
<AnimatedBackground variant="terminal">  // terminal-style
```
