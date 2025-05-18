<template>
  <div class="gallery">
    <div
      class="skeleton-card"
      v-for="n in 9"
      :key="n"
      :style="{ animationDelay: `${n * 75}ms` }"
    ></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(333.33px, 1fr));
  gap: 16px;
  padding: 16px;
}

.skeleton-card {
  width: 100%;
  height: 250px;
  border-radius: 8px;

  /* Light mode shimmer gradient exakt enligt dina RGBA-värden */
  background: linear-gradient(
    90deg,
    rgba(248, 248, 248, 0) 0%,
    rgba(248, 248, 248, 0.6) 25%,
    rgba(248, 248, 248, 0.85) 37%,
    rgba(248, 248, 248, 0.95) 48%,
    rgba(248, 248, 248, 0.95) 51%,
    rgba(248, 248, 248, 0.85) 61%,
    rgba(248, 248, 248, 0.6) 74%,
    rgba(248, 248, 248, 0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 833ms infinite steps(1, end);
  animation-timing-function: ease-in-out;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  50% {
    background-position: -200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

<style>
html.dark .skeleton-card {
  /* Dark mode shimmer gradient exakt enligt dina RGBA-värden */
  background: linear-gradient(
    90deg,
    rgba(40, 40, 40, 0) 0%,
    rgba(40, 40, 40, 0.5) 25%,
    rgba(40, 40, 40, 0.7) 37%,
    rgba(40, 40, 40, 0.8) 48%,
    rgba(40, 40, 40, 0.8) 51%,
    rgba(40, 40, 40, 0.7) 61%,
    rgba(40, 40, 40, 0.5) 74%,
    rgba(40, 40, 40, 0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer-dark 833ms infinite steps(1, end);
  animation-timing-function: ease-in-out;
}

@keyframes shimmer-dark {
  0% {
    background-position: 200% 0;
  }
  50% {
    background-position: -200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
