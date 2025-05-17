<!-- src/components/GallerySkeleton.vue -->
<template>
  <div class="gallery">
    <div class="skeleton-card" v-for="n in 8" :key="n"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.skeleton-card {
  width: 100%;
  height: 250px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f5f5f5 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2.5s infinite linear;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

<style>
html.dark .skeleton-card {
  background: linear-gradient(
    90deg,
    #3a3a3a 25%,
    #4a4a4a 50%,
    #3a3a3a 75%
  );
  background-size: 200% 100%;
  animation: shimmer-dark 2.5s infinite linear;
}

@keyframes shimmer-dark {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
