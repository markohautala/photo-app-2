// Bara för local utveckling, inte för produktion - denna fil använder vite-plugin-cloudinary.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'
import cloudinaryMiddleware from './vite-plugin-cloudinary.js'; // ✅ use this one

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    cloudinaryMiddleware(), // ✅ middleware used only here
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
