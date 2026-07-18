-- Adds project classification and suite sub-links to products.
-- project_type: 'product' (in-house IP) | 'client' (client work) | 'experiment' (lab prototypes)
-- sub_links: jsonb array of { label, url?, repo? } — used by umbrella cards (e.g. CONVEXO suite)

alter table public.products
  add column if not exists project_type text not null default 'product';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'products_project_type_check'
  ) then
    alter table public.products
      add constraint products_project_type_check
      check (project_type in ('product', 'client', 'experiment'));
  end if;
end $$;

alter table public.products
  add column if not exists sub_links jsonb not null default '[]'::jsonb;
