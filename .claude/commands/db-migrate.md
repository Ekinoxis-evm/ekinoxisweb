---
description: Write a Supabase migration for the products registry (and friends), then apply it deliberately.
argument-hint: "<short_snake_case_name>"
---

Create a migration named `$ARGUMENTS`.

1. Read `.claude/rules/data-model.md`. If the decision isn't documented there, add it there first.
2. List `supabase/migrations/` and use the next `YYYYMMDDHHMMSS_` prefix. Never edit an applied file.
3. Enum additions go in their own file, before the data update that uses them.
4. New table: RLS on, policies in the same file, indexes on FKs and filter columns.
5. Update `src/lib/supabase/types.ts` (generate with the Supabase MCP, or hand-edit and say so), then `npx tsc --noEmit`.
6. Applying to project `xaxwqvyieqchydckdtov` is a **separate, confirmed step** (`apply_migration`). Show the SQL and ask first. Verify with a `select` afterwards.
