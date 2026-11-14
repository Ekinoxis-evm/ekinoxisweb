import { revalidatePath } from 'next/cache'
import { revalidatePublicPath } from '@/lib/revalidate'

/**
 * /portfolio is one page now (products + clients), plus the case-study
 * pages. Each path is busted in both languages.
 */
export function revalidatePortfolio() {
  revalidatePublicPath('/portfolio')
  // Case-study pages: a slug can be added, renamed or removed in one save.
  revalidatePath('/(site)/[lang]/portfolio/[division]/[slug]', 'page')
}
