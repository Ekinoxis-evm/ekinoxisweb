# Ekinoxis — Typography

Three faces, three jobs. All free on Google Fonts.

## Faces
| Face | Role | Weights |
|---|---|---|
| [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | Headlines, wordmark, labels, buttons | 300–700 |
| [Inter](https://fonts.google.com/specimen/Inter) | Body copy | 300–700 |
| [Space Mono](https://fonts.google.com/specimen/Space+Mono) | Metadata, UIDs, code, terminal | 400, 700 |

## Embed
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## Rules
- Headlines: Space Grotesk 700, UPPERCASE, tracking −0.04em, line-height 0.9
- Wordmark: Space Grotesk — 700 for EKINOXIS, 300 for the [ ] brackets
- Body: Inter 300 (light), line-height 1.65
- Metadata: Space Mono 400, 10px, UPPERCASE, tracking +0.2em
- Numbers: always tabular (`font-variant-numeric: tabular-nums`)

## Scale (1920 reference)
| Style | Size |
|---|---|
| Display | clamp(3rem, 7vw, 8rem) |
| H1 | clamp(2.5rem, 5vw, 4.5rem) |
| H2 | 2rem |
| H3 | 1.5rem |
| Body | 1rem (lg: 1.125rem) |
| Small | 0.875rem |
| Mono meta | 0.625rem |
| UID badge | 0.5rem |
