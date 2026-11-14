# Design rules

> Universal — brand-independent. Brand lives in `DESIGN.md`; audience and tone in
> `PRODUCT.md` (both written by Impeccable: `/impeccable init`, `/impeccable document`).
> Source: `_brain/packs/design/`. Edit there, not here, unless the rule is repo-specific.

## Before any UI work

1. Read `DESIGN.md` and `PRODUCT.md`. If either is missing, stop and say so — don't invent a brand.
2. Check the repo's **mode** in `CLAUDE.md` (`## Design`): **operational** or **brand** (Impeccable calls these *Operate* and *Persuade*;
   its *Read* and *Experience* registers map to brand unless `PRODUCT.md` says otherwise).
3. If a Figma frame is named, read it (`get_design_context`) before writing code.

## Tokens — one direction of truth

Figma variables → `DESIGN.md` → code (CSS variables / Tailwind theme). Never backwards,
never edited in two places.

- **No hardcoded values** in components: no hex/rgb, no arbitrary Tailwind (`p-[13px]`,
  `text-[#999]`), no inline `style` for color/spacing/radius. Use the theme.
- Need a value that doesn't exist? Don't add it in code. Say so: it goes into Figma
  variables, then `DESIGN.md`, then the theme — in that order, in the same PR.

## Spacing, type, motion

- Spacing on the 4px grid; prefer the 8px steps (8/16/24/32/48/64). Density comes from
  fewer steps, not smaller ones.
- Type scale from `DESIGN.md` only. Max two families. Body ≥ 16px on mobile.
- Motion durations: 100–150ms micro (hover, press) · 200–250ms small (dropdown, toast) ·
  300–400ms large (modal, page). Exits faster than entrances. Ease-out for enter,
  ease-in for exit; never `linear` for UI movement.
- Animate `transform` and `opacity` only. No layout properties.

## Accessibility minimums (not negotiable)

- Contrast: 4.5:1 body text, 3:1 large text (≥ 24px / 18.66px bold) and UI boundaries/icons.
- Tap targets ≥ 44×44px — pad the hit area if the visual is smaller.
- `prefers-reduced-motion: reduce` → no movement; keep opacity fades ≤ 150ms or none.
- Every interactive element keyboard-reachable with a visible focus ring. Never `outline: none` without a replacement.
- Never color alone to carry meaning (status, errors) — pair with text or icon.
- Form inputs have labels (visible, or `aria-label` with reason).

## Modes

| | Operational = Impeccable *Operate* (dashboards, terminals, admin) | Brand = Impeccable *Persuade* (marketing sites, launches) |
|---|---|---|
| First priority | Speed, density, legibility | Expression, first impression |
| Motion | Feedback only (≤ 200ms); nothing decorative | Allowed to tell a story — still reduced-motion safe |
| Type | Tabular numbers for figures; compact scale | Display sizes allowed |
| Color | Neutral base; color = status/meaning | Brand color carries the page |

## Build order

Components before pages. A page is composition only — if a page needs a style a
component doesn't offer, change the component.

## Definition of done (a screen)

- [ ] Brief exists (who, single primary action, success) — top of the PR description
- [ ] Only tokens; no hardcoded values (`node design/detect-gate.mjs` passes)
- [ ] `/impeccable critique` and `/impeccable audit` run; findings fixed or noted with reason
- [ ] `review-animations` run if anything moves
- [ ] Checked at 390px wide, with reduced motion on, and with keyboard only
- [ ] Empty, loading, error and long-content states exist (`break-ui` helps)
- [ ] New pattern or token → added to `DESIGN.md` in the same PR
- [ ] Correction rounds logged in `design/log.md`

## The learning rule

When the user corrects the same thing **twice**, add it to `DESIGN.md` → `## Do's and Don'ts`
as a one-line rule, in the same session, and tell the user you did. That list is the
memory that stops repeat mistakes — keep it specific ("Don't use gradients on cards"),
not vague ("Keep it clean").
