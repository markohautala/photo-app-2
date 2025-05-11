<template>
  <div class="container">
    <div class="skeleton-card" v-for="n in 3" :key="n"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.skeleton-card {
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    #e0e0e0 25%,
    #f5f5f5 50%,
    #e0e0e0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2.5s infinite linear;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

<!-- Global styles (not scoped) for dark theme -->
<style>
html.dark .skeleton-card {
  background: linear-gradient(
    90deg,
    #3a3a3a 25%,
    #4a4a4a 50%,
    #3a3a3a 75%
  );
  background-size: 200% 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  animation: shimmer-dark 2.5s infinite linear; /* Lägg till animation för mörkt tema */
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
