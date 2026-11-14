#!/usr/bin/env node
// Fail only on NEW design violations — existing ones are frozen in design/detect-baseline.json.
//
//   node design/detect-gate.mjs                  # compare against the baseline (CI)
//   node design/detect-gate.mjs --update         # re-freeze the baseline after fixing things
//   DETECT_PATHS="app components" node design/detect-gate.mjs
//
// Findings are keyed by antipattern + file, not line: lines shift on every edit, so a
// line-keyed baseline would fail every unrelated PR. A key's count going UP is a failure;
// going down is progress — run --update and commit the smaller baseline.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const IMPECCABLE = "impeccable@4.7.0"; // pinned: a detector upgrade must not silently fail every PR
const BASELINE = "design/detect-baseline.json";
const update = process.argv.includes("--update");
const paths = (process.env.DETECT_PATHS || "app components src lib")
  .split(/\s+/).filter((p) => p && existsSync(p));

if (!paths.length) { console.error("detect-gate: none of DETECT_PATHS exist"); process.exit(1); }

let raw;
try {
  raw = execFileSync("npx", ["-y", IMPECCABLE, "detect", "--json", "--no-advisory", ...paths],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 << 20 });
} catch (e) {
  if (e.status !== 2) { console.error("detect-gate: impeccable could not scan (exit %s)", e.status); process.exit(1); }
  raw = e.stdout; // exit 2 = findings present, stdout still holds the JSON
}

const counts = {};
for (const f of JSON.parse(raw || "[]")) {
  const key = `${f.antipattern} ${path.relative(process.cwd(), f.file)}`;
  counts[key] = (counts[key] || 0) + 1;
}
const total = Object.values(counts).reduce((a, b) => a + b, 0);

if (update || !existsSync(BASELINE)) {
  if (!update && process.env.CI) { console.error(`detect-gate: no ${BASELINE} — run it locally with --update and commit`); process.exit(1); }
  const sorted = Object.fromEntries(Object.entries(counts).sort());
  writeFileSync(BASELINE, JSON.stringify({ tool: IMPECCABLE, total, findings: sorted }, null, 2) + "\n");
  console.log(`detect-gate: baseline written — ${total} findings. Log it in design/log.md.`);
  process.exit(0);
}

const base = JSON.parse(readFileSync(BASELINE, "utf8")).findings;
const worse = Object.entries(counts).filter(([k, n]) => n > (base[k] || 0));
const baseTotal = Object.values(base).reduce((a, b) => a + b, 0);

if (worse.length) {
  console.error(`detect-gate: ${worse.length} new violation(s):`);
  for (const [k, n] of worse) console.error(`  ${k}  (${base[k] || 0} → ${n})`);
  console.error("Fix them, or add an impeccable-disable comment with a reason. Run `npx impeccable detect <file>` for details.");
  process.exit(1);
}
console.log(`detect-gate: ok — ${total} findings (baseline ${baseTotal})${total < baseTotal ? ". Progress: run --update and commit the smaller baseline." : ""}`);
