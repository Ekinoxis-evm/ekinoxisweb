# Ekinoxis brand

The single source for the Ekinoxis brand: colors, type, corners, logos, fonts and imagery.
Every other copy (Figma, the claude.ai design system, each repo's `DESIGN.md`, `marketing/design-system`) is downstream of this repo. If a copy disagrees with this repo, the copy is wrong.

**Idea.** Ekinoxis comes from the equinox, the moment light and dark are equal. The brand is a near-black ground with one line of Equinox Cyan light running through it.

_From @ekinoxis/brand v0.1.5 (github.com/Ekinoxis-evm/brand). Do not edit this copy._

## Color

Dark only. Black is the canvas, and cyan is the one light.

| Token | Hex | Use |
|---|---|---|
| void | `#000000` | Canvas, lowest surface |
| obsidian | `#0a0a0a` | Page background |
| deep-tide | `#111111` | Cards |
| tide | `#171717` | Containers, card hover |
| raised-tide | `#1c1c1c` | Inputs |
| high-tide | `#242424` | Highest container |
| bright-tide | `#2a2a2a` | Brightest surface |
| first-light | `#ededed` | Main text (16.9:1) |
| mist | `#a3a3a3` | Secondary text (7.9:1) |
| slate-label | `#8f8f8f` | Labels. The dimmest color allowed for text (6.1:1) |
| hairline | `#3d3d3d` | 1px dividers. Never text |
| logo-ring | `#707070` | Logo ring only. Never text (4.2:1) |
| equinox-cyan | `#8ff5ff` | The one accent |
| equinox-cyan-deep | `#00deec` | Hover / pressed |
| equinox-cyan-on-light | `#00789e` | Logo on light backgrounds only |
| ink-on-cyan | `#005d63` | Text on cyan (6.1:1) |
| cosmic-blue | `#9492ff` | Secondary accent |
| signal-green | `#00ff41` | Matrix green. End states only: done, live, the goal |
| alert-coral | `#ff716c` | Errors, and the low step of a scale |
| signal-amber | `#ffd45c` | Warnings, and the middle step of a scale |
| chart-1…4 | `#c47524` `#0f98a6` `#7a9700` `#5585ff` | Charts |

Contrast ratios are measured on obsidian.

**Rules**
- **One light.** Each screen, slide or frame has one cyan focal point. If two things glow, one of them is wrong.
- **Full-strength text.** Never fade text with opacity. Use mist or slate-label at full strength.
- **Green means arrival.** Signal green marks an end state. It is never decoration. (`signal-lime` is a deprecated alias for it, and will be removed in v0.2.)
- **Status colors are signals, not accents.** Coral, amber and green only mean bad / good / excellent (or error / warning / done). Rating scales run coral → amber → green, like a traffic light. Always pair the color with a word, never color alone.

## Type

Three faces, each with one job. All are OFL-licensed and bundled in `fonts/`: woff2 for the web, plus static Space Grotesk TTFs in `fonts/static/` for Figma, desktop apps and the logo script.

| Face | Job |
|---|---|
| Space Grotesk 700 (300 for the wordmark's brackets) | Headlines, wordmark, buttons |
| Inter 400 | Body. Never 300 on black, because it blooms |
| Space Mono 400 | Labels, metadata, figures |

Scale: display `clamp(3rem, 9vw, 8rem)` / 0.9 / −0.05em · headline `clamp(1.875rem, 4vw, 3rem)` · title 1.5rem · body 1.125rem / 1.625 · label 12px mono +0.1em uppercase · label-sm 11px.
Nothing is smaller than 11px, and 11px is for badges only.

## Corners

**Square everywhere: 0px.** This covers web, reels, video covers, slides and print. `radius-full` is only for things that are circles by nature, such as avatars and status dots.

## Logo

The mark is a solid half-disc inside a thin ring, split by a vertical axis: light and dark in balance. The lockup is mark + `[ EKINOXIS ]`, with the brackets in cyan at weight 300.

Every logo comes in five tones, and each one ships as both an SVG and a PNG: `logos/{mark,horizontal,stacked,wordmark}/{svg,png}/ekinoxis-<family>-<tone>`.

| Tone | Use on | Colors |
|---|---|---|
| `cyan-on-black` | Anywhere (has its own black background) | ring `hairline`, disc and brackets cyan, type `first-light` |
| `cyan-transparent` | Dark backgrounds | same, no background |
| `cyan-on-light` | Light backgrounds | ring `logo-ring`, disc and brackets `equinox-cyan-on-light`, type black |
| `white` | Dark backgrounds, one color | ring `logo-ring`, everything else `first-light` |
| `black` | Light backgrounds, one color | ring `logo-ring`, everything else black |

- The text is converted to outlines, so the SVGs render the same everywhere with no font installed.
- The axis is a real gap, not a black line, so the mark works on any background.
- PNGs render the mark 512px tall.
- Every file includes clear space of a quarter of the mark's height. Don't recolor, stretch, outline or add effects.

**Regenerate.** All 40 files come from one script, `scripts/logos.mjs`, which uses the geometry of ekinoxis.xyz's `BrandLogo.tsx` and the colors in `tokens.json`. After a color change, run `npm i && npm run logos` (macOS with Chrome installed). Never edit a logo file by hand.

## Imagery

Two jobs, never mixed:

- **Message: cyan-lit objects on near-black** (`imagery/message/`: `metodo-*`, `control-*`). Use these for blocks that carry a point. One object, half in shadow, lit cyan from one side.
- **Mood: liquid backgrounds** (`imagery/mood/`: `metal`, `fog`, `horizon`, `horizon.mp4`). Use these as atmosphere only, behind a hero or section. They never carry a message.

Every image follows the same rules: a dark half and a lit half, cyan light, and no text, logos or faces.

## Voice

The same in Spanish and English.

- **Talk to the reader directly.** Use *tú* in Spanish and "you" in English: "Tus llaves, tu dinero" / "Your keys, your money". Never use *usted*, and never write in an impersonal voice ("Llaves propias.").
- **Sentence case.** Headlines, buttons and titles start with a capital and continue in lowercase: "Aprende a custodiar tus criptos".
- **ALL CAPS only for the few giant display lines** (the hero slogan, a cover title) and for mono labels and badges. Never for running headlines or paragraphs.
- **Plain words first.** A headline says what the reader gets. The technical term goes in a label or subtitle underneath.
