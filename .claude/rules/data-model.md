# Data model — the `products` registry

> Schema decisions in prose. Update this first, then write the migration in `supabase/migrations/`.
> Migrations are append-only, named `YYYYMMDDHHMMSS_name.sql`; never edit an applied one.
> `ALTER TYPE … ADD VALUE` needs its own migration, separate from the data update that uses it.

## `products` — every showcased project
- **Purpose:** one row per portfolio project; `/portfolio` and the case-study pages render from it.
- **`project_type`:** `product` (our IP) or `client` (client work). `experiment` and `poc` are legacy — all rows were moved to `product`.
- **`status` → phase (display only):** `IDEA` Idea · `MVP` Alpha · `BETA` Beta · `LAUNCHED` Live. `phaseForStatus()` in `src/lib/portfolio.ts` is the only mapping.
- **Phases are earned by traction, not by code:** Idea = nothing working · Alpha = works, only our team and invitees use it · Beta = real users outside the team, measured · Live = real users and real income, tracked monthly. Nothing moves up without a number.
- **Hackathon:** a "Built at X" tag through `hackathon_id`. It is not a type.
- **Case study:** `slug`, `case_study_en/es` (markdown), `gallery`, `proof` (jsonb).
- **`sub_links`:** jsonb `[{label, url?, repo?}]` for umbrella cards (CONVEXO modules).
- **Links:** `repo_*` must be public repos; a private repo link is a 404 for visitors, so leave it null.
- **Images:** `image_url` is a path under `/public` or a Supabase Storage URL. Clients may be logo-only until a screenshot exists.

## Other tables
`hackers`, `hackathons`, `product_hackers` (join), `education_partners`, `certification_partners`, `leads` (booking form + qualification answers in `details`).

- **Traction:** `users_count` (real users outside the team) and `monthly_income_usd`; null = not measured. Shown on Live cards only when set. Never fill a guess.

## Reading order of the portfolio
/portfolio has two tabs (Products, Clients); each is grouped live → beta → alpha → idea, then `display_order`.
