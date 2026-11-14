-- Phase "Idea": a project with a real problem and no working product yet.
-- Enum values cannot be used in the transaction that adds them, so the rows
-- that move to IDEA are updated in the next migration.
alter type public.product_status add value if not exists 'IDEA' before 'MVP';
