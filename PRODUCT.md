# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: business owners and founders in Colombia and the USA** (SMEs, entrepreneurs,
local businesses going digital) who need a website, custom software, or advice on AI and
blockchain, and are deciding whether to book a free 30-minute call. They usually arrive
on a phone, from WhatsApp, Instagram, X or a direct link, and decide in minutes.

Secondary: developers and students (courses, hackathons, hacker house), universities and
government partners, and other builders checking who Ekinoxis is. They matter, but no
page should trade a business owner's clarity for them.

## Product Purpose

The public site of **Ekinoxis Labs**, the first innovation lab of the Colombian Pacific
(Cali, Valle del Cauca, with operations in Casper, Wyoming). It turns a visitor into a
booked call: every service page ends in the booking popup (date, hour, name, email,
WhatsApp), which sends a branded calendar email and a Telegram alert.

Success = qualified calls booked. Supporting goals: show the work is real (portfolio,
clients, places we have taught), and grow the community (courses, hackathons).

## Positioning

**A lab that ships.** Ekinoxis builds its own AI and blockchain products, teaches in
universities and hackathons, and builds for clients the same way: fast, at a fixed
price, directly with the founder. A normal dev agency cannot truthfully claim the
in-house products, the teaching record, or the Pacific-coast lab origin.

Slogan (leads everywhere): **Innovation Without Frontiers**. Supporting line: *We unlock
the power of frontier technologies like AI, blockchain and crypto.* Market wording is
always **Colombia & USA**, never just Florida.

## Operating Context

- Three paid services, each with its own page and price ladder:
  - **Consultation**: 5 topics; Session or Roadmap ($500–$2,500, 5–12 h in 3-hour
    sessions), Team Workshop, Monthly Advisor ($3,000, 16 h/month).
  - **Websites**: Online Business $1,500 / Professional $3,000 / Complete $6,000, live in
    5 days, fixed price, pay half to start.
  - **App building**: diagnostic → design and demo → rounds with the client until it
    fits (the SWRFM way of working); tiers in `content.ts → services.pricing`.
- Courses (`/courses`, registry in `src/lib/courses.ts`), Hacker House, Portfolio (four
  divisions), About (story, culture, team), Brand, Tech Stack, Education, Certifications.
- Content is edited by William through `/admin` (products, hackers, hackathons, partner
  logos) and in `src/lib/content.ts` for static copy.

## Capabilities and Constraints

- Next.js 14 App Router on Vercel; Supabase for data, storage and the admin login;
  Resend for booking email; Telegram bot for lead alerts. Pushing to `main` deploys
  production.
- **Bilingual EN/ES, both first-class.** Every static string lives in `content.ts` in
  both languages; database rows use `_en` / `_es` columns.
- **Phone first.** Most visitors are on phones; every layout must work at 375–430 px
  with no sideways scroll.
- Prices must agree across the four places they live (see CLAUDE.md, "Change service
  prices").

## Brand Commitments

- Name: Ekinoxis / Ekinoxis Labs. The name comes from *equinox*, the moment light and
  dark are in balance; technology moves people from the darker moments to the lighter
  ones. This meaning is part of the brand and lives on `/brand` and `/about`.
- **Plain language**: short sentences, jargon demoted to a subtitle, clear prices, one
  next step.
- Original partner and client logos only, linked to their sites.
- Generated imagery (Higgsfield) follows the "equinox" style: a dark half and a light
  half, cyan light, no text, logos or faces.

## Evidence on Hand

- Real clients and shipped work: CONVEXO, ETHCALI, SWRFM (Southwest Ranches Farmers
  Market), 1UP Esports, Apalancados, MGM Autobroker, and others in the `products` table
  (screenshots in `public/screens/`).
- Places taught and partners: universities and government (education partners table),
  hackathons, certification partners: all with original logos in `public/`.
- Team: the `hackers` table, with real photos and links.
- Home metrics are counted from the database, never typed in.
- **There are no client testimonials or reviews on hand.** Do not invent quotes,
  ratings, client counts, or results.

## Product Principles

1. **One next step.** Every page leads to booking the free call; nothing competes with it.
2. **Show, don't claim.** Real products, real logos, real numbers from the database or
   nothing at all.
3. **Plain before clever.** A business owner on a phone should understand the offer,
   the price and the timeline in one read, in English or Spanish.
4. **Lab, not agency.** Let the in-house products, teaching and Pacific origin carry the
   difference; it is what no competitor can copy.

## Accessibility & Inclusion

- WCAG AA contrast (4.5:1 body text, 3:1 large text), 44 px touch targets, visible focus,
  and `prefers-reduced-motion` respected by every animation (marquees wrap, reveals and
  the hero video stop).
- Spanish speakers are first-class users, not a translation afterthought.
