import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      port: 24678,
      clientPort: 24678,
    },
    port: 3000,
  },
});
