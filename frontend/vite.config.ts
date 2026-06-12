import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    proxy: {
      '/pago/preferencia': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/participantes': 'http://localhost:3000',
      '/mis-cursos': 'http://localhost:3000'
    }
  },
})
