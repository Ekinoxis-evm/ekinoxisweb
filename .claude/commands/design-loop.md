---
description: Run the design loop for one screen or feature — brief, explore, tokens, build, critique, polish, verify, sync
argument-hint: <screen or feature> [figma-url]
---

Run the design loop for: **$ARGUMENTS**

Follow `.claude/rules/design.md`. Stop at each ⏸ and wait for the user.

1. **Brief.** Write one paragraph: who uses this screen, its single primary action, what
   success looks like. Read `PRODUCT.md` first. ⏸ Confirm the brief.
2. **Explore.** If a Figma URL was given, read the frame. If not, ask whether to design it
   in Figma first or work from refs in `design/refs/`. Offer 2–3 directions, briefly. ⏸ Pick one.
3. **Tokens.** List any color/size/radius/type the direction needs that isn't in
   `DESIGN.md`. For each: Figma variable → `DESIGN.md` → theme, in that order. ⏸ Approve new tokens.
4. **Build.** Components first, then the page. Only tokens.
5. **Critique.** Run `/impeccable critique` and `/impeccable audit` on what you built;
   `review-animations` if anything moves. Report findings grouped by severity.
6. **Polish.** Run `/impeccable polish`; fix the critique findings.
7. **Verify.** `node design/detect-gate.mjs` must pass. Then tell the user exactly what to
   check by hand: 390px width, reduced motion, keyboard-only, contrast. ⏸ User accepts.
8. **Sync back.** New components → offer to push to Figma and link with Code Connect.
   New patterns → `DESIGN.md`. Log the correction rounds in `design/log.md`.
