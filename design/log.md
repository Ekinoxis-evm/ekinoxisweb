# Design log

Two numbers per repo (see `_brain/packs/design/README.md` §Metrics). Newest first.

## Detector

| Date | Total findings | Δ vs last | Note |
|---|---:|---:|---|
| 2026-11-14 | 6 | — | baseline frozen (email template fonts in `src/lib/notify.ts`; intentional) |

## Correction rounds per screen

Rounds = how many times you sent the agent back before accepting. If this isn't
trending down, DESIGN.md is missing rules — check the repeats column.

| Date | Screen / feature | Rounds | Repeated correction → rule added to DESIGN.md? |
|---|---|---:|---|
| | | | |
| 2026-11-24 | Site-wide surfaces | 1 | Blue-black surfaces → neutral graphite; Don't added |
| 2026-11-24 | Theme source | 0 | Tailwind colours now read from @ekinoxis/brand v0.1.1 (preset + aliases); compiled CSS byte-identical before/after |
