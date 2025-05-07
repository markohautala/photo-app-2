
<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view />  <!-- This will display the routed component -->
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>