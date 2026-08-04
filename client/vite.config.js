import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  optimizeDeps: {
    include: ['redux-persist', 'redux-persist/integration/react'],
  },
  plugins: [react(), tailwindcss()]
})