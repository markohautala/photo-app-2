<!-- src/components/Navbar.vue -->
<template>
  <v-app-bar app flat color="primary" dark>
    <v-toolbar-title>
      Logo
      <!-- För att byta till bild, använd: -->
      <!-- <v-img src="/path/to/logo.png" alt="Logo" max-height="40" contain /> -->
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Höger: Knappar -->
    <v-btn text @click="goTo('gallery')">Gallery</v-btn>
    <v-btn text @click="goTo('upload')">Upload</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router';  // Import useRouter to use Vue Router

const router = useRouter();

const goTo = (page) => {
  // Use router.push() to navigate to the page
  router.push({ name: page });
};
</script>
