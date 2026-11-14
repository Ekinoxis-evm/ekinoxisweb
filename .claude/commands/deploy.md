---
description: Preflight then ship to production. Pushing to main deploys ekinoxis.xyz on Vercel.
argument-hint: "[commit message]"
---

Ship the working tree to production, in verified chunks.

1. `git status --porcelain` — list what will ship. Leave untracked tool output (`.impeccable/`) out.
2. `npx tsc --noEmit` and `npm run build`. Stop on the first failure and show the output.
3. If UI changed: `node design/detect-gate.mjs` must pass; check 390px and reduced motion.
4. If a migration is included, it is applied to production **before** the code ships (schema leads code). Ask before applying.
5. Commit with a conventional message (`$ARGUMENTS` if given), then ask: "Push to main (deploys production)?" Push only on yes.
6. After the deploy is up, check the changed routes once on prod. Space requests out: tight curl loops trigger a Vercel 403 challenge.
