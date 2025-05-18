<!-- src/components/ImageFetch.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/vue';
import GallerySkeleton from './GallerySkeleton.vue';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

const images = ref([]);
const columns = ref([[], [], []]);  // 3 columns
const error = ref(null);
const showSkeleton = ref(true);

const fetchImages = async () => {
  const delay = new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const response = await fetch('http://localhost:3001/api/images');
    const data = await response.json();

    if (!response.ok || !data.resources) {
      throw new Error(data.error?.message || 'Kunde inte hämta bilder');
    }

    const allImages = data.resources.map(resource => ({
      id: resource.public_id,
      url: cld.image(resource.public_id) // no resizing applied
    }));

    // Distribute images into 3 columns
    allImages.forEach((img, index) => {
    columns.value[index % 3].push(img); // distribute across 3
    });

    images.value = allImages;
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

  <div v-else class="row">
    <div class="column" v-for="(col, colIndex) in columns" :key="colIndex">
      <AdvancedImage
        v-for="img in col"
        :key="img.id"
        :cldImg="img.url"
        class="responsive-img"
      />
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

.column {
  flex: 33.33%;
  max-width: 33.33%;
  padding: 0 4px;
}

.responsive-img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  border-radius: 8px;
}

/* 2 columns */
@media screen and (max-width: 800px) {
  .column {
    flex: 50%;
    max-width: 50%;
  }
}

/* 1 column */
@media screen and (max-width: 600px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}

.error {
  color: red;
  padding: 16px;
}
</style>
