<!-- src/components/AuthenticationPage.vue -->
<template>
  <v-container
    class="d-flex justify-center align-center fill-height flex-column"
  >
    <div class="mb-6">
      <AdvancedImage
        :cldImg="myImage"
        style="
          width: 350px;
          border-radius: 50%;
          height: 350px;
          object-fit: cover;
        "
      />
    </div>

    <div class="d-flex gap-2">
      <v-text-field
        v-for="(digit, index) in digits"
        :key="index"
        v-model="digits[index]"
        type="tel"
        inputmode="numeric"
        maxlength="1"
        class="mx-1"
        autocomplete="one-time-code"
        outlined
        @input="onInput(index, digits[index])"
        @keydown="onKeyDown(index, $event)"
        style="
          width: 80px;
          height: 80px;
          text-align: center;
          border-radius: 20px;
          font-size: 32px;
        "
      />
    </div>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/vue";

import { fill } from "@cloudinary/url-gen/actions/resize";

const digits = ref(["", "", "", ""]);
const router = useRouter();
const auth = useAuthStore();

// Cloudinary setup
const cld = new Cloudinary({
  cloud: {
    cloudName: "dtjbfg6km",
  },
});

const myImage = cld.image("hbaabzntozaklontcwmf");

const AUTH_CODE = import.meta.env.VITE_AUTH_CODE.toString();

const onInput = (index, value) => {
  if (value.length === 1 && index < 3) {
    const next = document.querySelectorAll("input")[index + 1];
    next?.focus();
  }

  if (digits.value.every((d) => d.length === 1)) {
    const code = digits.value.join("");
    console.log("Entered:", code, "| Expected:", AUTH_CODE);

    if (code === AUTH_CODE) {
      auth.login();
      router.push({ name: "gallery" });
    }
  }
};

const onKeyDown = (index, event) => {
  if (event.key === "Backspace") {
    if (digits.value[index] === "") {
      if (index > 0) {
        digits.value[index - 1] = "";
        // Vänta lite för att säkerställa att DOM hinner uppdateras
        setTimeout(() => {
          const prev = document.querySelectorAll("input")[index - 1];
          prev?.focus();
        }, 0);
      }
    } else {
      digits.value[index] = "";
    }
    event.preventDefault(); // Förhindra standard backspace-beteende
  }
};
</script>

<style scoped>
.v-text-field {
  width: 50px;
  text-align: center;
}
</style>
