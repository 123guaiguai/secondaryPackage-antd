import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
import packageJson from "./package.json"

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/components/index.ts',
      },
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: Object.keys(packageJson.dependencies),
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]_[local]_[hash:5]',
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [react(), visualizer()],
});
