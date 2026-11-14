# Data layer and admin CMS

> Supabase tables, queries and the /admin panel. Rules for the `products` registry: `.claude/rules/data-model.md`.


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

Products link to a hackathon directly via the `products.hackathon_id` FK column (there is no `product_hackathons` join table).

The `products` table doubles as the registry for all showcased work, classified by `project_type`:
- `product` — in-house IP (default)
- `client` — client work (the Clients section of /portfolio)
- Experiments and proofs of concept are legacy: all were folded into `product` (2026-11-14). The only axis is the phase (`status`), see `.claude/rules/data-model.md`.

`products.sub_links` (jsonb array of `{ label, url?, repo? }`) holds sub-project links for umbrella cards — e.g. the CONVEXO card lists its whole suite (Payments, Loans Protocol, Fund, Kreditos, ETHFund, Onix) as modules.

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

All mutation routes call `revalidatePath('/portfolio')` etc. after DB changes to bust Next.js ISR cache.

### Image Uploads

The `ImageUpload` admin component uploads to Supabase Storage. Buckets:
- `products` — product images → `image_url`
- `hackers` — hacker photos → `image_url`
- `hackathons` — hackathon logos → `logo_url`

**Important**: Public Supabase Storage URLs start with `https://`. Always pass `unoptimized={src.startsWith('http')}` to Next.js `<Image>` for these.

---
