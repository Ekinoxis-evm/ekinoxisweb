#!/usr/bin/env bash
# PreToolUse(Bash): refuse to run anything while STAGED content looks like a private key.
#
# Parse-free by design (copied from auktrafi after a real deploy key landed in a tracked
# .env.backup): rather than inspect the pending command, it checks whether the index
# currently holds a 64-hex key or a PEM block. If so, every Bash call is blocked until it
# is unstaged — so a key physically cannot be committed by any path (add+commit, amend,
# a script, a hook). Near-zero false positives: placeholders never match.
set -uo pipefail
cat >/dev/null 2>&1 || true   # drain hook JSON; not needed

root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
git -C "$root" diff --cached --quiet 2>/dev/null && exit 0
added=$(git -C "$root" diff --cached -U0 --no-color 2>/dev/null | grep '^+' | grep -v '^+++' || true)
if printf '%s' "$added" | grep -Eiq '(^|[^0-9a-fA-F])(0x)?[0-9a-fA-F]{64}([^0-9a-fA-F]|$)|-----BEGIN[[:space:]]+[A-Z ]*PRIVATE[[:space:]]+KEY-----|(^|[^A-Za-z0-9_])(sk_live|rk_live)_[A-Za-z0-9]{20,}'; then
  echo "secret-scan: staged content in $root looks like it contains a private key or live secret. Bash blocked until it is unstaged." >&2
  echo "Move the value to a gitignored .env.local (or a secrets manager), then: git restore --staged <file>" >&2
  exit 2
fi
exit 0
