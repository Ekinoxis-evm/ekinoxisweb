-- Leads: the qualifying answers each booking form now asks before the call.
--
-- One jsonb column instead of one column per question: the questions differ
-- by service (consultation asks topic, format and hours; websites ask the
-- package and whether a site exists; apps ask plan, stage and budget band)
-- and will keep changing. Keys and values are whitelisted in /api/contact
-- against src/lib/leadForms.ts before anything is written here.

alter table public.leads
  add column if not exists details jsonb not null default '{}'::jsonb;

comment on column public.leads.details is
  'Qualifying answers from the booking form, keyed as in src/lib/leadForms.ts (type, format, hours, estimate_usd, plan, has_site, stage, budget_band, audience, organization, who).';
