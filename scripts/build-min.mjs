// Minified distributables.
// - ESM: rolldown-minified (deps stay external, CSS ships separately).
// - UMD: the UMD build is already minified, so the .min.js is a byte copy —
//   guaranteeing the CDN drop-in is identical to the tested bundle.
import { rolldown } from 'rolldown';
import { copyFile } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const rel = (p) => new URL(p, root).pathname;

const esm = await rolldown({
  input: rel('src/index.js'),
  external: ['gsap', 'gsap/ScrollTrigger.js', 'lenis'],
  moduleTypes: { '.css': 'empty' }
});
await esm.write({ file: rel('dist/motionkit.min.js'), format: 'es', minify: true, exports: 'named' });
await esm.close();

await copyFile(rel('dist/motionkit.umd.js'), rel('dist/motionkit.umd.min.js'));
await copyFile(rel('dist/motionkit.css'), rel('dist/motionkit.min.css'));

console.log('Minified: motionkit.min.js (ESM), motionkit.umd.min.js (UMD), motionkit.min.css');
