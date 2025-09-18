import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:8080',
      '/finance': 'http://localhost:8080',
      '/v3/api-docs': 'http://localhost:8080'
    }
  }
})
