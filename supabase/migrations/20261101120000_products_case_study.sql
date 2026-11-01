-- Case-study pages: /portfolio/[division]/[slug]
--
-- A portfolio card is one paragraph and an outbound link. When that link dies
-- (erased database, expired provider, client took the site down) the work
-- vanishes from the record. A case study lives on ekinoxis.xyz and survives on
-- its own: the problem, what we built, the outcome, and the proof.
--
-- Additive only. Existing rows keep working; a row gets a page once it has a
-- slug and a case study in at least one language.

alter table public.products
  add column if not exists slug text,
  add column if not exists case_study_en text,
  add column if not exists case_study_es text,
  add column if not exists proof jsonb not null default '[]'::jsonb,
  add column if not exists gallery text[] not null default '{}';

alter table public.products
  drop constraint if exists products_slug_format;
alter table public.products
  add constraint products_slug_format
  check (slug is null or slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

alter table public.products
  drop constraint if exists products_proof_is_array;
alter table public.products
  add constraint products_proof_is_array
  check (jsonb_typeof(proof) = 'array');

create unique index if not exists products_slug_key
  on public.products (slug)
  where slug is not null;

comment on column public.products.slug is
  'URL segment for /portfolio/[division]/[slug]. Lowercase kebab-case, unique.';
comment on column public.products.case_study_en is
  'Case study body (EN). Light markdown: ## headings, - lists, **bold**, [links](https://…).';
comment on column public.products.case_study_es is
  'Case study body (ES). Same format as case_study_en.';
comment on column public.products.proof is
  'Array of {label, url?, chain?, address?}: onchain contracts, archived decks, press. The permanent evidence of the work.';
comment on column public.products.gallery is
  'Screenshot URLs (Supabase Storage). Take them before a project''s hosting or database is shut down.';
