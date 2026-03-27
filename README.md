# Ekinoxis Website

The official website for **Ekinoxis Labs** — the first Innovation Laboratory of the Colombian Pacific. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Next.js 14** (App Router) — framework
- **TypeScript 5** — type safety
- **Tailwind CSS 3** — styling
- **Framer Motion 11** — animations
- **Supabase** — database (Postgres), file storage, and authentication
- **Vercel** — deployment

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project ([supabase.com](https://supabase.com))

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=your-admin-email@example.com
```

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase Dashboard → Project Settings → API
- `SUPABASE_SERVICE_ROLE_KEY` — from the same page (keep this secret, never expose to client)
- `ADMIN_EMAIL` — the Google account email that will have admin CMS access

### 3. Set up Supabase

The database schema, storage buckets, and RLS policies need to be applied to your Supabase project. Run the SQL migrations from `supabase/migrations/` in your Supabase SQL editor, or use the Supabase CLI.

Required storage buckets (create as **public**):
- `products`
- `hackers`
- `hackathons`

Enable Google OAuth in Supabase Dashboard → Authentication → Providers → Google. Add your OAuth credentials and set the redirect URL to `https://your-domain.com/api/auth/callback`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

## Admin CMS

The admin panel is at `/admin`. It requires Google OAuth authentication.

**Access**: only the email set in `ADMIN_EMAIL` env var is allowed in.

**Manage**:
- `/admin/products` — create, edit, delete products
- `/admin/hackers` — create, edit, delete team members
- `/admin/hackathons` — create, edit, delete hackathon events

Changes go live on the public site within ~60 seconds (ISR cache revalidation).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home / Hero
│   ├── culture/              # Values (static)
│   ├── hackers/              # Team grid (Supabase)
│   ├── products/             # Product showcase (Supabase)
│   ├── research/             # Research (static)
│   ├── education/            # Education partners (Supabase)
│   ├── certifications/       # Certification partners (Supabase)
│   ├── hacker-house/         # Hackathon events (Supabase)
│   ├── tech-stack/           # Tech stack (static)
│   ├── services/             # Services pages (static)
│   ├── admin/                # CMS admin panel
│   └── api/admin/            # Admin mutation API routes
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ui/                   # AnimatedBackground, Button, ScanBadge, SocialLinks, etc.
├── contexts/
│   └── LanguageContext.tsx   # EN/ES language toggle
└── lib/
    ├── content.ts            # Static bilingual UI text
    ├── animations.ts         # Framer Motion variants
    └── supabase/             # Client, server, service clients + queries + types
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero section |
| `/culture` | Ekinoxis values |
| `/hackers` | Team member profiles |
| `/products` | Product showcase |
| `/research` | Research streams |
| `/education` | University and government partners |
| `/certifications` | Certification partners |
| `/hacker-house` | Hackathon participation history |
| `/tech-stack` | Technology stack visualization |
| `/services` | Consultancy and development services |
| `/admin` | CMS (Google OAuth required) |

## Bilingual Support

The site is fully bilingual (EN/ES). Static UI text lives in `src/lib/content.ts`. Database content uses `_en`/`_es` column suffixes (e.g. `description_en`, `description_es`). The language toggle in the nav switches both simultaneously.

## Design System

**Obsidian Architect** — cypherpunk innovation lab aesthetic:

- 0px border-radius everywhere (no rounded corners except pills)
- `gap-px bg-primary/10` grid gaps instead of dividers
- Surface color shifts for hover states (not scale transforms)
- `font-mono text-[10px] tracking-widest uppercase` for all metadata and UIDs
- Electric Cyan (`#8ff5ff`) as primary action color
- Social icons: `/public/socials/` — github.png, linkedin.png, x.jpg, telegram.webp, discord.webp

## License

© 2024 Ekinoxis. All rights reserved.
