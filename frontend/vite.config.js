import { defineConfig } from 'vite';
import frSite, { frCmsLoader, frQaHook } from './vite/fr-site.js';
import { frProducts, pzScope } from './vite/fr-products.js';

// The backend (Express, ../backend) answers /api/*. In development it runs on port 8787.
const API = process.env.API_URL || 'http://127.0.0.1:8787';

export default defineConfig({
  plugins: [frProducts(), frSite(), frQaHook(), frCmsLoader()],
  // build 68: product sites (src/products/<slug>) keep their own automatic JSX runtime: vite/fr-products.js
  css: { postcss: { plugins: [pzScope()] } },
  // The site's JSX uses React's classic runtime with React imported as `ee` (import * as ee from 'react'),
  // exactly as the original compiled site did, so the rendered markup is unchanged.
  oxc: { exclude: /[\\/]src[\\/]products[\\/][a-z0-9]+[\\/]/, jsx: { runtime: 'classic', pragma: 'ee.createElement', pragmaFrag: 'ee.Fragment' } },
  server: { port: 5173, proxy: { '/api': { target: API, changeOrigin: false } } },
  preview: { port: 4173, proxy: { '/api': { target: API, changeOrigin: false } } },
  build: {
    outDir: 'dist',
    target: 'es2020',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 8000,
    reportCompressedSize: false,
    // build 74: source maps ship with the build (Lighthouse "valid source maps"); the single-file preview has none
    sourcemap: !process.env.FR_SINGLE,
    // build 74: one stylesheet for the whole site, as before, even though the rest of the site is its own script file
    cssCodeSplit: false,
    // build 68: FR_SINGLE=1 (npm run preview-file) keeps every script in one file for the offline preview, which opens
    // from file:// and so cannot load the product sites' separate script chunks
    rolldownOptions: {
      ...(process.env.FR_SINGLE ? { output: { codeSplitting: false } } : {}),
      // framer-motion's "use client" lines mean nothing in this app
      onLog(level, log, handler) {
        if (log.code === 'MODULE_LEVEL_DIRECTIVE') return;
        handler(level, log);
      },
    },
  },
});
