---
name: ekinoxis-portfolio
description: The complete map of the Ekinoxis Labs ecosystem — every product, client project and experiment with its GitHub repos, live URLs, Vercel projects and Supabase projects. Use when working on any Ekinoxis project, syncing the website registry, checking which repo/deploy/database belongs to what, or onboarding to the org. Triggers - "what projects do we have", "which repo is X", "sync the portfolio", any product/client name below.
---

# Ekinoxis Labs — Project Portfolio

**Who we are**: Ekinoxis Labs, the first Innovation Laboratory of the Colombian Pacific (Cali, Colombia + Casper, WY). "Innovation Without Frontiers." Blockchain, AI and cryptography products; education; community; paid services; research.

**Source of truth for the website**: the `products` table in Supabase project `xaxwqvyieqchydckdtov` (ekinoxisweb), classified by `project_type` (`product` | `client` | `experiment`), rendered at ekinoxis.xyz/products. Umbrella cards list sub-projects in `sub_links` (jsonb `[{label, url, repo}]`). Manage via `/admin/products`.

**Accounts**: GitHub org `Ekinoxis-evm` · Vercel team `ekinoxis-team` · Supabase org "Ekinoxis labs" (`wljzgopssoncokhftmnh`).

## PRODUCTS (in-house IP)

| Product | Live | GitHub (Ekinoxis-evm) | Vercel project | Supabase project |
|---|---|---|---|---|
| ETHCALI app | ethcali.org + wallet.ethcali.org | ETHcali/ethcaliorg (external org) | ethcaliorg, wallet-ethcali, base-users-leaderboard (users.ethcali.org) | — |
| CONVEXO (umbrella) | www.convexo.xyz | `convexo`, `convexo_agent`, `fund-convexo-tws2025`, private `backend-convexo-db` | convexo_website, convexopayments (pay.convexo.xyz), convexo-frontend-vezi (protocol.convexo.xyz), convexus, v0-convexo-fund, convexo-admin (admin.convexo.xyz), uhi-6-hookathon-nextjs (uhi.convexo.xyz) | convexo-backend (`vsddmsypcbwyhqzhymgi`) |
| → CONVEXO modules | Payments pay.convexo.xyz · Loans protocol.convexo.xyz · Fund (repo only) · Kreditos www.kreditos.xyz (`thelender` repo, Vercel `kreditos`, Supabase `creditline`) · ETHFund ethfund.vercel.app (`ethfund`) · Onix/P2PAI www.p2pai.xyz (Vercel `onix-frontend`) · Agent (`convexo_agent`) | | | |
| 1UP Gaming Tower | 1upesports.org + app.1upesports.org | `gamintower-fe`, `gaming-tower` (contracts), `website-1up`, `tokenized-courses`(+`-fe`), `digitalhouse` | gamintower-fe, website-1up | 1uptower (`kwqfpkvalspuvyiszrfh`) |
| Apalancados | www.apalancados.tech | `apalacados`, private `apalancados-portfolio` | apalacados | apalancados-portfolio (`sxdenmoftkeuklyskalg`) |
| Shopper Center | store-shopper-center.vercel.app (store) + shopper-center.vercel.app (admin) | (no public repo) | shopper-center, store-shopper-center | — |
| The Guild | theguildapp.vercel.app | `theguildapp` | theguildapp | theguild (`jkpxoasqextvneuixzmz`) |

## CLIENT WORK (services)

| Client project | Live | GitHub | Vercel | Supabase |
|---|---|---|---|---|
| LIVE! Sportswear (staff scheduling for LIVE! Activewear) | livesportswear.vercel.app | `livesportswear` | livesportswear | livesportwear (`mkyybltpxyerlujdpbjd`) |
| SWR Inventory (Southwest Ranches Farmers Market) | swrfm-demo.vercel.app | `swrfm` | swrfm-demo | swr-inventory (`qtxycaejlspeakftlbkk`) |
| Padova (fashion PWA, unlisted on site) | padovapp.vercel.app | `padovapp`, private `padova-digital-wardrobe` | padovapp | — |
| BusinessHub (unlisted) | www.calibusinesshub.com | `businesshub` | businesshub | — |
| Webthronium (unlisted) | webthronium.vercel.app | `webthronium` | webthronium | — |

## EXPERIMENTS (lab prototypes)

| Experiment | Live | GitHub | Notes |
|---|---|---|---|
| ZBricks | zbricks.ekinoxis.xyz | `zbricks-fe`, `zbricks-scs` (contracts), `hackmoney-2026-be` (backend) | Real-estate auctions on Base; Supabase `zbricks` (`tibkhsyqmsleaqnquhtz`) |
| AUKTRAFI | www.auktrafi.xyz | `auktrafi-frontend`, `auktrafi_contracts`, `auktrafi-backend` | On-chain rental/booking auctions |
| Conservationix | — | `Superhack2024` | Ecosystem tokenization (ETHGlobal Superhack 2024) |
| CARP2P / TCARS | basebathches-2025.vercel.app | `tcars_xyz`, `tcars` | Car tokenization P2P (Vercel `tcarxyz`) |
| Nido App | (links closed) | — | Tokenized governance community channeling public tech budgets to accelerate Valle del Cauca's tech industry; supports Cámara de Comercio de Cali, Alcaldía, Gobernación del Valle, Comfandi |
| DogCare AI | — | `dogcareai` | Consumer AI agent experiment |

## People

- William Martinez — Founder & Product Manager — personal site www.0xwomb.xyz (Vercel `0xwmb`)
- Team lives in the `hackers` table (Supabase) → /hackers page

## Known gotchas

- `app.convexo.xyz` and `tsw.convexo.xyz` have NO DNS records (as of 2026-07-19) — don't link them until DNS is restored.
- `tshirts.ekinoxis.com` is dead (`Token-shirts`/`tshirts`/`ekinoxis_swag` repos are legacy merch experiments).
- Vercel env vars for ekinoxisweb must point at Supabase `xaxwqvyieqchydckdtov` (migrated 2026-07-16; a stale-env incident made production render empty on 2026-07-19).
- When syncing this file: verify links with HTTP checks before publishing them to the website registry.
