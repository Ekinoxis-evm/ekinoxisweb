# Code style — ekinoxisweb

## Language is the URL
- English at bare paths, Spanish under `/es`. Pages live in `src/app/(site)/[lang]/`.
- Internal links go through `@/components/LocalizedLink` with bare hrefs. Never write `/es/...`.
- Metadata goes through `pageMetadata(langOf(params), path, …)` so every page carries canonical + hreflang.

## Text
- Static UI text lives in `src/lib/content.ts`, always `en` **and** `es`. Never hardcode text in JSX.
- DB text uses `_en` / `_es` columns.
- Every string adds new value. Never repeat a message across or within pages (`DESIGN.md` Don'ts).

## Components
- Server Components for data pages (`page.tsx`, `revalidate = 60`) + a `*Client.tsx` that receives data as props.
- `'use client'` only for Framer Motion, context or state.
- Supabase Storage images: `<Image unoptimized={src.startsWith('http')} />`.
- Admin mutation routes call `revalidatePath` for both `/route` and `/es/route`. Never `revalidateTag`.

## TypeScript
- `strict`. No `any`; `unknown` and narrow. DB types in `src/lib/supabase/types.ts`.
- Data access only through `src/lib/supabase/queries.ts` (public) or `requireAdmin()` (admin).

## Dead code
- Delete, don't comment out. No unused exports, components or dependencies; git has the history.
- Docs for removed things are removed in the same change.

## Comments
- Default none. Write one only for a non-obvious *why*.
