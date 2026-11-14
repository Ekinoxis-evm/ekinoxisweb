#!/usr/bin/env bash
# PreToolUse(Bash): block any shell command that would print or copy a real env file.
#
# The permission `deny` rules in settings.json cover Read() and `cat .env`; this catches
# the rest — `less`, `head`, `source`, `cp .env.local /tmp`, `grep KEY .env`, `printenv`
# redirected into a file, etc. `.env.example` is always allowed: it holds no values.
#
# Exit 2 = block with the message on stderr (shown to Claude). Exit 0 = allow.
set -uo pipefail
input=$(cat)
cmd=$(printf '%s' "$input" | python3 -c 'import json,sys
try: print(json.load(sys.stdin).get("tool_input",{}).get("command",""))
except Exception: print("")' 2>/dev/null)
[ -z "$cmd" ] && exit 0

# Strip every ".env.example" / ".env.sample" mention, then look for what is left.
stripped=$(printf '%s' "$cmd" | sed -E 's/\.env\.(example|sample)//g')
if printf '%s' "$stripped" | grep -Eq '(^|[^A-Za-z0-9_])\.env([./][A-Za-z0-9_.-]*)?([^A-Za-z0-9_]|$)'; then
  # Allow commands that only *write* or *list* the file without reading it.
  if printf '%s' "$cmd" | grep -Eq '^(ls|test|stat|touch|rm|chmod|wc -l)[[:space:]]'; then exit 0; fi
  # Sanctioned writes: seeding .env.local from the example, and pulling from Vercel.
  if printf '%s' "$cmd" | grep -Eq '^cp[[:space:]]+\.env\.example[[:space:]]+\.env'; then exit 0; fi
  if printf '%s' "$cmd" | grep -Eq '^(pnpm |npx )?vercel env pull'; then exit 0; fi
  echo "guard-env: this command would read a real env file. Reference variable NAMES only (see .env.example); never read values." >&2
  exit 2
fi
if printf '%s' "$cmd" | grep -Eq '(^|[[:space:];&|])(printenv|env)([[:space:]]*$|[[:space:]]*[|>])'; then
  echo "guard-env: dumping the environment is blocked — it prints every secret. Check one NAME with: test -n \"\$VAR\" && echo set" >&2
  exit 2
fi
exit 0
