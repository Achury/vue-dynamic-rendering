import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html', // Client-side entry point
        server: 'src/entryServer.js', // Server-side entry point
      },
      output: {
        entryFileNames: '[name].js', // Output file names
        format: 'esm', // Ensure ES module output
      },
    },
  },
  ssr: {
    target: 'node', // Ensure the SSR build targets Node.js
    noExternal: ['vue', 'pinia', 'vue-demi'],
  },
  test: {
    globals: true, // Enable global imports for Vitest
    environment: 'happy-dom', // Use happy-dom for a browser-like environment
  },
});
