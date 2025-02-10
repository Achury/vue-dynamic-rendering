import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    globals: true, // Enable global imports for Vitest
    environment: 'happy-dom', // Use happy-dom for a browser-like environment
  },
});
