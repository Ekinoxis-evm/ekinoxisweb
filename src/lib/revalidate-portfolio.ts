import { revalidatePath } from 'next/cache'
import { DIVISIONS } from '@/lib/portfolio'
import { revalidatePublicPath } from '@/lib/revalidate'

/**
 * A product edit can change which division a row belongs to, so every
 * portfolio route has to be busted — not just the one it used to live in.
 * Each path is busted in both languages.
 */
export function revalidatePortfolio() {
  revalidatePublicPath('/portfolio')
  for (const d of DIVISIONS) revalidatePublicPath(`/portfolio/${d.slug}`)
  // Case-study pages: a slug can be added, renamed or removed in one save.
  revalidatePath('/(site)/[lang]/portfolio/[division]/[slug]', 'page')
}
