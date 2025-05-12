<!-- ImageFetch.vue -->
<script setup>
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/vue';
import { fill } from '@cloudinary/url-gen/actions/resize';

// Set up Cloudinary with your own cloud name (from your Cloudinary dashboard)
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtjbfg6km', // ⬅️ replace with your actual cloud name
  },
});

// Load your image by its public ID (from your Media Library)
const myImg = cld.image('vue-gallery/kplrgup9bco6gkhofpuk'); // ⬅️ replace with your image’s public ID

// Optional: resize it
myImg.resize(fill().width(250).height(250));
</script>

<template>
  <div>
    <AdvancedImage :cldImg="myImg" />
  </div>
</template>
