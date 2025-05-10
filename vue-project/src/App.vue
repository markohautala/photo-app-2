<template>
  <n-loading-bar-provider
    :theme-overrides="{
      colorLoading: '#7ffcd1',
      colorError: '#ff6b6b',
      colorSuccess: '#7ffcd1'
    }"
    :container-style="{ position: 'absolute', top: '64px', left: '0', right: '0', zIndex: 9999 }"
  >
    <v-app>
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </n-loading-bar-provider>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>
