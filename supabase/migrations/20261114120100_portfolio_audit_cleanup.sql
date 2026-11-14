-- Portfolio audit, 2026-11-14.
--
-- 1. Conservationix and CARP2P / TCARS have no running product: they are ideas.
-- 2. "experiment" and "poc" were legacy labels; phase now carries that meaning.
--    Everything that is not client work is a product.
-- 3. 1UP's two repos are private, so the public links 404. Clear them.

update public.products set status = 'IDEA'
 where name in ('Conservationix', 'CARP2P / TCARS');

update public.products set project_type = 'product'
 where project_type in ('experiment', 'poc');

update public.products set repo_frontend = null, repo_contracts = null
 where name = '1UP Esports';
