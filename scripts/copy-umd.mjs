import { copyFile } from 'node:fs/promises';
await copyFile(new URL('../dist/motionkit.umd.js', import.meta.url), new URL('../dist/motionkit.umd.cjs', import.meta.url));
