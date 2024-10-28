import * as path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

console.log('path', path.resolve(__dirname, 'src'));
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }] },
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
});
