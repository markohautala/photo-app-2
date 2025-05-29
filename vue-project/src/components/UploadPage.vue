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
        <v-icon size="100" color="primary">mdi-cloud-upload</v-icon>
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
          color="#75e4c8"
          height="16"
          class="mb-4"
          rounded
        >
          <template #default>
            <div class="d-flex justify-space-between px-4 white--text">
              <span><strong>Fil {{ index + 1 }}</strong></span>
              <span>{{ file.status }} - {{ Math.round(file.progress) }}%</span>
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
import imageCompression from "browser-image-compression";

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

  loadingBar.start();

  const fileList = Array.from(files);
  fileList.forEach(() => uploadProgress.push({ progress: 0, status: "Laddar upp..." }));

  const compressIfNeeded = async (file) => {
    if (file.size <= 10 * 1024 * 1024) {
      return file; // under 10MB, use as-is
    }

    const options = {
      maxSizeMB: 10,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(file, options);
      return compressed;
    } catch (err) {
      console.error("Compression failed, using original file", err);
      return file;
    }
  };

  const uploadSingleFile = async (file, index) => {
    const processedFile = await compressIfNeeded(file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append("file", processedFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "vue-gallery");

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          uploadProgress[index].progress = Math.round(percent);
          uploadProgress[index].status = "Laddar upp...";
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) {
            uploadProgress[index].progress = 100;
            uploadProgress[index].status = "Uppladdad";
            resolve(JSON.parse(xhr.responseText));
          } else {
            uploadProgress[index].progress = 0;
            uploadProgress[index].status = "Misslyckades";
            reject(xhr.statusText);
          }
        }
      };

      xhr.open("POST", `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`);
      xhr.send(formData);
    });
  };

  try {
    await Promise.all(fileList.map((file, i) => uploadSingleFile(file, i)));
    uploadsComplete.value = true;
    loadingBar.finish();
    setTimeout(() => {
      router.push("/gallery");
    }, 3000);
  } catch (err) {
    console.error("Upload failed", err);
    loadingBar.error();
    loading.value = false;
    error.value = "En eller flera uppladdningar misslyckades.";
  }
};

</script>

<style scoped>
.border-dashed {
  border: 3px dashed gray;
}
.border-primary {
  border: 3px solid #75e4c8;
}
</style>
