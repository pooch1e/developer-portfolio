/**
 * Vite config — plugins, path aliases, and vendor chunk splitting so
 * Three.js caches independently of app code.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import glsl from 'vite-plugin-glsl';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss(), glsl()],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.glsl'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@world': fileURLToPath(new URL('./World', import.meta.url)),
      '@shaders': fileURLToPath(new URL('./shaders', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/three/')) return 'vendor-three';
        },
      },
    },
  },
});
