<template>
  <div class="w-full">
    <div class="flex justify-between items-center mt-3">
      <h1 class="font-semibold text-lg">Edit Artikel</h1>

      <BaseButton
        @click="navigateTo('/artikel')"
        class="rounded-lg flex gap-1 items-center"
        size="sm"
      >
        <IconsChevron width="14" height="14" />

        Kembali
      </BaseButton>
    </div>

    <div class="mt-4 flex justify-center rounded-lg">
      <img :src="`${baseURL}/artikel/thumbnail/${defaultThumbnail}`" alt="" />
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
        <BaseButton @click="toggleChangeThumbnail" variant="secondary">
          <IconsThumbnail width="22" height="22" />

          Ganti Thumbnail
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

        Submit Update
      </BaseButton>
    </div>
  </div>

  <Modal
    title="Ganti Thumbnail"
    v-if="changeThumbnailModal"
    @action="handleChangeThumbnail"
    @close="toggleChangeThumbnail"
  >
    <div>
      <BaseFileInput
        label="Thumbnail"
        id="thumbnail"
        placeholder="Sertakan gambar dalam format png, jpg, atau jpeg"
        v-model="thumbnail"
        :error="checkFieldError('gambar')"
        :allowed-type="['image/png', 'image/jpg', 'image/jpeg']"
      />
      <div v-for="(item, idx) in fieldError" :key="idx">
        <h1 v-if="item.path == 'thumbnail'" class="text-danger text-sm mt-1">
          {{ item.message }}
        </h1>
      </div>
    </div>
  </Modal>

  <Toast v-if="showToast" :label="toastLabel" @close="toggleToast" />
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseFileInput from "~/components/widgets/data-input/BaseFileInput.vue";
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import TiptapEditor from "~/components/widgets/editor/TiptapEditor.vue";
import Modal from "~/components/widgets/popup/Modal.vue";
import Toast from "~/components/widgets/popup/Toast.vue";
import { useMyAuthStore } from "~/store/auth";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;
const authStore = useMyAuthStore();
const axios = useAxios();

const fieldError = ref([]);

const showToast = ref(false);
const changeThumbnailModal = ref(false);

const toastLabel = ref("");

const artikelData = ref([]);

const route = useRoute();
const { id } = route.params;

const editorContent = ref("");
const id_pengguna = ref(authStore.user.id);
const title = ref("");
const thumbnail = ref(null);
const defaultThumbnail = ref("");

const triggerFileInput = () => {
  fileInput.value?.click();
};

function toggleChangeThumbnail() {
  changeThumbnailModal.value = !changeThumbnailModal.value;
}

const toggleToast = () => {
  showToast.value = !showToast.value;
};

function checkEmpty(field, fieldName) {
  if (!field.value) {
    fieldError.value.push({
      path: fieldName,
      message: "Field ini tidak boleh kosong",
    });
  }
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

  if (editorContent.value.length == 7) {
    fieldError.value.push({
      path: "content",
      message: "Content tidak boleh kosong",
    });
  }
}

const handleChangeThumbnail = async () => {
  fieldError.value = [];

  if (!thumbnail.value) {
    fieldError.value.push({
      path: "thumbnail",
      message: "Field ini tidak boleh kosong",
    });
  }

  if (thumbnail.value) {
    const payload = new FormData();

    payload.append("previousPhotoPath", defaultThumbnail.value);
    if (thumbnail.value) {
      payload.append("thumbnail", thumbnail.value);
    }

    const url = `${baseURL}/api/artikel/ganti-thumbnail/${id}`;

    const fetchGantiFoto = await fetch(url, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (fetchGantiFoto.ok) {
      loadData();
      toastLabel.value = "Berhasil update thumbnail";
      toggleChangeThumbnail();
      toggleToast();
    }
  }
};

const handleEdit = async () => {
  validate();

  if (!fieldError.value.length) {
    const url = baseURL + "/api/artikel";
    const payload = {
      title: title.value,
      content: editorContent.value,
    };

    const postRequest = await axios.patch(`/api/artikel/${id}`, payload);

    if (postRequest.status == 200) {
      toastLabel.value = "Berhasil update artikel";
      toggleToast();
    }
  }
};

async function loadData() {
  const fetchData = await axios.get(`/api/artikel/${id}`);

  if (fetchData.status == 200) {
    title.value = fetchData.data.title;
    editorContent.value = fetchData.data.content;
    defaultThumbnail.value = fetchData.data.thumbnail;
  }
}

onMounted(async () => {
  loadData();
});
</script>
