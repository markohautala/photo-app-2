// src/stores/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: JSON.parse(localStorage.getItem('authenticated')) || false,
  }),
  actions: {
    login() {
      this.authenticated = true;
      localStorage.setItem('authenticated', true);
    },
    logout() {
      this.authenticated = false;
      localStorage.removeItem('authenticated');
    },
  },
});
