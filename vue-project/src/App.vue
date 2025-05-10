
<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <n-loading-bar-provider>
        <router-view />  <!-- This will display the routed component -->
      </n-loading-bar-provider>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>