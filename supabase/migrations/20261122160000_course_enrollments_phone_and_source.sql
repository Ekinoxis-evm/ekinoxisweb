-- Buyers' phone (Stripe collects it at checkout) and the attribution string the landing sends as
-- client_reference_id («<utm_campaign|landing>-<button>»). Both nullable: older rows and other
-- products may not have them. RLS unchanged: the table is written only by the webhook (service role).
alter table public.course_enrollments
  add column if not exists phone text,
  add column if not exists client_reference_id text;
