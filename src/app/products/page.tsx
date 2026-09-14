import { permanentRedirect } from 'next/navigation'

/**
 * /products was the single page that held products, client work and
 * experiments. It is now four divisions under /portfolio — keep the old
 * URL alive for anything already linking to it.
 */
export default function ProductsPage(): never {
  permanentRedirect('/portfolio')
}
