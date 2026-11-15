-- Traction numbers: a project earns its phase with these. Null = not measured yet.
alter table public.products
  add column if not exists users_count integer check (users_count >= 0),
  add column if not exists monthly_income_usd integer check (monthly_income_usd >= 0);

-- Phases and order as decided by the founder, 2026-11-14.
-- Live
update public.products set status = 'LAUNCHED', display_order = 1  where name = 'ETHCALI app';
-- Beta
update public.products set status = 'BETA', display_order = 20 where name = 'ORBIT';
update public.products set status = 'BETA', display_order = 21 where name = 'Apalancados';
update public.products set status = 'BETA', display_order = 22 where name = 'AUKTRAFI';
update public.products set status = 'BETA', display_order = 23 where name = 'ZBricks';
update public.products set display_order = 24 where name = 'The Guild';
update public.products set display_order = 25 where name = 'Ekinoxis Ads';
-- Alpha
update public.products set status = 'MVP', display_order = 10 where name = 'CONVEXO';
update public.products set status = 'MVP', display_order = 11 where name = 'P2PAI';
update public.products set status = 'MVP', display_order = 12 where name = 'KREDITOS';
update public.products set status = 'MVP', display_order = 13 where name = 'DOGI';
update public.products set status = 'MVP', display_order = 14 where name = 'Shopper Center';
update public.products set status = 'MVP', display_order = 15 where name = 'Cuadra';
-- Idea
update public.products set status = 'IDEA', display_order = 40 where name = 'Conservationix';
update public.products set status = 'IDEA', display_order = 41 where name = 'CARP2P / TCARS';
-- Clients
update public.products set status = 'BETA',     display_order = 30 where name = 'LIVE! Activewear';
update public.products set status = 'LAUNCHED', display_order = 31 where name = 'Southwest Ranches Farmers Market';
update public.products set status = 'LAUNCHED', display_order = 32 where name = '1UP Esports';
update public.products set status = 'MVP',      display_order = 33 where name = 'MGM Autobroker';
update public.products set status = 'MVP',      display_order = 34 where name = 'Talentum Corp';
