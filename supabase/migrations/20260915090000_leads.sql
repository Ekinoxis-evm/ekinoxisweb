-- Leads: what the contact forms capture.
--
-- Until now every CTA on the site was a t.me/ekinoxis link, which captures
-- nothing — if a visitor didn't message, there was no trace they were ever
-- interested. This table is the record, and it is written before any
-- notification is attempted, so a lead survives Telegram or email being down.
--
-- RLS: deny by default. Nothing here is readable with the anon key. The
-- insert is done by the service-role client inside /api/contact (which
-- validates and rate-limits first), never straight from the browser — so no
-- insert policy is granted to anon either.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Which page/offer the form was submitted from.
  topic         text not null
                check (topic in ('consultation','web','app','course','talk','general')),

  name          text not null check (length(trim(name)) between 1 and 120),
  email         text not null check (position('@' in email) > 1 and length(email) <= 254),
  whatsapp      text check (whatsapp is null or length(whatsapp) <= 40),
  company       text check (company is null or length(company) <= 160),
  message       text not null check (length(trim(message)) between 1 and 4000),

  -- Free-text bands, not numbers — people abandon forms that ask for exact budgets.
  budget        text check (budget is null or length(budget) <= 60),

  -- Where they came from, for attribution. Set server-side, never trusted from the client.
  source_path   text check (source_path is null or length(source_path) <= 300),
  language      text not null default 'en' check (language in ('en','es')),

  -- Follow-up state, driven from /admin.
  status        text not null default 'new'
                check (status in ('new','contacted','qualified','won','lost','spam')),
  notes         text,

  -- Whether the Telegram ping actually went out. Lets us find leads that
  -- landed while the bot token was missing or the API was failing.
  notified_at   timestamptz
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

alter table public.leads enable row level security;
-- No policies on purpose: anon and authenticated get nothing. Reads happen
-- through the service-role client in the admin area only.

comment on table  public.leads is 'Contact-form submissions. Written by /api/contact with the service role; never readable with the anon key.';
comment on column public.leads.notified_at is 'When the Telegram notification succeeded. Null means nobody was pinged — check these.';
