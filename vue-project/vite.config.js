// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import path from 'path';
import cloudinaryMiddleware from './vite-plugin-cloudinary.js';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    cloudinaryMiddleware(), // 👈 Lägg till den här
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
