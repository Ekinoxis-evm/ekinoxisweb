# Security

## Secrets
- `.env.local` is gitignored and mode `600`. `.env.example` is the source of truth for
  required **names**. Never read a real env file in an agent session — a hook blocks it.
- Production values live in Vercel env vars only. Pull with `vercel env pull .env.local`.
- A leaked key is **rotated**, not hidden: rotate at the vendor → update Vercel → redeploy.
- Private keys never touch a frontend repo. Deployer keys live in the contracts repo's
  local `.env` and in CI secrets only, on a dedicated wallet that holds gas and nothing else.
- Two hooks enforce this: `.githooks/pre-commit` (any commit) and
  `.claude/hooks/secret-scan.sh` (any Claude Bash call while a key is staged).

## Row-Level Security
- Every table has RLS enabled. Default deny. Policies in the same migration as the table.
- Role comes from the JWT (`app_metadata.role`), read through a `security definer` helper
  so policies never recurse. Helpers are executable by `authenticated` + `service_role` only.
- The service-role client (`src/lib/supabase/service.ts`) bypasses RLS. Use it **only** in:
  - cron handlers, after `CRON_SECRET` is verified
  - public token routes, after the token is verified
  - server actions that need a controlled cross-tenant write
- It is `import "server-only"`. Never behind `NEXT_PUBLIC_`, never in a client component.

## Tokens & capabilities
- Magic / share tokens: 32 bytes from `crypto.randomBytes`, base64url. Look up by DB
  equality (constant time), return **404** on miss (no enumeration), never log them.

## Cron
- Every `/api/cron/*` route checks `Authorization: Bearer ${CRON_SECRET}` and returns 401.
- Vercel Hobby rejects per-minute cron; sub-hourly work uses Supabase `pg_cron` calling the
  route with a bearer from Vault.

## Webhooks
- Verify the signature before parsing the body (Stripe `constructEvent`, Shopify HMAC,
  MercadoPago `x-signature`). Make the handler idempotent: a retried webhook must never
  downgrade a paid record.

## PII
- Mask emails and phones in logs (`j***@domain.com`). Pass client components only what they render.

## Headers
- `frame-ancestors`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
