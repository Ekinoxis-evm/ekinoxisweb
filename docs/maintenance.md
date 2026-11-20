# Common maintenance tasks


### Add a new product
Go to `/admin/products/new` — fill in name, images, description (EN + ES), URLs, repos, categories, technologies, assign hackers. No code changes needed.

### Add a new team member (hacker)
Go to `/admin/hackers/new` — fill in name, photo, profile (EN + ES), university, social links. No code changes needed.

### Add a new hackathon / hacker house event
Go to `/admin/hackathons/new` — fill in name, logo, website, start/end dates. Status (incoming/ongoing/past) is derived automatically from dates.

### Add or edit a course
Edit `src/lib/courses.ts` — one `Course` object per course, every string in both `en` and `es`. `status` drives the badge and CTA label (`open` / `waitlist` / `coming_soon`); `price: null` renders "Price TBA"; `modules: { en: [], es: [] }` renders the "syllabus published with the announcement" note. `enrollUrl` falls back to Telegram. The detail route (`/workshops/[slug]`) is prerendered from the registry, so a new slug needs a rebuild/deploy. A workshop with its own landing page goes in `workshops` as a `LandingWorkshop` with `href` (no detail page).

### Change service prices
Consultation formats live in `src/app/services/consultation/page.tsx`; web packages in `src/app/services/web-development/page.tsx` (USD + COP); app-building tiers in `content.ts` → `services.pricing.plans`; the three "FROM $…" teasers on `/services` are in `src/app/services/page.tsx`. Keep all four in agreement and update both `en` and `es`.

### Add a new technology logo
1. Add logo to `/public/tecnologies/<Category>/`
2. Add path to `content.ts` → `technologies.categories.<key>.logos[]`

### Add a new page (static — no DB data)
1. Create `/src/app/(site)/[lang]/<route>/page.tsx` — add `'use client'` directive
2. Import `useLanguage`, `content`, `AnimatedBackground`, `ScanBadge`, `staggerContainer`, `fadeInUp`
3. Add a `layout.tsx` beside it with `generateMetadata({ params }) → pageMetadata(langOf(params), '/<route>', { title: {en, es}, description: {en, es} })` — this sets the canonical and hreflang pair
4. Internal links use `import Link from '@/components/LocalizedLink'` with bare hrefs (`/about`), never `/es/...`
5. Add route to `Navigation.tsx` — find the right `menuItems` dropdown
6. Add nav label to `content.ts` → `en.nav` and `es.nav`
7. Add the bare path to `src/app/sitemap.ts` (it emits both languages)

### Add a new page (dynamic — DB data)
1. Add a query function to `src/lib/supabase/queries.ts`
2. Create `/src/app/(site)/[lang]/<route>/page.tsx` — async Server Component that calls the query + `export const revalidate = 60` + `generateMetadata` via `pageMetadata`
3. Create `/src/app/(site)/[lang]/<route>/PageClient.tsx` — `'use client'` component that receives data as props
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
