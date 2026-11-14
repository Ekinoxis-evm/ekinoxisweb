# Stripe wiring — what is done, what is yours

Audited 2026-09-18. The live account is **Ekinoxis Labs**
`acct_1R9zz5IGWVzmFM6G` (statement descriptor reads `EKINOXIS SERIES 57`).

Course checkout has **never been able to run in production** — not because of a
wrong price, but because no Stripe environment variables exist in Vercel at all.
`/api/checkout` throws `STRIPE_SECRET_KEY is not set` before it reaches Stripe.
Nothing has broken so far only because both courses are `waitlist` /
`coming_soon`, and the route returns 409 before touching Stripe.

---

## Done (2026-09-18)

- **Archived the $30/day DeFi price.** `price_1SN0qUIGWVzmFM6GX3M0L0GK` was live
  and active: $30.00 USD, `recurring · interval: day`. Zero subscriptions, so
  nobody was ever charged — but any checkout on it would have billed $30 every
  day indefinitely. Stripe refused to archive the price while it was the
  product's default, so `prod_TJe8aNbbg7LaKT` was archived first, then the price.
  Both are reversible: set `active: true` again.
- **Created the CRS_01 course product and price:**

  | | |
  |---|---|
  | Product | `prod_VHTiI8J1G8WzFD` — *Build Your Business Stack* |
  | Price | `price_1UGul0IGWVzmFM6GRuaMnlvV` |
  | Amount | **$550.00 USD, one-time** |
  | Metadata | `course_slug=business-stack`, `course_code=CRS_01` |

  This matches what `src/lib/courses.ts` displays. Creating it charges nobody.

---

## Yours — I cannot and should not do these

### 1. Add three variables to Vercel production

Vercel currently holds only `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`.

```
STRIPE_SECRET_KEY            sk_live_…      from Developers → API keys
STRIPE_PRICE_BUSINESS_STACK  price_1UGul0IGWVzmFM6GRuaMnlvV
STRIPE_WEBHOOK_SECRET        whsec_…        from step 2
```

Add them with `vercel env add <NAME> production`, or in the dashboard under
Settings → Environment Variables. **Never paste a secret key into a chat, a
commit, or `.env.local` that might be committed.**

### 2. Create the webhook endpoint

Stripe → Developers → Webhooks → Add endpoint:

- URL: `https://www.ekinoxis.xyz/api/webhooks/stripe`
- Events: `checkout.session.completed`
- Copy the signing secret (`whsec_…`) into `STRIPE_WEBHOOK_SECRET` above.

### 3. Redeploy, then open the course

Env vars only take effect on a new deployment. After redeploying, flip CRS_01
in `src/lib/courses.ts`:

```ts
status: 'waitlist',   →   status: 'open',
```

Test with a real card for $550 and refund yourself, or test the whole path in a
sandbox first. Enrollments land in `public.course_enrollments`.

---

## Still out of line — decide later

- **The live catalogue does not match the website.** Stripe holds a vertical-ads
  production ladder — *Prueba* $79, *Pack Completo* $199, *Crecimiento* $299/mo,
  *Multi-marca* $899/mo — plus $1,500/mo and $499/mo subscriptions, two
  Universidad Santiago de Cali items ($1,388.40 and $1,572.00), a $10 cap and a
  $50 web3 profile setup. None of it appears on ekinoxis.xyz, and none of the
  site's own prices ($500 – $38,000) exist in Stripe.
- **One live charge ever:** COP 300,000 (~$75), Oct 2026, *Cali Bussines Hub*
  event registration through Luma, which is connected as a platform application
  and took a COP 15,000 fee.
- The sandbox account in the LLC notes (`acct_1R9zzHIeMhBdGlf7`, the Connect P2P
  prototype) is a **different account** from this one. The warning there stands:
  do not build billing on the Connect prototype.
