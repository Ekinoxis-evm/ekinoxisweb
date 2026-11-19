# Acciones tech tokenizadas — website side

> **The course content now lives in** `ekinoxis/products/digital products/acciones-tokenizadas/`
> (`curso/PLAN.md` is the source of truth; `landing/` has the page spec; `datos/` the catalog and `merge.py`).
> This repo only holds the landing page and lead capture / reservation.

## What lives here
| Piece | Where |
|---|---|
| Page | `/es/recursos/acciones-tokenizadas` (Spanish only; the bare path redirects) |
| Copy | `src/lib/recursos.ts` → `ACCIONES` (price, dates, refund are `null` until set; null hides the line) |
| Catalog snapshot | `src/data/acciones/catalogo.json`, copied from `datos/` — re-copy after each `merge.py` run |
| Data access | `src/lib/acciones/catalog.ts` (server only: tiles, metrics, logos) |
| Logos | `public/recursos/acciones/logos/{slug}.svg`, `issuer-{id}`, `venue-{id}`, `tool-{id}`; `manifest.json` records source and brand hex |
| Leads | `leads` via `/api/contact`, `topic = 'course'`, `details.resource = 'acciones-tokenizadas'`; own confirmation email in `src/lib/notify.ts` |

## Not built yet
- **Reservation payment (US$5):** no Stripe variables in any Vercel environment (checked 19 nov 2026).
  Until they exist, «Reservar con US$5» opens the interest form. Setup: `docs/stripe-setup.md`.
- **Logins and course access (phase 2):** Privy login + a customers table + purchase → access flow.

## Content rules (page)
Every figure carries its source and date; metrics come from the catalog's computed `metrics`, never typed.
«Esto no es asesoría de inversión.» is visible. The legal status for residents of Colombia is not verified:
never say it is legal.
