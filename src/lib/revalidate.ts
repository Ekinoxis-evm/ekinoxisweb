import { revalidatePath } from 'next/cache';
import { LANGS, localizePath } from '@/lib/i18n';

/**
 * Bust the ISR cache for a public page in every language. Pages are cached at
 * their internal addresses (`/en/about`, `/es/about`), so `revalidatePath('/about')`
 * alone would miss both. Server-only: never import from the middleware.
 */
export function revalidatePublicPath(path: string) {
  for (const lang of LANGS) revalidatePath(lang === 'en' ? `/en${path === '/' ? '' : path}` : localizePath(path, lang));
}
