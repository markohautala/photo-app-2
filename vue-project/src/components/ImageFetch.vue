<script setup>
import { ref, onMounted } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/vue';
import { fill } from '@cloudinary/url-gen/actions/resize';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtjbfg6km', // Hårdkodad här också
  },
});

const images = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchImages = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:3001/api/images');

    const data = await response.json();
    console.log('API Response:', data);

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
    loading.value = false;
  }
};

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div>
    <div v-if="loading">Laddar bilder...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="gallery">
      <AdvancedImage
        v-for="img in images"
        :key="img.id"
        :cldImg="img.url"
        class="gallery-item"
      />
    </div>
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