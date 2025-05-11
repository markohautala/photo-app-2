<!-- src/views/GalleryPage.vue -->
<template>
  <v-container>
    <h1 class="text-h4 mb-4">Gallery Page</h1>

    <div v-if="loading">
      <GallerySkeleton />
    </div>

    <v-row v-else>
      <v-col
        v-for="image in images"
        :key="image.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-img
          :src="image.url"
          aspect-ratio="1"
          class="rounded"
          :lazy-src="image.url"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GallerySkeleton from '@/components/GallerySkeleton.vue';

const images = ref([]);
const loading = ref(true);

onMounted(async () => {
  const MIN_LOAD_TIME = 1500;
  const start = Date.now();

  try {
    const res = await fetch('/api/images');
    if (!res.ok) throw new Error('Failed to fetch images');
    images.value = await res.json();
  } catch (err) {
    console.error('Image load failed:', err);
  } finally {
    const elapsed = Date.now() - start;
    const wait = Math.max(MIN_LOAD_TIME - elapsed, 0);

    setTimeout(() => {
      loading.value = false;
    }, wait);
  }
});
</script>

<style scoped>
.v-img {
  border-radius: 12px;
}
</style>
