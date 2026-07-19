import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      formats: ['es'],
      fileName: () => 'motionkit.js',
      cssFileName: 'motionkit'
    },
    rollupOptions: {
      external: ['gsap', 'gsap/ScrollTrigger.js', 'lenis'],
      output: {
        exports: 'named',
        assetFileNames: (assetInfo) => assetInfo.name === 'style.css' ? 'motionkit.css' : '[name][extname]'
      }
    }
  }
});
