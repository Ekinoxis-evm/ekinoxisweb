// Copies the brand kit from @ekinoxis/brand (the one source) into public/brand/, which
// ekinoxis.xyz/brand serves and zips. Run `npm run brand:sync` after bumping the pinned tag.
// Never edit public/brand/{logo,favicon,fonts,README.md,colors.md,typography.md} by hand.
import { cpSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve('@ekinoxis/brand/tokens.json'));
const { version } = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
const out = 'public/brand';

for (const dir of ['logo', 'favicon', 'fonts']) rmSync(join(out, dir), { recursive: true, force: true });
cpSync(join(pkgDir, 'logos'), join(out, 'logo'), { recursive: true });
cpSync(join(pkgDir, 'favicon'), join(out, 'favicon'), { recursive: true });
cpSync(join(pkgDir, 'fonts'), join(out, 'fonts'), { recursive: true });

// The brand README is the brand book. Split it by `## ` heading and keep what a kit user needs.
const readme = readFileSync(join(pkgDir, 'README.md'), 'utf8');
const sections = Object.fromEntries(
  readme.split(/\n(?=## )/).slice(1).map((s) => [s.slice(3, s.indexOf('\n')).trim(), s.trim()]),
);
const need = (name) => {
  if (!sections[name]) throw new Error(`brand README has no "## ${name}" section`);
  return sections[name];
};
const stamp = `From @ekinoxis/brand v${version} (github.com/Ekinoxis-evm/brand). Do not edit this copy.`;
const intro = readme.split(/\n## /)[0].trim();

writeFileSync(join(out, 'colors.md'), `# Ekinoxis colours\n\n_${stamp}_\n\n${need('Color')}\n`);
writeFileSync(join(out, 'typography.md'), `# Ekinoxis typography\n\n_${stamp}_\n\n${need('Type')}\n`);
writeFileSync(
  join(out, 'README.md'),
  [intro, `_${stamp}_`, ...['Color', 'Type', 'Corners', 'Logo', 'Imagery', 'Voice'].map(need)].join('\n\n') + '\n',
);

if (!existsSync(join(out, 'logo/horizontal/svg/ekinoxis-horizontal-cyan-on-black.svg'))) {
  throw new Error('logo copy failed');
}
console.log(`public/brand synced from @ekinoxis/brand v${version}`);
