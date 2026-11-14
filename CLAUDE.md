# CLAUDE.md — Ekinoxis website

Public site of **Ekinoxis Labs**, the first Innovation Laboratory of the Colombian Pacific (Cali, Colombia + Casper, WY). Tagline: "Innovation Without Frontiers". The site turns visitors into booked calls and shows the work is real. Audience, positioning and evidence rules: `PRODUCT.md`. Visual system: `DESIGN.md`.

Business: education, community (hacker houses), products (IP), services (consulting, web, app building), courses, research. Focus: LATAM blockchain, AI, cryptography.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind 3 · Framer Motion 11 · Supabase (Postgres + Storage + Auth) · PostHog · Stripe · Vercel · npm.

## Hard rules

- **Never read `.env*`.** Reference variable names only (`.env.example`). Hooks block it; don't work around them.
- **Language is the URL.** EN at bare paths, ES under `/es`; links via `LocalizedLink`; all static text in `src/lib/content.ts`, both `en` and `es`.
- **No redundant copy.** Every text adds new value; never repeat a message across or within pages. No invented quotes, ratings, client counts or results (`PRODUCT.md`).
- **Tokens only.** 0px radius, no shadows, no hardcoded colors; the system is `DESIGN.md`. Never add a token in code first.
- **Dead code gets deleted**, not commented out. Docs for removed things go in the same change.
- **Pushing to `main` deploys production.** Verified chunks only (`/deploy`); schema migrations are applied before the code that needs them.
- **Phases are earned by traction** (Idea → Alpha → Beta → Live); nothing moves up without a user or income number. See `.claude/rules/data-model.md`.

## Design

- **Mode:** brand (Impeccable: Persuade); the admin is operational (Operate).
- **Authority:** `DESIGN.md` (tokens, type, components, Do's and Don'ts) · `PRODUCT.md` · `.claude/rules/design.md` (universal standards, definition of done).
- **Figma:** set up from the Ekinoxis root (shared branding and MCP config); not configured per project.
- **Theme lives in:** `tailwind.config.js` + `src/app/globals.css`, the only place tokens become code.
- **Gate:** `node design/detect-gate.mjs` fails on new detector findings (baseline `design/detect-baseline.json`); log in `design/log.md`.
- **Loop:** `/design-loop <screen> [figma-url]`. Corrected twice for the same thing → one line in `DESIGN.md` → Do's and Don'ts.
- **Code recipes** (page shells, gap-px grid, badges, buttons): `docs/design-patterns.md`.

## Where things go

| Adding… | Put it in… |
|---|---|
| Static copy | `src/lib/content.ts` (en + es) |
| Portfolio project, hackers, hackathons | `/admin` → Supabase (no code); taxonomy in `src/lib/portfolio.ts` |
| A public page | `src/app/(site)/[lang]/<route>/` — `page.tsx` + `layout.tsx` (metadata) + `*Client.tsx`; add to `sitemap.ts` and `Navigation.tsx` |
| Data access | `src/lib/supabase/queries.ts` (public) · `requireAdmin()` (admin) |
| A migration | `supabase/migrations/` via `/db-migrate` |
| A course | `src/lib/courses.ts` |
| Booking / lead forms | `src/lib/leadForms.ts`, `useBookCall()` — the primary CTA, no public Telegram link |

## Tooling in this repo

| Kind | What | Use for |
|---|---|---|
| Rules (`.claude/rules/`) | `design` · `code-style` · `data-model` · `security` | Loaded on demand; the short, enforceable version of the docs |
| Commands | `/design-loop` · `/deploy` · `/db-migrate` · `/ekinoxis-page` · `/ekinoxis-content` | Recurring workflows |
| Agent | `design-auditor` (sonnet, read-only) | After UI changes: 390px, EN/ES congruence, system compliance |
| Hooks | `guard-env` · `secret-scan` · `post-edit-typecheck` · `on-stop-summary` | Secrets never read or staged; type errors shown on edit |
| Skills (project) | `ekinoxis-portfolio` · `supabase` · `supabase-postgres-best-practices` | Project map; DB work |
| Skills (global, design) | `impeccable` · `design-taste-frontend` · `emil-design-eng` · `animate` · `animation-performance` · `improve-animations` · `break-ui` | Critique/audit/polish; motion. One taste engine: Impeccable |
| MCP (`.mcp.json`) | supabase (scoped to this project) | Everything else (context7, vercel, figma, …) is managed from the Ekinoxis root; verify library APIs with context7 |

Model routing: Opus for design direction, architecture, migrations, anything touching production data; Sonnet for specified code and copy changes; Haiku or Explore for read-only lookups. Briefs name the exact files.

## Before you hand back

```bash
npx tsc --noEmit && npm run build        # and, if UI changed:
node design/detect-gate.mjs              # then check 390px, reduced motion, keyboard
```

If they aren't green, say so with the output. Don't claim done.

## Docs (loaded only when needed)

| Page | Holds |
|---|---|
| `docs/architecture.md` | Folder map, navigation, content architecture, conventions |
| `docs/data-layer.md` | Supabase tables, queries, clients, /admin and its API |
| `docs/design-patterns.md` | Page shells, grid, badge, button, animation recipes |
| `docs/maintenance.md` | Step-by-step: add a product, course, page, price change, debug |
| `docs/seo-analytics.md` | Metadata, JSON-LD, PostHog funnel events, languages, contact |
| `docs/stripe-setup.md` | Stripe wiring status |

<!-- ekx:portfolio:start -->
## Ekinoxis portfolio

- **Product:** ekinoxis.xyz — Company (not on the website) · status **LIVE**
- **What:** The company website + /admin that manages the portfolio, leads, hackers and hackathons.
- **Live:** https://ekinoxis.xyz
- **Vercel (ekinoxis-team (team_jxTNRBmimeErr5ULGBepXlL0)):** ekinoxisweb
- **Supabase:** xaxwqvyieqchydckdtov (ekinoxisweb)
- **Stack:** Next.js · React · Tailwind · Supabase · Stripe
- **Scripts:** `dev`, `build`, `start`, `lint`, `brand:zip`
- **Brain profile:** `../../_brain/projects/company/ekinoxisweb.md` — shared skills (`ekx-*`), registry and the full portfolio live in `~/Documents/ekinoxis/_brain`.
- Edit this block in `_brain/registry/portfolio.json`, then run `python3 _brain/scripts/align-claude.py --apply`.
<!-- ekx:portfolio:end -->
