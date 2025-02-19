import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Absolute path to index.html
        dashboard: path.resolve(__dirname, 'dashboard.html'), // Absolute path to dashboard.html
      },
    },
  },
});