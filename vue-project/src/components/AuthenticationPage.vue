<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <!-- Cloudinary Header Image -->
    <img
      src="https://res.cloudinary.com/dtjbfg6km/project-setup-essentials/pkxa2ltbhzwuosz1jwu2"
      alt="Authentication header"
      width="300"
      height="300"
      class="mb-6"
      style="object-fit: cover; border-radius: 20px;"
    />

    <!-- Code Input Fields -->
    <div class="d-flex gap-2">
      <v-text-field
        v-for="(digit, index) in digits"
        :key="index"
        v-model="digits[index]"
        type="text"
        maxlength="1"
        class="mx-1"
        autocomplete="off"
        outlined
        @input="onInput(index, digits[index])"
        style="width: 80px; height: 80px; text-align: center; border-radius: 20px; font-size: 32px;"
      />
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const digits = ref(['', '', '', '']);
const router = useRouter();
const auth = useAuthStore();

const AUTH_CODE = import.meta.env.VITE_AUTH_CODE.toString();

const onInput = (index, value) => {
  if (value.length === 1 && index < 3) {
    const next = document.querySelectorAll('input')[index + 1];
    next?.focus();
  }

  if (digits.value.every((d) => d.length === 1)) {
    const code = digits.value.join('');
    console.log("Entered:", code, "| Expected:", AUTH_CODE);

    if (code === AUTH_CODE) {
      auth.login();
      router.push({ name: 'gallery' });
    }
  }
};
</script>
