# CLAUDE.md — Ekinoxis Website Context

## What is Ekinoxis

**Ekinoxis Labs** is the first Innovation Laboratory of the Colombian Pacific, based in Cali, Valle del Cauca, Colombia, with secondary operations in Casper, Wyoming, USA.

**Tagline**: "Innovation Without Frontiers"

**Mission**: Build blockchain, AI, and cryptography products, educate developers in LATAM, and advance applied research in frontier technologies.

**Business Model** (multi-faceted):
- **Education** — university partnerships, free workshops, certifications
- **Community** — hacker houses, hackathon participation
- **Products** — 8+ internally built blockchain/AI products (IP generation)
- **Services** — paid consulting ($50–$2,500) and custom app/web development ($5k–enterprise)
- **Research** — frontier tech with institutional partners

**Market Focus**: LATAM blockchain adoption, real-world asset (RWA) tokenization, SME financial inclusion

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom CSS utilities |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Fonts | Space Grotesk + Inter + Space Mono via `next/font/google` |
| State | React Context for language |
| Images | Next.js Image (AVIF/WebP optimization) |
| Database | Supabase (Postgres + Storage) |
| Auth | Supabase Auth (Google OAuth, admin-only) |
| Deployment | Vercel |

---

## Environment Variables

Required in `.env.local` (never commit this file):

```
NEXT_PUBLIC_SUPABASE_URL=       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anon/public key
SUPABASE_SERVICE_ROLE_KEY=      # Supabase service role key (server-only, never expose)
ADMIN_EMAIL=                    # Email address allowed to access /admin (e.g. you@ekinoxis.co)
```

---

## Supabase Data Layer

Dynamic content is stored in Supabase and fetched at build/request time. Static UI text (page titles, nav labels, descriptions) still lives in `content.ts`.

### Tables

| Table | Purpose |
|-------|---------|
| `products` | Products with status, URLs, repos, categories, technologies |
| `hackers` | Team members with social links, profile, university |
| `hackathons` | Hackathon events with dates, logo, website |
| `education_partners` | University/gov partner logos |
| `certification_partners` | Certification partner logos |
| `product_hackers` | Join table: product ↔ hacker (many-to-many) |
| `product_hackathons` | Join table: product ↔ hackathon |

### Types

Generated TypeScript types live in `src/lib/supabase/types.ts`. Key types:
- `Product` — base product row
- `Hacker` — base hacker row
- `Hackathon` — base hackathon row with computed `status` field
- `ProductWithRelations` — product + `hackers[]` + `hackathon` (from join tables)
- `HackathonWithStatus` — hackathon with `status: 'incoming' | 'ongoing' | 'past'`

### Queries

All data-fetching functions live in `src/lib/supabase/queries.ts`:
- `getProducts()` — returns `ProductWithRelations[]` sorted by display_order
- `getHackers()` — returns `Hacker[]` sorted by display_order
- `getHackathons()` — returns `HackathonWithStatus[]` sorted by display_order
- `getEducationPartners()` — returns partner logo + name rows
- `getCertificationPartners()` — returns partner logo + name rows

### Clients

- `src/lib/supabase/client.ts` — browser client (`createBrowserClient`)
- `src/lib/supabase/server.ts` — server client (`createServerClient`, reads cookies)
- `src/lib/supabase/service.ts` — service role client (bypasses RLS, admin only)

---

## Admin CMS

The admin panel lives at `/admin` and is gated by Google OAuth + email allowlist.

### Access Control

- Route: `/admin` → protected by `src/app/admin/(protected)/layout.tsx`
- Auth: `requireAdmin()` in `src/lib/supabase/admin.ts`:
  1. Reads session cookie via `createServerClient()`
  2. Checks `user.email === process.env.ADMIN_EMAIL`
  3. Returns `createServiceClient()` for RLS-bypassing DB operations
- Login: `/admin/login` — Google OAuth button, redirects to `/admin` on success

### Admin Pages

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard with links to all sections |
| `/admin/products` | List all products |
| `/admin/products/new` | Create product |
| `/admin/products/[id]/edit` | Edit product |
| `/admin/hackers` | List all hackers |
| `/admin/hackers/new` | Create hacker |
| `/admin/hackers/[id]/edit` | Edit hacker |
| `/admin/hackathons` | List all hackathons |
| `/admin/hackathons/new` | Create hackathon |
| `/admin/hackathons/[id]/edit` | Edit hackathon |

### Admin API Routes

REST API routes used by admin forms (all require service role via `requireAdmin()`):

| Method | Route | Action |
|--------|-------|--------|
| POST | `/api/admin/products` | Create product |
| PUT | `/api/admin/products/[id]` | Update product |
| DELETE | `/api/admin/products/[id]` | Delete product |
| POST | `/api/admin/hackers` | Create hacker |
| PUT | `/api/admin/hackers/[id]` | Update hacker |
| DELETE | `/api/admin/hackers/[id]` | Delete hacker |
| POST | `/api/admin/hackathons` | Create hackathon |
| PUT | `/api/admin/hackathons/[id]` | Update hackathon |
| DELETE | `/api/admin/hackathons/[id]` | Delete hackathon |

All mutation routes call `revalidatePath('/products')` etc. after DB changes to bust Next.js ISR cache.

### Image Uploads

The `ImageUpload` admin component uploads to Supabase Storage. Buckets:
- `products` — product images → `image_url`
- `hackers` — hacker photos → `image_url`
- `hackathons` — hackathon logos → `logo_url`

**Important**: Public Supabase Storage URLs start with `https://`. Always pass `unoptimized={src.startsWith('http')}` to Next.js `<Image>` for these.

---

## Project Structure

```
/src/
├── app/
│   ├── layout.tsx               # Root layout: fonts, scanline overlay, Navigation + Footer + LanguageProvider
│   ├── globals.css              # Global styles, Tailwind directives, animation keyframes, legacy utilities
│   ├── page.tsx                 # Home / Hero (2-col grid, sphere animation, 4-stat panel)
│   ├── culture/                 # 6 value cards in 3×2 grid + stats bottom panel (static content.ts)
│   ├── hackers/
│   │   ├── page.tsx             # Server Component — fetches getHackers(), revalidate=60
│   │   └── HackersClient.tsx    # Client Component — renders grid with SocialLinks icons
│   ├── products/
│   │   ├── page.tsx             # Server Component — fetches getProducts() + getHackathons(), revalidate=60
│   │   └── ProductsClient.tsx   # Client Component — featured + grid, status badges, BUILT_BY, repo links
│   ├── research/                # 3 research stream cards + R&D→Products split (static content.ts)
│   ├── education/
│   │   ├── page.tsx             # Server Component — fetches getEducationPartners(), revalidate=60
│   │   └── EducationClient.tsx  # Client Component — partner logo grid
│   ├── certifications/
│   │   ├── page.tsx             # Server Component — fetches getCertificationPartners(), revalidate=60
│   │   └── CertificationsClient.tsx  # Client Component — partner logo grid
│   ├── hacker-house/
│   │   ├── page.tsx             # Server Component — fetches getHackathons(), revalidate=60
│   │   └── HackerHouseClient.tsx  # Client Component — hackathon cards with status + dates
│   ├── tech-stack/              # Terminal OS visualization (static content.ts)
│   ├── services/
│   │   ├── page.tsx             # 3 track cards (CONSULTANCY / DEVELOPMENT / ENGINEERING)
│   │   ├── consultation/        # Deliverables sidebar + 4×2 pricing matrix
│   │   ├── web-development/     # 3 pricing tiers + process flow + deliverables
│   │   └── app-building/        # Feature modules + tech stack chips + 6-step process
│   ├── admin/
│   │   ├── login/               # Google OAuth login page
│   │   └── (protected)/         # Route group — all children require requireAdmin()
│   │       ├── layout.tsx        # Calls requireAdmin(), renders admin nav
│   │       ├── page.tsx          # Admin dashboard
│   │       ├── products/         # List + New + [id]/edit pages + ProductForm.tsx
│   │       ├── hackers/          # List + New + [id]/edit pages + HackerForm.tsx
│   │       ├── hackathons/       # List + New + [id]/edit pages + HackathonForm.tsx
│   │       └── components/       # AdminInput, AdminTextarea, ImageUpload shared components
│   └── api/
│       ├── auth/callback/        # Supabase OAuth callback handler
│       └── admin/
│           ├── products/         # POST (create) + [id]/ PUT/DELETE (update/delete)
│           ├── hackers/          # POST (create) + [id]/ PUT/DELETE
│           └── hackathons/       # POST (create) + [id]/ PUT/DELETE
│
├── components/
│   ├── Navigation.tsx            # Fixed header, dropdowns, language toggle, mobile slide menu
│   ├── Footer.tsx                # 2-col: brand left, social links right
│   └── ui/
│       ├── AnimatedBackground.tsx  # Variants: ambient | grid | gradient | terminal
│       ├── Button.tsx              # Variants: primary | ghost | secondary | tertiary | outline
│       ├── Card.tsx                # Terminal viewport style, optional uid prop
│       ├── ScanBadge.tsx           # Monospaced metadata tag; variants: primary | secondary | tertiary | muted | outline | error
│       └── SocialLinks.tsx         # Social icon links using /public/socials/ images; props: github, linkedin, x, telegram, discord, website, size
│
├── contexts/
│   └── LanguageContext.tsx       # EN/ES via useLanguage()
│
└── lib/
    ├── content.ts                # Bilingual UI text (nav, page titles, static descriptions, CTAs)
    ├── animations.ts             # Shared Framer Motion variants (hidden/visible keys)
    └── supabase/
        ├── client.ts             # Browser Supabase client
        ├── server.ts             # Server Supabase client (reads cookies)
        ├── service.ts            # Service role client (admin ops, bypasses RLS)
        ├── admin.ts              # requireAdmin() — auth check + service client
        ├── queries.ts            # All public data-fetching functions
        └── types.ts              # TypeScript types matching DB schema
```

---

## Design System — The Obsidian Architect

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
| `outline` | `#6c777f` | Very muted / labels |
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

**Scale pattern**: Giant `font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]` headlines paired with `font-mono text-[10px] tracking-widest uppercase` metadata — creates the editorial tech tension.

### Animations (from `src/lib/animations.ts`)

All variants use `hidden` / `visible` keys:

```tsx
import { staggerContainer, fadeInUp, fadeIn, terminalReveal } from '@/lib/animations';

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
            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] text-primary/60 tracking-widest uppercase mb-6">
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

## Navigation Structure

```
EKINOXIS (logo → /)
About (dropdown)
  ├─ Culture → /culture
  └─ Our Hackers → /hackers
Services (dropdown)
  ├─ Consultation → /services/consultation
  ├─ Web Dev → /services/web-development
  └─ App Building → /services/app-building
Value (dropdown)
  ├─ Tech Stack → /tech-stack
  ├─ Research → /research
  ├─ Certifications → /certifications
  └─ Education → /education
Products → /products
Hacker House → /hacker-house
[EN/ES toggle]
```

Active links: `text-primary border-b-2 border-primary`. Dropdowns animate with Framer Motion `AnimatePresence`. Mobile: hamburger → slide-down panel.

---

## Content Architecture

Two sources of content — know which to use:

### 1. Static UI Text — `src/lib/content.ts`

Page titles, section descriptions, nav labels, CTAs, static copy. Two top-level keys: `en` and `es`.

```typescript
const { language } = useLanguage()
const t = content[language].products  // e.g. t.title, t.description
```

**Sections**: `hero`, `nav`, `education`, `certifications`, `hackerHouse`, `products`, `culture`, `technologies`, `services`, `hackers`, `socials`, `footer`, `research`

**To change static text**: edit `content.ts`, always update both `en` and `es` keys. Never hardcode text in JSX.

### 2. Dynamic CMS Data — Supabase

Products, hackers, hackathons, education partners, certification partners. Managed via `/admin`.

**Pattern for dynamic pages** (Server Component + Client Component split):

```typescript
// page.tsx — Server Component
import { getProducts } from '@/lib/supabase/queries'
import ProductsClient from './ProductsClient'
export const revalidate = 60  // ISR: re-fetch at most every 60s

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsClient products={products} />
}
```

```typescript
// ProductsClient.tsx — Client Component
'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import type { ProductWithRelations } from '@/lib/supabase/types';

interface Props { products: ProductWithRelations[] }

export default function ProductsClient({ products }: Props) {
  const { language } = useLanguage();
  const t = content[language].products;  // static UI text from content.ts
  // dynamic data from props (fetched server-side)
  const desc = (p) => language === 'en' ? p.description_en : p.description_es;
  ...
}
```

**Cache invalidation**: Admin API routes call `revalidatePath('/products')` (etc.) after mutations. This busts ISR cache immediately so the public page shows fresh data. Do NOT use `revalidateTag` — it only works with `unstable_cache`, not plain Supabase calls.

### SocialLinks Component

Shared component at `src/components/ui/SocialLinks.tsx`. Uses icon images from `/public/socials/`.

```tsx
import SocialLinks from '@/components/ui/SocialLinks';

<SocialLinks
  github="https://github.com/username"
  linkedin="https://linkedin.com/in/username"
  x="https://x.com/username"
  telegram="https://t.me/username"   // optional
  discord="username#0000"            // optional
  website="https://portfolio.dev"    // optional — renders as "WEB" text
  size={16}                          // icon size in px, default 16
/>
```

Icons: grayscale at rest → full color on hover. All icons stored in `/public/socials/` (github.png, linkedin.png, x.jpg, telegram.webp, discord.webp).

---

## Common Maintenance Tasks

### Add a new product
Go to `/admin/products/new` — fill in name, images, description (EN + ES), URLs, repos, categories, technologies, assign hackers. No code changes needed.

### Add a new team member (hacker)
Go to `/admin/hackers/new` — fill in name, photo, profile (EN + ES), university, social links. No code changes needed.

### Add a new hackathon / hacker house event
Go to `/admin/hackathons/new` — fill in name, logo, website, start/end dates. Status (incoming/ongoing/past) is derived automatically from dates.

### Add a new technology logo
1. Add logo to `/public/tecnologies/<Category>/`
2. Add path to `content.ts` → `technologies.categories.<key>.logos[]`

### Add a new page (static — no DB data)
1. Create `/src/app/<route>/page.tsx` — add `'use client'` directive
2. Import `useLanguage`, `content`, `AnimatedBackground`, `ScanBadge`, `staggerContainer`, `fadeInUp`
3. Add route to `Navigation.tsx` — find the right `menuItems` dropdown
4. Add nav label to `content.ts` → `en.nav` and `es.nav`

### Add a new page (dynamic — DB data)
1. Add a query function to `src/lib/supabase/queries.ts`
2. Create `/src/app/<route>/page.tsx` — async Server Component that calls the query + `export const revalidate = 60`
3. Create `/src/app/<route>/PageClient.tsx` — `'use client'` component that receives data as props
4. If mutations needed: add admin form + API route (see existing products/hackers/hackathons as reference)
5. Add route to `Navigation.tsx` and nav labels to `content.ts`

### Change static copy / text
Edit `content.ts` only — always update **both** `en` and `es` keys. Never hardcode text in JSX.

### Change colors or spacing
- Use Tailwind tokens — prefer `text-primary`, `bg-surface-container-low`, etc.
- Add to `globals.css` only for repeated patterns not achievable with Tailwind utilities
- Do NOT use `cyber-blue` or `cyber-purple` in new code — use `primary` and `secondary`

### Debug build issues
```bash
rm -rf .next && npm run build   # clean rebuild (fixes stale route cache issues)
npx tsc --noEmit                # type-check only, no output
npm run lint                    # ESLint
```

### Admin not saving / cache not updating
- Admin API routes must call `revalidatePath('/page-route')` after DB mutations
- Use `revalidatePath`, NOT `revalidateTag` (tags only work with `unstable_cache`)
- If dev server returns 404 on a valid route, run `rm -rf .next` to clear stale build cache

---

## Key Conventions

1. **`'use client'`** on Client Components — required for Framer Motion + Context hooks. `page.tsx` files for dynamic pages are Server Components (no `'use client'`, `async` function)
2. **`hidden` / `visible`** — always use these keys with `staggerContainer` and `fadeInUp` variants
3. **0px radius** — never use `rounded-sm/md/lg/xl/2xl/3xl` — only `rounded-full` for pills
4. **Surface shifts instead of hover scale** — `hover:bg-surface-container` not `hover:scale-105`
5. **`gap-px bg-primary/10`** — the canonical grid-border pattern for card layouts
6. **Ambient glow** not drop shadow — `shadow-[0_0_20px_rgba(143,245,255,0.2)]` if glow is needed
7. **`font-mono text-[10px] tracking-widest uppercase`** — all metadata, UIDs, system labels
8. **Bilingual** — static text goes in `content.ts` (both `en` and `es`); DB data uses `_en`/`_es` column suffix
9. **Supabase image URLs** — always add `unoptimized={src.startsWith('http')}` to `<Image>` for Supabase Storage URLs
10. **`revalidatePath` not `revalidateTag`** — use `revalidatePath('/route')` in admin API routes to bust ISR cache

---

## Products Built by Ekinoxis

| Product | Description | Categories |
|---------|-------------|-----------|
| ETHCALI Wallet | Blockchain onboarding with Privy | DeFi, Wallet |
| Conservationix | Ecosystem tokenization for environmental protection | RWA, NFTs |
| CARP2P / TCARS | Car tokenization and P2P trading | RWA |
| CONVEXO | LATAM SME funding via blockchain | DeFi |
| AUKTRAFI | On-chain real estate auctions | RWA |
| 1UP ESPORTS | Gaming tower with identity-gated challenges | Gaming, NFTs |
| ZBricks | Real estate auctions on Base network | RWA |

---

## Team & Contact

- **Primary CTA**: Telegram — `https://t.me/ekinoxis`
- **Consultation form**: `https://mcai2mcfwrq.typeform.com/to/PLttpvSa`
- **Web dev form**: `https://mcai2mcfwrq.typeform.com/to/bXBs9fR4`
- **Locations**: Cali, Valle del Cauca, Colombia + Casper, WY, USA
- **Socials**: X, Instagram, LinkedIn, Telegram, Discord, GitHub
