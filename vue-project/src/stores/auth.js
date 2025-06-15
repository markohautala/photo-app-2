import { defineStore } from 'pinia';

const AUTH_KEY = 'authenticated';
const EXPIRY_KEY = 'auth_expiry';
const ONE_HOUR_MS = 60 * 60 * 1000;

export const useAuthStore = defineStore('auth', {
  state: () => {
    const isAuthenticated = JSON.parse(localStorage.getItem(AUTH_KEY));
    const expiry = localStorage.getItem(EXPIRY_KEY);

    const expired = expiry && Date.now() > Number(expiry);

    if (expired) {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    }

    return {
      authenticated: isAuthenticated && !expired,
    };
  },
  actions: {
    login() {
      const now = Date.now();
      const expiresAt = now + ONE_HOUR_MS;
      this.authenticated = true;
      localStorage.setItem(AUTH_KEY, true);
      localStorage.setItem(EXPIRY_KEY, expiresAt.toString());
    },
    logout() {
      this.authenticated = false;
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    },
  },
});
