<template>
  <div class="w-full">
    <div class="flex justify-between items-center mt-3">
      <h1 class="font-semibold text-lg">Tulis Artikel</h1>

      <BaseButton
        @click="navigateTo('/artikel')"
        class="rounded-lg flex gap-1 items-center"
        size="sm"
      >
        <IconsChevron width="14" height="14" />
        Kembali
      </BaseButton>
    </div>

    <div class="bg-white p-4 shadow rounded-lg mt-6">
      <BaseInput
        label="Judul"
        :error="checkFieldError('title')"
        v-model="title"
      />
      <div v-for="(item, idx) in fieldError" :key="idx">
        <h1 v-if="item.path == 'title'" class="text-danger text-sm mt-1">
          {{ item.message }}
        </h1>
      </div>
    </div>

    <div class="mt-4">
      <client-only>
        <div class="bg-white p-6 rounded-lg shadow">
          <TiptapEditor v-model:model-value="editorContent" />
          <div v-for="(item, idx) in fieldError" :key="idx">
            <h1 v-if="item.path == 'content'" class="text-danger text-sm mt-2">
              {{ item.message }}
            </h1>
          </div>
        </div>
      </client-only>
    </div>

    <div class="p-4 rounded-lg shadow bg-white mt-6 flex justify-between">
      <div class="flex gap-3">
        <BaseButton
          @click="triggerFileInput"
          class="flex gap-1"
          variant="secondary"
        >
          <IconsThumbnail width="25" height="25" />
          {{ buttonText }}
        </BaseButton>

        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          accept="image/*"
          class="hidden"
        />
      </div>

      <BaseButton @click="handlePublish" class="flex gap-1">
        <IconsPublish width="20" height="20" />

        Publish
      </BaseButton>
    </div>
    <div class="px-4" v-for="(item, idx) in fieldError" :key="idx">
      <h1 v-if="item.path == 'thumbnail'" class="text-danger text-sm mt-2">
        Mohon upload thumbnail
      </h1>
    </div>
  </div>

  <Toast
    v-if="showToast"
    label="Berhasil Publish Artikel"
    @close="toggleToast"
  />
</template>

<script setup>
import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import TiptapEditor from "~/components/widgets/editor/TiptapEditor.vue";
import Toast from "~/components/widgets/popup/Toast.vue";
import { useMyAuthStore } from "~/store/auth";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;
const authStore = useMyAuthStore();

const editorContent = ref("<p>Ini adalah konten awal editor</p>");

const fieldError = ref([]);

const showToast = ref(false);

const id_pengguna = ref(authStore.user.id);
const title = ref("");
const fileInput = ref(null);
const thumbnail = ref(null);
const buttonText = ref("Upload Thumbnail");

const triggerFileInput = () => {
  fileInput.value?.click();
};

const toggleToast = () => {
  showToast.value = !showToast.value;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    thumbnail.value = file;
    buttonText.value = file.name;
  }
};

function checkEmpty(field, fieldName) {
  if (!field.value) {
    fieldError.value.push({
      path: fieldName,
      message: "Field ini tidak boleh kosong",
    });
  }
}

function resetForm() {
  title.value = "";
  thumbnail.value = null;
  editorContent.value = "";
}

function checkFieldError(field) {
  const isFieldError = fieldError.value.find(
    (element) => element.path == field
  );
  if (isFieldError) {
    return true;
  }
  return false;
}

function validate() {
  fieldError.value = [];

  checkEmpty(title, "title");
  checkEmpty(thumbnail, "thumbnail");

  if (editorContent.value.length == 7) {
    fieldError.value.push({
      path: "content",
      message: "Content tidak boleh kosong",
    });
  }
}

const handlePublish = async () => {
  validate();

  if (!fieldError.value.length) {
    const url = baseURL + "/api/artikel";
    const payload = new FormData();
    payload.append("id_pengguna", id_pengguna.value);
    payload.append("title", title.value);
    payload.append("content", editorContent.value);
    payload.append("thumbnail", thumbnail.value);

    const postArtikel = await fetch(url, {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (postArtikel.ok) {
      resetForm();
      toggleToast();
    } else {
      const response = await postArtikel.json();

      console.log(response);
    }
  }
};

definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>
