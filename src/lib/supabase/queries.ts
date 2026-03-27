import { createClient } from './server'
import type {
  Hacker,
  Hackathon,
  HackathonWithStatus,
  ProductWithRelations,
  EducationPartner,
  CertificationPartner,
  CultureValue,
  TechCategory,
  Service,
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

export async function getProductById(id: string): Promise<ProductWithRelations | null> {
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

export async function getHackerById(id: string): Promise<Hacker | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('hackers').select('*').eq('id', id).single()
  if (error) return null
  return data
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

export async function getHackathonById(id: string): Promise<Hackathon | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('hackathons').select('*').eq('id', id).single()
  if (error) return null
  return data
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

// ============================================
// CULTURE VALUES
// ============================================
export async function getCultureValues(): Promise<CultureValue[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('culture_values')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) return []
  return data ?? []
}

// ============================================
// TECH CATEGORIES
// ============================================
export async function getTechCategories(): Promise<TechCategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tech_categories')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) return []
  return data ?? []
}

// ============================================
// SERVICES
// ============================================
export async function getServices(): Promise<Service[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) return []
  return data ?? []
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

// ============================================
// SITE CONTENT
// ============================================
export async function getSiteContent(keys: string[]): Promise<Record<string, { en: string; es: string }>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .in('key', keys)
  if (error || !data) return {}

  return Object.fromEntries(
    data.map((row) => [row.key, { en: row.value_en, es: row.value_es }])
  )
}
