---
name: Ekinoxis Labs
description: Innovation Without Frontiers — a dark lab where a line of cyan light settles across the page.
colors:
  void: "#000000"
  obsidian: "#060f16"
  deep-tide: "#09151c"
  tide: "#0f1b23"
  raised-tide: "#14212a"
  high-tide: "#192731"
  first-light: "#e8f2fb"
  mist: "#a2acb5"
  slate-label: "#8a949c"
  hairline: "#3f4951"
  equinox-cyan: "#8ff5ff"
  equinox-cyan-deep: "#00deec"
  ink-on-cyan: "#005d63"
  cosmic-blue: "#9492ff"
  signal-lime: "#beee00"
  alert-coral: "#ff716c"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3rem, 9vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
  label-sm:
    fontFamily: "Space Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.15em"
  label-lg:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0.05em"
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0px"
  full: "9999px"
spacing:
  hairline: "1px"
  gutter: "24px"
  card: "24px"
  card-lg: "40px"
  section: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.equinox-cyan}"
    textColor: "{colors.ink-on-cyan}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.equinox-cyan-deep}"
    textColor: "{colors.ink-on-cyan}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.equinox-cyan}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-ghost-hover:
    backgroundColor: "{colors.equinox-cyan}"
    textColor: "{colors.void}"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.equinox-cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  badge-muted:
    backgroundColor: "transparent"
    textColor: "{colors.slate-label}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  card:
    backgroundColor: "{colors.deep-tide}"
    textColor: "{colors.first-light}"
    rounded: "{rounded.none}"
    padding: "{spacing.card-lg}"
  card-hover:
    backgroundColor: "{colors.tide}"
  input:
    backgroundColor: "{colors.raised-tide}"
    textColor: "{colors.first-light}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
---

# Design System: Ekinoxis Labs

## Overview

**Creative North Star: "The Ekinox Lab"**

Ekinoxis takes its name from the equinox, the moment light and dark stand in balance.
The site is that moment, built as a lab: a near-black ground (the dark before), one
line of Equinox Cyan light running through it (the technology), and everything on the
page *settling into the light* as it arrives. Imagery follows the same rule: a dark
half and a lit half, cyan light, no text, no logos, no faces.

The lab part is precision, not noise. Sharp corners, hairline grid gaps, a single
monospaced label per section, prices and steps stated plainly. The terminal heritage
(the old "Obsidian Architect" system) survives as a touch, mono labels and one badge,
never as fake UIDs, glitch effects or console chatter. It reads as high-end and
calm: glow is earned by the one action that matters on screen, usually *Book a free
call*.

It must work first on a phone, in English and in Spanish, for a business owner who
decides in minutes. Ambition shows as clarity and craft, not as decoration.

**Key Characteristics:**
- Near-black tonal layers, never flat grey; depth by surface shift, not shadow.
- One cyan line of light per composition: the hero horizon, the step line, the active
  tab marker, the primary button.
- 0px corners everywhere; pills (`rounded-full`) only for dots and nodes.
- Space Grotesk headlines set huge and tight against tiny mono labels.
- Motion on one curve, *Settle*: fast out, long soft landing.

## Colors

A night palette with one source of light: deep blue-black tides, a cold electric
cyan, and two rare signal colours.

### Primary
- **Equinox Cyan**: the light. Primary buttons, active states, links, the step line,
  the glow under the action that matters. Text in cyan is reserved for short emphasis
  (a word in a headline, a label), never paragraphs.
- **Equinox Cyan Deep**: hover state of the primary button only.
- **Ink on Cyan**: text set on a cyan fill (primary button label).

### Secondary
- **Cosmic Blue**: secondary links and the "who it's for" labels in explainers. Used
  sparingly; it never competes with cyan for the action.

### Tertiary
- **Signal Lime**: arrival and success. The goal step of a diagram ("Until it fits",
  "Ready in 5 days", "You go live"), confirmations, and "what you leave with" labels.

### Neutral
- **Void**: page ground under the hero, logo bands and full-bleed sections.
- **Obsidian**: the body background.
- **Deep Tide → High Tide**: the four surface steps. Cards sit on Deep Tide, hover to
  Tide, raised panels and inputs use Raised Tide, popovers High Tide.
- **First Light**: headlines and primary text.
- **Mist**: body copy and descriptions.
- **Slate Label**: mono labels, metadata, muted badges. It is the faintest colour text
  may use (passes 4.5:1 on every surface).
- **Hairline**: ghost borders and dividers drawn as 1px grid gaps.
- **Alert Coral**: errors only.

### Named Rules
**The One Light Rule.** Each screen has one cyan focal point: the primary action or the
line that leads to it. If two things glow, one of them is wrong.

**The Full-Strength Text Rule.** Text never uses an opacity step of a colour
(`text-outline/60`, `/70`…). Faded text fails contrast on the dark ground. Use Slate
Label at full strength; only disabled controls may go fainter.

**The Lime Means Arrival Rule.** Signal Lime marks an end state: done, live, the goal.
It is never decoration and never a second call to action.

## Typography

**Display Font:** Space Grotesk (with sans-serif)
**Body Font:** Inter (with sans-serif)
**Label/Mono Font:** Space Mono (with monospace)

**Character:** A wide, engineered grotesk shouting in giant tight headlines, a neutral
Inter carrying the explanation, and a small typewriter mono labelling everything like
a lab bench. The tension between huge and tiny is the signature.

### Hierarchy
- **Display** (700, 3rem→8rem, 0.9): page titles and the hero slogan, often uppercase,
  one cyan italic word at most ("WITHOUT").
- **Headline** (700, 1.875rem→3rem, 0.95): section titles.
- **Title** (700, 1.125rem–1.5rem, 1.1): card and step titles, button labels (uppercase,
  widest tracking).
- **Body** (400, 1rem–1.125rem, 1.625): descriptions; keep lines under ~65ch
  (`max-w-xl` / `max-w-2xl`).
- **Label** (400, 12px, 0.1em, uppercase): eyebrows, metadata, chips, badge text.
- **Label Small** (400, 11px, 0.15em, uppercase, mono): badges and tiny captions only (the floor).
- **Label Large** (500, 13px, uppercase, Space Grotesk): list items in pricing cards, sidebar and
  dense feature lists.
- **Body Small** (400, 15px, 1.6): card and popup descriptions where 18px is too loose.

### Named Rules
**The 11px Floor Rule.** Nothing on the site is smaller than 11px, and 11px is for
badges only. Running labels are 12px. 9–10px was unreadable on the dark ground.

**The Plain Headline Rule.** Headlines say what the visitor gets, in plain words; the
technical term goes in a label or subtitle underneath.

## Layout

A single container (`max-w-screen-2xl`, 24px side gutter) holds most content; logo
bands, the team band and the hero break out full-bleed. Sections breathe at 64px on
phones and 96px on laptops. Cards pad 24px on phones and 40px on laptops.

Grids are drawn with 1px gaps over a faint cyan field (`gap-px bg-primary/10`): the
gap is the border. Content collapses to one column on phones; two or three columns
from `md`/`lg`. Step diagrams run horizontally on a line at `lg` and fall to a vertical
line on phones, with the loop ring placed inside its step.

The layout must be complete at 375, 390 and 430px with no sideways scroll and no
empty holes; flex columns of badges align to the start so a badge never stretches.

## Elevation & Depth

Flat by default. Depth comes from tonal surface steps (Deep Tide → High Tide) and from
light, not shadow. Floating elements (the header, menus, the booking popup) use glass:
a translucent dark surface with a heavy backdrop blur. The only "shadows" are cyan or
lime glows.

### Shadow Vocabulary
- **Action glow** (`box-shadow: 0 0 30px rgba(143,245,255,0.4)`): primary button hover.
- **Ambient glow** (`box-shadow: 0 0 20px rgba(143,245,255,0.2)`): an active node,
  icon tile or focused card.
- **Arrival glow** (`box-shadow: 0 0 20px rgba(190,238,0,0.25)`): the goal node.
- **Popup halo** (`box-shadow: 0 0 60px rgba(143,245,255,0.12)`): modals.

### Named Rules
**The No-Drop-Shadow Rule.** No dark drop shadows anywhere. If something must lift, it
changes surface tone or catches light.

## Shapes

Hard 0px corners on every surface, button, input, card, badge and image. The only
round forms are functional: step nodes, status dots, the loop ring and avatar-free
pills (`rounded-full`). Borders are hairlines (1px) at low opacity; a hover may
strengthen a border to cyan, never thicken it.

## Components

### Buttons
Precise and calm; the primary one is the brightest thing on the screen.
- **Shape:** square corners (0px).
- **Primary:** Equinox Cyan fill, Ink on Cyan label, Space Grotesk bold uppercase with
  widest tracking; sizes sm / md / lg (lg 16px × 32px).
- **Hover / Focus:** deepens to Equinox Cyan Deep and picks up the action glow; press
  scales to 0.95. Focus shows a visible 2px cyan outline.
- **Ghost:** transparent with a faint cyan hairline and cyan label; fills cyan with a
  Void label on hover. Used for the second action ("See our work").
- **Secondary / Tertiary / Outline:** the same ghost shape in Cosmic Blue, Signal Lime
  or Slate; use rarely.
- **Touch size:** at least 44px tall on phones; full width on phones for the main CTA.

### Chips
- **Style:** Space Mono 12px uppercase in Mist, hairline cyan border, faint Deep Tide
  fill. Used for "what's included" and "what we build" rows under a page title.
- **State:** static; chips are facts, not filters.

### Badges (ScanBadge)
- **Style:** Space Mono 11px uppercase, wide tracking, 1px border tinted to the text
  colour; variants cyan, blue, lime, slate (muted), coral.
- **Rule:** one badge per section, carrying a real label (Pricing, How we build, Day 5),
  never a fake system ID.

### Cards / Containers
- **Corner Style:** 0px.
- **Background:** Deep Tide, hover to Tide over 500ms.
- **Shadow Strategy:** none at rest (see Elevation).
- **Border:** none; the 1px grid gap draws it. Interactive cards may show a cyan
  gradient line along the bottom edge on hover.
- **Internal Padding:** 24px phone / 40px laptop.

### Inputs / Fields
- **Style:** Raised Tide fill, Hairline border, 0px corners, Inter 16px (no zoom on
  iOS), 12px × 16px padding; Slate Label 12px mono label above.
- **Focus:** border warms to cyan.
- **Error / Disabled:** Alert Coral message under the field; taken time slots are
  struck through and faded (the one place faded text is allowed).

### Navigation
- **Style:** fixed glass header (black 80%, heavy blur), Space Grotesk uppercase links in
  Mist; active link in cyan with a 2px cyan underline. Dropdowns are High Tide glass.
- **Mobile:** hamburger opens a full-width glass panel; a fixed bottom bar carries
  *Book a free call* on every public page.

### Signature: the Light Line and the Loop
Process diagrams (consultation funnel, how we build, how websites work) draw steps as
nodes on one horizontal cyan line that warms to lime at the goal. The back-and-forth
stage is a ring of four arrowed beats sitting *on* the line, with a pulse travelling it
and the goal phrase in lime at its centre. On phones the line turns vertical.

### Signature: Logo and Team Bands
Full-bleed marquees of original logos (or team faces) sliding sideways on two identical
halves; they pause on hover, fade at both edges into Void, and wrap into a static row
under reduced motion. Logos link to their sites; faces open a profile popup.

## Do's and Don'ts

### Do:
- **Do** keep every text colour at full strength; Slate Label (#8a949c) is the floor for
  text (≥4.5:1 on every surface).
- **Do** reveal above-the-fold headers with the CSS `.rise` class so they paint with the
  first frame; use Framer `whileInView` only for content below the fold.
- **Do** use the Settle curve (`cubic-bezier(0.16, 1, 0.3, 1)`, `EASE_SETTLE` /
  `--ease-settle`) for every reveal and transition, and turn motion off under
  `prefers-reduced-motion`.
- **Do** draw grid borders with `gap-px bg-primary/10`, not `border` lines.
- **Do** give images an empty alt when the name is printed beside them.
- **Do** keep one primary action per screen and route every booking button to the
  booking popup.
- **Do** keep tap targets ≥44px and the main CTA full width on phones.

### Don't:
- **Don't** use `rounded-sm` through `rounded-3xl`; corners are 0px, pills only for dots
  and nodes.
- **Don't** use dark drop shadows; use surface steps or a cyan glow.
- **Don't** fade text with opacity steps (`text-outline/40–70`); it fails contrast.
- **Don't** set text below 11px (glyph arrows and calendar captions included), or running labels below 12px.
- **Don't** add fake terminal chrome: system UIDs, glitch flicker, console prompts.
- **Don't** start above-the-fold content at `opacity: 0` in JavaScript; it delays the
  first paint until hydration.
- **Don't** let a badge stretch full width in a stacked flex column (`items-start`).
- **Don't** use `cyber-blue` / `cyber-purple` aliases in new code.
