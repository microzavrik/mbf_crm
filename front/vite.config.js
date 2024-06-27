import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 80,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://26.253.166.220:3000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});