# Acciones tech tokenizadas — website side

> **The course content now lives in** `ekinoxis/products/digital products/acciones-tokenizadas/`
> (`curso/PLAN.md` is the source of truth; `landing/` has the page spec; `datos/` the catalog and `merge.py`).
> This repo only holds the landing page and lead capture / reservation.

## What lives here
| Piece | Where |
|---|---|
| Page | `/es/recursos/acciones-tokenizadas` (Spanish only; the bare path redirects) |
| Copy | `src/lib/recursos.ts` → `ACCIONES` (`session.time` is `null` until set; null hides it. No refund line until the lawyer review) |
| Catalog snapshot | `src/data/acciones/catalogo.json`, copied from `datos/` — re-copy after each `merge.py` run |
| Data access | `src/lib/acciones/catalog.ts` (server only: tiles, metrics, logos) |
| Logos | `public/recursos/acciones/logos/{slug}.svg`, `issuer-{id}`, `venue-{id}`, `tool-{id}`; `manifest.json` records source and brand hex |
| Leads | `leads` via `/api/contact`, `topic = 'course'`, `details.resource = 'acciones-tokenizadas'`; own confirmation email in `src/lib/notify.ts` |

## Payment
- **Stripe Payment Links** (live, product `prod_Vexh0me4TtKkC4`): US$15 Black Friday until 1 Dec 2026, US$49
  from 2 Dec 00:00 COT, in `ACCIONES.price.links`; the page picks the tier by the visitor's clock. The US$30
  link was retired on 23 nov 2026 (session moved to sáb 12 dic). Buttons append `?client_reference_id={utm_campaign|landing}-{position}`. After paying,
  Stripe redirects to `/es/recursos/acciones-tokenizadas/gracias`.
  Buyers land in `course_enrollments` through the Stripe webhook, which also sends the onboarding email
  (`docs/acciones-onboarding.md`). There is no interest form on the page; the only action is paying.
- `/api/checkout` is not used here.

## Not built yet
- **Logins and course access (phase 2):** Privy login + a customers table + purchase → access flow.

## Content rules (page)
Every figure carries its source and date; metrics come from the catalog's computed `metrics`, never typed.
«Esto no es asesoría de inversión.» is visible. The legal status for residents of Colombia is not verified:
never say it is legal.
