import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/umd.js'),
      name: 'MotionKit',
      formats: ['umd'],
      fileName: () => 'motionkit.umd.js',
      cssFileName: 'motionkit'
    },
    rollupOptions: {
      output: {
        exports: 'default',
        assetFileNames: (assetInfo) => assetInfo.name === 'style.css' ? 'motionkit.css' : '[name][extname]'
      }
    }
  }
});
