// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'
import cloudinaryMiddleware from './vite-middleware.js'; // 👈 Lägg till

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    cloudinaryMiddleware(), // 👈 Lägg till här
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
