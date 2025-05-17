<!-- src/components/ImageFetch.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/vue';
import { fill } from '@cloudinary/url-gen/actions/resize';
import GallerySkeleton from './GallerySkeleton.vue';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtjbfg6km',
  },
});

const images = ref([]);
const error = ref(null);
const showSkeleton = ref(true);

const fetchImages = async () => {
  const delay = new Promise(resolve => setTimeout(resolve, 1500)); // Minsta skeleton-visning

  try {
    const response = await fetch('http://localhost:3001/api/images');
    const data = await response.json();

    if (!response.ok || !data.resources) {
      throw new Error(data.error?.message || 'Kunde inte hämta bilder');
    }

    images.value = data.resources.map(resource => ({
      id: resource.public_id,
      url: cld.image(resource.public_id).resize(fill().width(250).height(250))
    }));
  } catch (err) {
    error.value = err.message;
    console.error('Fel vid hämtning av bilder:', err);
  } finally {
    await delay; // Vänta klart 1500 ms oavsett
    showSkeleton.value = false;
  }
};

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>

  <GallerySkeleton v-else-if="showSkeleton" />

  <div v-else class="gallery">
    <AdvancedImage
      v-for="img in images"
      :key="img.id"
      :cldImg="img.url"
      class="gallery-item"
    />
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.gallery-item {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

.error {
  color: red;
  padding: 16px;
}
</style>
