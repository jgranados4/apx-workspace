import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['projects/**/*.spec.ts'],
    server: {
      deps: {
        inline: ['@angular/**', '@analogjs/**'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
