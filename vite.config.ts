import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'https://jsonplaceholder.typicode.com',
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@entities': '/src/entities',
      '@features': '/src/features',
      '@widgets': '/src/widgets',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
    },
  },
})
