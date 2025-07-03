import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    exclude: [...configDefaults.exclude, '**/e2e/**'],
  },
})
