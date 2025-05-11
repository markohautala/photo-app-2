<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      :class="dragging ? 'border-primary' : 'border-dashed'"
      class="pa-10 rounded-xl"
      width="800"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <div class="text-center">
        <v-icon size="64" color="primary">mdi-cloud-upload</v-icon>
        <p v-if="error" class="text-error">{{ error }}</p>
        <p v-else-if="dragging">Släpp filerna här (max 5 bilder)</p>
        <p v-else>Drag & drop eller klicka för att ladda upp (max 5 bilder)</p>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        ref="fileInput"
        class="d-none"
        @change="handleUpload"
      />

      <div v-if="loading || uploadsComplete" class="mt-6">
        <v-progress-linear
          v-for="(file, index) in uploadProgress"
          :key="index"
          :model-value="file.progress"
          color="#90EE90"
          height="16"
          class="mb-4"
          rounded
        >
          <template #default>
            <div class="d-flex justify-space-between px-4 white--text">
              <span><strong>Fil {{ index + 1 }}</strong></span>
              <span>{{ file.status }} – {{ Math.round(file.progress) }}%</span>
            </div>
          </template>
        </v-progress-linear>

      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useLoadingBar } from "naive-ui";

const fileInput = ref(null);
const router = useRouter();

const loading = ref(false);
const dragging = ref(false);
const error = ref("");
const uploadsComplete = ref(false);
const uploadProgress = reactive([]);

const loadingBar = useLoadingBar();

/**
 * Trigger hidden file input
 */
const triggerFileInput = () => {
  fileInput.value.click();
};

/**
 * Handle drag/drop state
 */
const handleDragOver = () => (dragging.value = true);
const handleDragLeave = () => (dragging.value = false);

/**
 * Handle dropped files
 */
const handleDrop = (e) => {
  dragging.value = false;
  handleUpload(e);
};

/**
 * Upload images to Cloudinary
 */
const handleUpload = async (e) => {
  const files = e.target.files || e.dataTransfer?.files;
  if (!files || files.length === 0) return;

  if (files.length > 5) {
    error.value = "Max 5 bilder kan laddas upp samtidigt.";
    return;
  }

  error.value = "";
  loading.value = true;
  uploadsComplete.value = false;
  uploadProgress.splice(0);

  loadingBar.start(); // Loading bar starts

  const fileList = Array.from(files);
  fileList.forEach(() => uploadProgress.push({ progress: 0, status: "Laddar upp..." }));

  const uploadSingleFile = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "vue-gallery");


    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 95) {
        progress += Math.random() * 10;
        uploadProgress[index].progress = Math.min(95, progress);
      }
    }, 300);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      clearInterval(interval);
      uploadProgress[index].progress = 100;
      uploadProgress[index].status = " Uppladdad";
      console.log("Upload success:", data.secure_url);
    } catch (err) {
      clearInterval(interval);
      uploadProgress[index].progress = 0;
      uploadProgress[index].status = "Misslyckades";
      console.error("Upload error:", err);
      loadingBar.error(); // Loading bar error state
    }
  };

  await Promise.all(fileList.map((file, i) => uploadSingleFile(file, i)));

  uploadsComplete.value = true;
  loadingBar.finish(); // Loading bar finishes
  setTimeout(() => {
    router.push("/gallery");
  }, 3000);
};
</script>

<style scoped>
.border-dashed {
  border: 3px dashed gray;
}
.border-primary {
  border: 3px solid #1976d2;
}
</style>
