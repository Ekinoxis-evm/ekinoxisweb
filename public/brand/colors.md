# Ekinoxis colours

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
