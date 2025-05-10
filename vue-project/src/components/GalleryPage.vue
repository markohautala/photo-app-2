<template>
  <div class="gallery-page">
    <h1>Gallery Page</h1>

    <n-space justify="center" align="center" wrap>
      <n-skeleton
        v-for="n in 3"
        :key="n"
        round
        width="380px"
        height="300px"
        :repeat="2"
        animated
        :style="{
          borderRadius: '3%',
          margin: '5px',
          marginTop: '25px',
        }"
      />
    </n-space>
  </div>
</template>

<script setup>
// No script logic needed for now
</script>

<style scoped>
.gallery-page {
  padding: 2rem;
  text-align: center;
}
</style>
