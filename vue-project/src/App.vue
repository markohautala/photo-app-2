<template>
  <n-loading-bar-provider
    :theme-overrides="{
      colorLoading: '#90EE90',
      colorError: '#FF6347',
      colorSuccess: '#90EE90'
    }"
    :container-style="{ position: 'absolute', top: '64px', left: '0', right: '0', zIndex: 9999 }"
  >
    <v-app>
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </n-loading-bar-provider>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { useTheme } from 'vuetify'
import { watch } from 'vue'

// 🟢 Lyssna på Vuetify-temat och uppdatera <html>-klassen
const theme = useTheme()

watch(
  () => theme.global.current.value.dark,
  (isDark) => {
    document.documentElement.classList.toggle('dark', isDark)
  },
  { immediate: true }
)
</script>
