// src/router.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import GalleryPage from './components/GalleryPage.vue';
import UploadPage from './components/UploadPage.vue';

const routes = [
  { path: '/', component: GalleryPage, name: 'gallery' },
  { path: '/upload', component: UploadPage, name: 'upload' },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // Redirect any unknown paths to the gallery page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
