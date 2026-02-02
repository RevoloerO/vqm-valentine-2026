import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/vqm-valentine-2026',
  server: {
    port: 1402,
  },
})
