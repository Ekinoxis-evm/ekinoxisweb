# Acciones tokenizadas — onboarding after payment

What happens when someone pays for the live workshop «Acciones tech tokenizadas»
(viernes 5 dic 2026, 7:00 p. m. COT = 2026-12-06 00:00Z, 3 h).

## Flow

1. The buyer pays through a Stripe Payment Link (US$30 `plink_1UeQDxFr9j0xyULSX6B2GweC`,
   US$49 `plink_1UeQDyFr9j0xyULSo8fHh3IH`; the old US$15 `plink_1UddmKFr9j0xyULSLeUoCE0X` is
   deactivated but still mapped). Stripe redirects to `/es/recursos/acciones-tokenizadas/gracias`,
   which links to the prep page.
2. Stripe sends `checkout.session.completed` (or `checkout.session.async_payment_succeeded`) to
   `POST /api/webhooks/stripe`. The route verifies the signature, and for a paid session:
   - maps `session.payment_link` ∈ the three ids above → `course_slug = 'acciones-tokenizadas'`
     (other sessions keep `metadata.course_slug` → `client_reference_id` → `'unknown'`);
   - upserts `public.course_enrollments` keyed on `stripe_session_id` with `ignoreDuplicates`.
     A DB error returns 500 so Stripe retries.
3. Only when that call inserted the row (a retry returns no row), it sends the onboarding email
   through Resend: date and time, the four prep steps, a link to the prep page, «Añadir a Google
   Calendar», the `.ics` invite attached (METHOD:PUBLISH), the receipt note and the two safety lines.
   The send also carries `Idempotency-Key: acciones-onboarding/<session id>`.
   If the email fails the webhook still answers 200 (the row is saved) and logs
   `[stripe webhook] onboarding email not sent j***@domain <session id>` — resend by hand from that.
4. The prep page `/es/recursos/acciones-tokenizadas/preparacion` (noindex, not in the sitemap, like
   `/gracias`) shows the same checklist, the Google Calendar button and `/api/acciones/ics`.

Everything (session time, meeting link, steps, email copy, Payment Link ids) lives in
`src/lib/acciones/onboarding.ts`. The email is `buildWorkshopOnboardingEmail` in `src/lib/notify.ts`.

**Meeting link:** `SESSION.meetingUrl` is `null`; the email, page and invite then say «Te enviamos el
enlace de la sesión por correo 24 horas antes». Set it there once the link exists and deploy; buyers
who already got the email do not get it automatically — send them the link by email 24 h before.

## Environment variables (Vercel, Production)

| Name | Why |
|---|---|
| `STRIPE_WEBHOOK_SECRET` | Verifies the webhook signature (`whsec_…`). Without it every call returns 400. |
| `STRIPE_SECRET_KEY` | Not needed by the webhook: it verifies with the static `Stripe.webhooks.constructEvent`, which only uses the signing secret. Only `/api/checkout` needs it. |
| `SUPABASE_SERVICE_ROLE_KEY` (+ `NEXT_PUBLIC_SUPABASE_URL`) | `createServiceClient()` writes `course_enrollments`. Already set. |
| `RESEND_API_KEY` | Sends the email. Missing = the enrollment is saved, no email, one error log line. `hola@ekinoxis.xyz` must stay a verified Resend sender domain. |

## Owner steps

1. **Stripe Dashboard → Developers → Webhooks → Add endpoint** (live mode, account Ekinoxis Labs).
   - URL: `https://www.ekinoxis.xyz/api/webhooks/stripe`
   - Events: `checkout.session.completed` and `checkout.session.async_payment_succeeded`
2. Open the endpoint, **reveal the signing secret** (`whsec_…`) and copy it.
3. **Vercel → ekinoxisweb → Settings → Environment Variables (Production)**: add
   `STRIPE_WEBHOOK_SECRET`. Check `RESEND_API_KEY` exists. Never paste a key in a chat or commit.
4. **Redeploy** production (env vars apply only to a new deployment).
5. **Test with a real purchase:** buy the US$30 link with your own card and a mailbox you can read.
   Expect within a minute: Stripe receipt, the onboarding email with the `.ics`, a row in
   `course_enrollments` with `course_slug = 'acciones-tokenizadas'`, and a 200 in Stripe → Webhooks →
   the endpoint's event log. Use «Resend» on that event in Stripe: it must answer 200 and **not**
   send a second email. Then refund the payment in Stripe → Payments → Refund.
   (The refund does not change the row; delete the test row or mark its `status` by hand.)
