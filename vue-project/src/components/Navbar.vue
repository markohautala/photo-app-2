<template>
  <v-app-bar app flat :color="$vuetify.theme.current.colors.primary" dark>
    <v-toolbar-title class="custom-font">M&M Wedding</v-toolbar-title>

    <!-- Burger menu for small screens -->
    <div class="d-sm-none">
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" />
        </template>

        <v-list>
          <template v-if="auth.authenticated">
            <v-list-item @click="goTo('gallery')">
              <v-list-item-title>Gallery</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('upload')">
              <v-list-item-title>Upload</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item @click="toggleTheme">
            <v-list-item-title>
              <v-icon start>
                {{ isDark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}
              </v-icon>
              Toggle Theme
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <!-- Normal buttons for larger screens -->
    <div class="d-none d-sm-flex align-center">
      <template v-if="auth.authenticated">
        <v-btn text @click="goTo('gallery')">Gallery</v-btn>
        <v-btn text @click="goTo('upload')">Upload</v-btn>
      </template>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from 'vuetify'
import { computed } from 'vue'

const router = useRouter()
const auth = useAuthStore()

const goTo = (page) => {
  router.push({ name: page })
}

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

const toggleTheme = () => {
  const current = theme.global.name.value
  theme.global.name.value = current === 'customTheme' ? 'customDarkTheme' : 'customTheme'
}
</script>