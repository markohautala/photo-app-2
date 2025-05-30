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
const proxyUrl = import.meta.env.DEV
  ? '/api/cloudinary-proxy' // Lokalt via Vite
  : 'https://photo-app-2.vercel.app/api/cloudinary-proxy'; // Vercel deploy

// Funktion för att hämta bilder
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

    images.value = data.resources.map(resource => {
      const lowQuality = cld.image(resource.public_id)
        .quality('auto:low')
        .format('auto')

      const fullQualityUrl = cld.image(resource.public_id).toURL();

      return {
        id: resource.public_id,
        cldImg: lowQuality,
        fullUrl: fullQualityUrl,
      };
    });
  } catch (err) {
    error.value = err.message;
    console.error('Fel vid hämtning av bilder:', err);
  } finally {
    await delay;
    showSkeleton.value = false;
  }
};

// Funktion för nedladdning av originalbild
const downloadImage = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Fel vid nedladdning:', err);
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
    <div
      v-for="img in images"
      :key="img.id"
      class="masonry-img-wrapper"
    >
      <AdvancedImage :cldImg="img.cldImg" class="masonry-img" />
      <div class="download-square" @click="downloadImage(img.fullUrl)">
        <span class="material-symbols-outlined">download</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Masonry layout using CSS columns */
.masonry {
  column-count: 3;
  column-gap: 1rem;
  padding: 1rem;
}

.masonry-img-wrapper {
  position: relative;
  margin-bottom: 1rem;
  break-inside: avoid;
}

/* Style for individual images */
.masonry-img {
  width: 100%;
  display: block;
  border-radius: 8px;
}

/* Download button styling */
.download-square {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  color: black;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.download-square:hover {
  background: rgba(255, 255, 255, 0.4);
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
