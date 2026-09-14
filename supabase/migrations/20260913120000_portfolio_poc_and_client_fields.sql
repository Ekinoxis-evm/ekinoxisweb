-- Portfolio restructure: four divisions instead of three.
--   product    — in-house IP (Convexo, ETHCALI, Apalancados)
--   experiment — lab builds shipped to a live URL
--   poc        — proofs of concept (hackathon builds, not maintained)   [NEW]
--   client     — paid client work, shown as logo + website + Instagram
--
-- Clients are presented differently from the other three: a logo wall, not
-- a spec card. logo_url holds a mark on a transparent background (image_url
-- keeps holding screenshots), and instagram holds the client's IG profile,
-- which for some clients is the only web presence they have.

alter table public.products
  drop constraint if exists products_project_type_check;

alter table public.products
  add constraint products_project_type_check
  check (project_type in ('product', 'client', 'experiment', 'poc'));

alter table public.products
  add column if not exists instagram text,
  add column if not exists logo_url text;

comment on column public.products.logo_url is
  'Client/brand mark on transparent background. Used by the clients division; image_url stays the product screenshot.';
comment on column public.products.instagram is
  'Full Instagram profile URL. Often the only web presence a client has.';
