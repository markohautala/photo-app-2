<script setup>
import { ref, onMounted } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/vue';
import GallerySkeleton from './GallerySkeleton.vue';

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

// State
const images = ref([]);
const error = ref(null);
const showSkeleton = ref(true);

// Dynamisk proxy-url beroende på miljö
const proxyUrl = import.meta.env.PROD
  ? '/api/cloudinary-proxy'       // produktion (Vercel API route)
  : '/api/cloudinary-proxy';      // utveckling (proxy via vite.config.js)

const fetchImages = async () => {
  const delay = new Promise(resolve => setTimeout(resolve, 1500)); // simulate loading delay

  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
    });
    const data = await response.json();

    if (!response.ok || !data.resources) {
      throw new Error(data.error?.message || 'Kunde inte hämta bilder');
    }

    images.value = data.resources.map(resource => ({
      id: resource.public_id,
      url: cld.image(resource.public_id),
    }));
  } catch (err) {
    error.value = err.message;
    console.error('Fel vid hämtning av bilder:', err);
  } finally {
    await delay;
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

  <div v-else class="masonry">
    <AdvancedImage
      v-for="img in images"
      :key="img.id"
      :cldImg="img.url"
      class="masonry-img"
    />
  </div>
</template>

<style scoped>
/* Masonry layout using CSS columns */
.masonry {
  column-count: 3;
  column-gap: 1rem;
  padding: 1rem;
}

/* Style for individual images */
.masonry-img {
  width: 100%;
  display: block;
  margin-bottom: 1rem;
  border-radius: 8px;
  break-inside: avoid; /* prevent image breaks between columns */
}

/* Responsive breakpoints */
@media screen and (max-width: 1000px) {
  .masonry {
    column-count: 2;
  }
}

@media screen and (max-width: 600px) {
  .masonry {
    column-count: 1;
  }
}

.error {
  color: red;
  padding: 16px;
}
</style>
