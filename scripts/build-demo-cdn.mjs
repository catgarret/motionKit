// Generate a deploy-ready copy of the demo that loads Kineto from the jsDelivr
// CDN pinned to the current package version — instead of the local ../dist the
// dev demo uses. This is what you upload to the public demo host (git.dongri.me).
//
// Why pin the version? An unpinned @dong-gri/kineto URL is cached by jsDelivr for
// days, so a freshly published build won't show up. Pinning to @<version> means
// the demo always loads exactly the build you just released — no purge, no stale
// cache, ever.
//
// Run automatically as part of `npm run build`, or on its own: `npm run demo:cdn`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = pkg.version;
const SRC = path.join(root, 'demo');
const OUT = path.join(root, 'site');

// Load the newest published build via @latest. NOTE: jsDelivr caches @latest for
// hours, so after `npm publish` run `npm run purge` to flush the CDN — otherwise
// the demo keeps serving the previous bundle (this is why library fixes seemed
// not to apply). @latest keeps the demo on the newest release without editing
// the URL each time.
const cdnBase = `https://cdn.jsdelivr.net/npm/@dong-gri/kineto@latest/dist`;

// 1. Fresh copy of the whole demo tree (html, js, css, assets…).
fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(SRC, OUT, { recursive: true });

// 2. Rewrite the local dist references in index.html to the pinned CDN build.
const indexPath = path.join(OUT, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
html = html
  .replace(/(href|src)="\.\.\/dist\/kineto\.umd\.js"/g, `src="${cdnBase}/kineto.umd.min.js"`)
  .replace(/href="\.\.\/dist\/kineto\.css"/g, `href="${cdnBase}/kineto.min.css"`)
  .replace(/(href|src)="\.\.\/dist\/kineto\.min\.css"/g, `href="${cdnBase}/kineto.min.css"`)
  .replace(/(href|src)="\.\.\/dist\/kineto\.umd\.min\.js"/g, `src="${cdnBase}/kineto.umd.min.js"`);
fs.writeFileSync(indexPath, html);

const leftover = (html.match(/\.\.\/dist\//g) || []).length;
console.log(`Generated site/ from demo/ — Kineto pinned to @${version}. Remaining ../dist refs: ${leftover}`);
if (leftover > 0) console.warn('  ! Some ../dist references were not rewritten — check index.html.');
