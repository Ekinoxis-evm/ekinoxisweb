#!/usr/bin/env bash
# PostToolUse(Edit|Write): typecheck only when a TS/TSX file was edited, so a broken edit shows up
# immediately instead of at build time. Silent otherwise; 45s budget, never blocks.
set -u
input=$(cat)
file=$(printf '%s' "$input" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))
except Exception: print("")' 2>/dev/null)
case "$file" in *.ts|*.tsx) ;; *) exit 0 ;; esac
[ -f tsconfig.json ] || exit 0
npx --no-install tsc --noEmit --pretty false 2>&1 | head -20
exit 0
