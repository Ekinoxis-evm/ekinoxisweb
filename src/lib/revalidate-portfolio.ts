import { revalidatePath } from 'next/cache'
import { DIVISIONS } from '@/lib/portfolio'

/**
 * A product edit can change which division a row belongs to, so every
 * portfolio route has to be busted — not just the one it used to live in.
 */
export function revalidatePortfolio() {
  revalidatePath('/portfolio')
  for (const d of DIVISIONS) revalidatePath(`/portfolio/${d.slug}`)
  // Case-study pages: a slug can be added, renamed or removed in one save.
  revalidatePath('/portfolio/[division]/[slug]', 'page')
}
