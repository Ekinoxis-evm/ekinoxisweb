import { createClient } from './server'
import type {
  Hacker,
  Hackathon,
  HackathonWithStatus,
  ProductWithRelations,
  EducationPartner,
  CertificationPartner,
} from './types'

// ============================================
// PRODUCTS
// ============================================
export async function getProducts(): Promise<ProductWithRelations[]> {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      hackathon:hackathons(*),
      product_hackers(hacker_id)
    `)
    .order('display_order', { ascending: true })

  if (error || !products) return []

  // Fetch all hackers for the products in one query
  const hackerIds = Array.from(new Set(
    products.flatMap((p) => (p.product_hackers as { hacker_id: string }[]).map((ph) => ph.hacker_id))
  ))

  let hackerMap: Record<string, Hacker> = {}
  if (hackerIds.length > 0) {
    const { data: hackers } = await supabase
      .from('hackers')
      .select('*')
      .in('id', hackerIds)

    if (hackers) {
      hackerMap = Object.fromEntries(hackers.map((h) => [h.id, h]))
    }
  }

  return products.map((p) => ({
    ...p,
    hackathon: (p.hackathon as Hackathon | null) ?? null,
    hackers: (p.product_hackers as { hacker_id: string }[])
      .map((ph) => hackerMap[ph.hacker_id])
      .filter(Boolean),
  }))
}

async function getProductById(id: string): Promise<ProductWithRelations | null> {
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select(`*, hackathon:hackathons(*), product_hackers(hacker_id)`)
    .eq('id', id)
    .single()

  if (error || !product) return null

  const hackerIds = (product.product_hackers as { hacker_id: string }[]).map((ph) => ph.hacker_id)
  let hackers: Hacker[] = []
  if (hackerIds.length > 0) {
    const { data } = await supabase.from('hackers').select('*').in('id', hackerIds)
    hackers = data ?? []
  }

  return {
    ...product,
    hackathon: (product.hackathon as Hackathon | null) ?? null,
    hackers,
  }
}

/** A portfolio row by its case-study slug, or null when there is none. */
export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('id').eq('slug', slug).maybeSingle()
  return data ? getProductById(data.id) : null
}

// ============================================
// HACKERS
// ============================================
export async function getHackers(): Promise<Hacker[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hackers')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) return []
  return data ?? []
}

// ============================================
// HACKATHONS
// ============================================
export async function getHackathons(): Promise<HackathonWithStatus[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hackathons')
    .select('*')
    .order('start_date', { ascending: false })
  if (error || !data) return []

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return data.map((h) => {
    const start = h.start_date ? new Date(h.start_date) : null
    const end = h.end_date ? new Date(h.end_date) : null

    let hackathonStatus: HackathonWithStatus['hackathonStatus'] = 'past'
    if (start && start > today) {
      hackathonStatus = 'incoming'
    } else if (start && end && start <= today && end >= today) {
      hackathonStatus = 'ongoing'
    }

    return { ...h, hackathonStatus }
  })
}

// ============================================
// EDUCATION PARTNERS
// ============================================
export async function getEducationPartners(): Promise<{
  universities: EducationPartner[]
  government: EducationPartner[]
}> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('education_partners')
    .select('*')
    .order('display_order', { ascending: true })
  if (error || !data) return { universities: [], government: [] }

  return {
    universities: data.filter((p) => p.partner_type === 'university'),
    government: data.filter((p) => p.partner_type === 'government'),
  }
}

// ============================================
// CERTIFICATION PARTNERS
// ============================================
export async function getCertificationPartners(): Promise<CertificationPartner[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('certification_partners')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) return []
  return data ?? []
}
