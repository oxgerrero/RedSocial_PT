import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    host: true,            // <- Para aceptar conexiones externas
    port: 5173,             // <- El mismo puerto que en docker-compose
    strictPort: true,       // <- No buscará otro puerto si está ocupado
    watch: {
      usePolling: true      // <- Necesario en Docker para refrescar cambios
    }
  }
})
