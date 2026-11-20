# Architecture

> Folder map, navigation, where content lives, and the conventions.

## Project Structure

**Languages are URLs.** English lives at the bare path (`/about`), Spanish under `/es` (`/es/about`). Every public page sits under `src/app/(site)/[lang]/`; `src/middleware.ts` rewrites bare paths to the internal `/en` tree (and 308s any public `/en/...` back), so `params.lang` reaches every layout and page. The admin has its own root layout under `src/app/(admin)/admin/`. The paths below are relative to `src/app/(site)/[lang]/` unless noted.

```
/src/
├── middleware.ts                # /about → /en/about rewrite, /es passthrough, cookie + Accept-Language redirect to /es
├── app/
│   ├── (site)/[lang]/layout.tsx # Root layout: <html lang>, fonts, scanline overlay, Navigation + Footer + LanguageProvider initial={lang}
│   ├── (site)/[lang]/not-found.tsx    # Bilingual 404 (rendered client-side; see SEO section)
│   ├── (site)/[lang]/[...rest]/page.tsx # Catch-all → notFound()
│   ├── (admin)/layout.tsx       # Admin root layout (html/body only, noindex)
│   ├── globals.css              # Global styles, Tailwind directives, animation keyframes, legacy utilities
│   ├── page.tsx                 # Home / Hero (2-col grid, sphere animation, 4-stat panel)
│   ├── about/                   # About us: story, equinox meaning, what we do, culture (#culture), moving team band with profile popup (#team) — /culture and /hackers redirect here
│   ├── hackers/
│   │   ├── page.tsx             # Server Component — fetches getHackers(), revalidate=60
│   │   └── HackersClient.tsx    # Client Component — renders grid with SocialLinks icons
│   ├── portfolio/               # One page: Products (phase line + filter) and Clients; case studies at [division]/[slug]
│   │   ├── page.tsx             # Server Component — getProducts(), revalidate=60
│   │   └── PortfolioClient.tsx  # Sticky Products/Clients nav, phase filter, project and client cards
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
│   ├── privacy/ terms/ data-deletion/  # Legal pages — text in src/lib/legal.ts, rendered by components/LegalDocument.tsx, linked from the footer and the booking form
│   ├── services/
│   │   ├── page.tsx             # 3 track cards (CONSULTANCY / DEVELOPMENT / ENGINEERING)
│   │   ├── consultation/        # 5 topic cards + talks panel, 4-step funnel, 4 session formats (Focus / Roadmap Sprint / Workshop / Retainer)
│   │   ├── web-development/     # Included chips → BuildLoop diagram (plan → build → rounds ring → live in 5 days) → tools → sites shipped → 3 packages → book-call panel
│   │   └── app-building/        # BuildLoop diagram (diagnostic → demo → rounds ring → fit) → tools → work → 3 tiers from content.ts services.pricing (BuildLoop lives in src/components)
│   ├── workshops/
│   │   ├── page.tsx             # Workshop grid from `workshops` in src/lib/courses.ts + "how we teach" + private-cohort CTA
│   │   └── [slug]/
│   │       ├── page.tsx         # Server Component — generateStaticParams from registry, notFound() on unknown slug
│   │       └── CourseClient.tsx # Client Component — spec, price, audience/outcomes/prereqs, syllabus, enroll CTA
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
│   ├── LocalizedLink.tsx         # next/link that prefixes internal hrefs with /es in Spanish — use it for every internal link
│   ├── Navigation.tsx            # Fixed header, dropdowns, language toggle (a real link to the other language's URL), mobile slide menu
│   ├── Footer.tsx                # 2-col: brand left, social links right
│   └── ui/
│       ├── AnimatedBackground.tsx  # Variants: ambient | grid | gradient | terminal
│       ├── Button.tsx              # Variants: primary | ghost | secondary | tertiary | outline
│       ├── ScanBadge.tsx           # Monospaced metadata tag; variants: primary | secondary | tertiary | muted | outline | error
│       └── SocialLinks.tsx         # Social icon links using /public/socials/ images; props: github, linkedin, x, telegram, discord, website, size
│
├── contexts/
│   └── LanguageContext.tsx       # EN/ES via useLanguage()
│
└── lib/
    ├── i18n.ts                   # Lang type, localizePath / splitPath / switchLangPath / hreflang / langOf(params)
    ├── fonts.ts                  # next/font loaders shared by both root layouts
    ├── seo.ts                    # siteMetadata / pageMetadata (title, description, canonical, hreflang per lang) + JSON-LD
    ├── content.ts                # Bilingual UI text (nav, page titles, static descriptions, CTAs)
    ├── courses.ts                # Course registry (static, bilingual) — move to Supabase once there are several
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

## Navigation Structure

```
EKINOXIS (logo → /)
About (dropdown, label → /about)
  ├─ About us → /about (culture lives at /about#culture)
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
Portfolio (dropdown: Products → /portfolio#products, Clients → /portfolio#clients, All work → /portfolio)
Workshops → /workshops (old /courses redirects)
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

**Cache invalidation**: Admin API routes call `revalidatePath('/portfolio')` (etc.) after mutations. This busts ISR cache immediately so the public page shows fresh data. Do NOT use `revalidateTag` — it only works with `unstable_cache`, not plain Supabase calls.

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

## Key Conventions

1. **`'use client'`** on Client Components — required for Framer Motion + Context hooks. `page.tsx` files for dynamic pages are Server Components (no `'use client'`, `async` function)
2. **`hidden` / `visible`** — always use these keys with `staggerContainer` and `fadeInUp` variants
3. **0px radius** — never use `rounded-sm/md/lg/xl/2xl/3xl` — only `rounded-full` for pills
4. **Surface shifts instead of hover scale** — `hover:bg-surface-container` not `hover:scale-105`
5. **`gap-px bg-primary/10`** — the canonical grid-border pattern for card layouts
6. **Ambient glow** not drop shadow — `shadow-[0_0_20px_rgba(143,245,255,0.2)]` if glow is needed
7. **`font-mono text-[12px] tracking-widest uppercase`** — all metadata and labels; 11px is the floor (badges only). Never go below: 9–10px was unreadable on the scanline ground
8. **Bilingual** — static text goes in `content.ts` (both `en` and `es`); DB data uses `_en`/`_es` column suffix
9. **Supabase image URLs** — always add `unoptimized={src.startsWith('http')}` to `<Image>` for Supabase Storage URLs
10. **`revalidatePath` not `revalidateTag`** — use `revalidatePath('/route')` in admin API routes to bust ISR cache (the Spanish page is `/es/route`; revalidate both)
11. **Language = URL** — `useLanguage().language` is the URL's language; `setLanguage` navigates to the other URL. Internal links go through `LocalizedLink` with bare hrefs; metadata goes through `pageMetadata` so every page carries canonical + hreflang

---
