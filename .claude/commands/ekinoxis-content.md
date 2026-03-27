# Ekinoxis — Content Editing Guide

Use this when editing `src/lib/content.ts` or adding any visible text to the codebase.

---

## Golden Rule

**Every string visible to the user MUST exist in both `en` and `es`.**

Never hardcode text in JSX. Always add it to `content.ts` first, then reference it via `t.yourKey`.

```tsx
// ❌ WRONG
<h1>Our Products</h1>

// ✅ RIGHT
<h1>{t.products.title}</h1>
```

---

## File Structure

`src/lib/content.ts` is ~11,700 lines. Top-level shape:

```ts
export const content = {
  en: {
    nav: { ... },
    hero: { ... },
    culture: { ... },
    hackers: { ... },
    products: { ... },
    services: { ... },
    technologies: { ... },
    education: { ... },
    certifications: { ... },
    hackerHouse: { ... },
    research: { ... },
    footer: { ... },
    socials: { ... },
  },
  es: {
    // Mirror of en — every key must exist here too
  }
}
```

Usage pattern in every page:

```tsx
const { language } = useLanguage();
const t = content[language].sectionName;
```

---

## Data Shapes

### `products.showcase.items[]`

```ts
{
  name: string;
  image: string;          // path relative to /public/
  description: string;
  website: string;        // full URL or '#'
  github: string;         // full URL or '#'
  hackathon: string;      // hackathon name
  hackathonLink: string;  // full URL or '#'
  technologies: string[]; // display names
  categories: string[];   // e.g. ['DeFi', 'Wallet']
}
```

### `hackers.members[]`

```ts
{
  name: string;
  image: string;    // path relative to /public/hackers/
  profile: string;  // short bio
  university: string;
  github: string;   // full URL
  linkedin: string; // full URL
  x: string;        // full URL
}
```

### `technologies.categories.<key>`

```ts
{
  label: string;
  logos: {
    name: string;
    src: string;  // path relative to /public/tecnologies/<Category>/
  }[];
}
```

### `education.universities[]`

```ts
{
  name: string;
  logo: string;  // path relative to /public/education/universities/
  url: string;
}
```

### `services.tiers[]`

```ts
{
  id: string;          // e.g. 'consultation'
  title: string;
  subtitle: string;
  priceRange: string;  // e.g. '$50 – $2,500'
  description: string;
  href: string;        // internal route
}
```

---

## How to Add Content

### New product
1. Add image → `/public/products/`
2. Add object to `en.products.showcase.items[]` with all 9 fields
3. Copy and translate to `es.products.showcase.items[]` (same index position)

### New team member
1. Add photo → `/public/hackers/`
2. Add object to `en.hackers.members[]`
3. Copy and translate to `es.hackers.members[]`

### New nav label
1. Add key to `en.nav.yourLabel` and `es.nav.yourLabel`
2. Reference in `Navigation.tsx` as `t.nav.yourLabel`

### New page section
1. Add full object under `en.yourSection`
2. Mirror it under `es.yourSection` — same keys, translated values
3. Import in page: `const t = content[language].yourSection`

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Adding key to `en` but forgetting `es` | Always add both in the same edit |
| Hardcoding text in JSX | Move it to content.ts first |
| Different key names in `en` vs `es` | Keys must be identical — only values translate |
| Array items in different order | Keep same index order in both languages |
| Missing image path leading `/` | Image paths stored in content.ts should match what's in `/public/` |
