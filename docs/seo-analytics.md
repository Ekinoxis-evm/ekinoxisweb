# SEO, analytics and contact


- **Structured data**: `src/lib/seo.ts` builds Organization (root layout), Service + Offer and BreadcrumbList (the three service layouts); `<JsonLd />` renders them server-side. Keep the Offer prices equal to the page prices.
- **Metadata**: every section layout sets `title`, `description` and `alternates.canonical`; titles state the outcome and the price ("Websites for your business — live in 5 days, from $1,500"). The root template appends "— Ekinoxis Labs".
- **Analytics**: PostHog (`posthog-js`). `src/components/PostHogProvider.tsx` starts it and records App Router pageviews; `src/lib/analytics.ts` is the only place components call (`track`, `replayUrl`, `identifyLead`). Env: `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST`; no key = no-op. The SDK talks to `/ingest`, which `next.config.js` rewrites to PostHog so ad blockers do not drop events. Session replay masks all inputs; each lead carries its replay link in `details.replay` (Telegram + admin). Funnel events: `book_call_open` {topic}, `book_call_service` {topic}, `book_call_qualified` {topic}, `lead_sent` {topic, slot, lead_id}, `book_call_close` {topic}. `/admin` is never tracked.
- **Languages**: Spanish has its own URLs under `/es` with `hreflang` (en, es, x-default) on every page and in the sitemap; `x-default` is English. First visits from a Spanish-first browser, and anyone with the `ekx-lang=es` cookie, are redirected from bare paths to `/es` (crawlers send neither, so Googlebot indexes English and follows hreflang). `/en/...` is internal only and 308s to the bare path.
- **404 caveat**: with the root layout under `[lang]`, Next 14 cannot server-render `not-found.tsx` (it builds the 404 tree from the app root); the response is a correct 404 status with an empty shell, and the bilingual 404 renders on the client. Acceptable, known, do not chase it.

## Team & Contact

- **Primary CTA**: the booking popup (`useBookCall()(topic, preset?)` → `ContactForm`), which qualifies the lead first (options in `src/lib/leadForms.ts`, answers stored in `leads.details`) and then books the slot. There is no public "message us on Telegram" link; Telegram (`https://t.me/ekinoxis`) stays only as a footer social and the course-success community link.
- **Consultation form**: `https://mcai2mcfwrq.typeform.com/to/PLttpvSa`
- **Web dev form**: `https://mcai2mcfwrq.typeform.com/to/bXBs9fR4`
- **Locations**: Cali, Valle del Cauca, Colombia + Casper, WY, USA
- **Socials**: X, Instagram, LinkedIn, Telegram, Discord, GitHub

<!-- ekx:portfolio:start -->
