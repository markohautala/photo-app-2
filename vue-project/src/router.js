import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './stores/auth';

import AuthenticationPage from './components/AuthenticationPage.vue';
import GalleryPage from './components/GalleryPage.vue';
import UploadPage from './components/UploadPage.vue';

const routes = [
  { path: '/', component: AuthenticationPage, name: 'auth' },
  { path: '/gallery', component: GalleryPage, name: 'gallery', meta: { requiresAuth: true } },
  { path: '/upload', component: UploadPage, name: 'upload', meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: { name: 'gallery' } }, // Redirect to gallery for any unmatched routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const auth = useAuthStore();

  // If user is authenticated and trying to access the authentication page, redirect to gallery
  if (auth.authenticated && to.name === 'auth') {
    return { name: 'gallery' };
  }

  // If the route requires authentication and the user is not authenticated, redirect to auth
  if (to.meta.requiresAuth && !auth.authenticated) {
    return { name: 'auth' };
  }
});

export default router;
