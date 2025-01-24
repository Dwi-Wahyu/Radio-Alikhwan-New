<template>
  <div class="w-full flex flex-col">
    <h1 class="font-semibold text-lg mb-4">Galeri</h1>

    <div
      class="rounded-t-lg flex items-center justify-between px-4 py-3 bg-gray-50 border-b"
    >
      <h1>Daftar Galeri</h1>

      <BaseButton
        @click="toggleModal"
        class="rounded-lg group flex gap-1 items-center"
        size="sm"
      >
        <IconsPlus />

        Input Gambar
      </BaseButton>
    </div>
    <div class="rounded-b-lg bg-white px-4 py-3 shadow">
      <BaseTable
        :headers="galeriStore.tableHeaders"
        :data="galeriStore.data"
        :loading="galeriStore.loading"
        :show-row-numbers="false"
        :show-button-action="true"
        :actions="actions"
        :columns-visible="['img:path:galeri', 'status', 'uploadedAt']"
      />

      <BasePagination
        :model-value="perPage"
        :current-page="galeriStore.currentPage"
        :total-pages="galeriStore.totalPages"
        :total-datas="galeriStore.totalDatas"
        :per-page="galeriStore.perPage"
        @page-change="handlePageChange"
        @perpage-change="handlePerPageChange"
      />
    </div>
  </div>

  <Modal
    v-if="showModal"
    title="Input Gambar"
    @action="handleSubmit"
    @close="toggleModal"
  >
    <BaseFileInput
      label="Gambar"
      id="gambar"
      placeholder="Sertakan gambar dalam format png, jpg, atau jpeg"
      v-model="gambar"
      :error="checkFieldError('gambar')"
      :allowed-type="['image/png', 'image/jpg', 'image/jpeg']"
    />
    <div v-for="(item, idx) in fieldError" :key="idx">
      <h1 v-if="item.path == 'gambar'" class="text-danger text-sm mt-1">
        {{ item.message }}
      </h1>
    </div>
  </Modal>

  <Alert
    v-if="showAlert"
    :label="alertLabel"
    @cancel="toggleAlert"
    @confirm="handleConfirmAlert"
    :action-label="alertActionButton"
  />

  <Toast v-if="showToast" :label="toastLabel" @close="toggleToast" />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

import Copy from "~/components/icons/Copy.vue";
import Eye from "~/components/icons/Eye.vue";
import Trash from "~/components/icons/Trash.vue";
import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseFileInput from "~/components/widgets/data-input/BaseFileInput.vue";
import BasePagination from "~/components/widgets/datatable/BasePagination.vue";
import BaseTable from "~/components/widgets/datatable/BaseTable.vue";
import Alert from "~/components/widgets/popup/Alert.vue";
import Modal from "~/components/widgets/popup/Modal.vue";
import Toast from "~/components/widgets/popup/Toast.vue";
import { useMyAuthStore } from "~/store/auth";
import { useMyGaleriStore } from "~/store/galeri";
import type { FieldError } from "~/types/FieldError";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;
const gambar = ref<File | null>(null);
const axios = useAxios();

const authStore = useMyAuthStore();
const galeriStore = useMyGaleriStore();

const { perPage } = storeToRefs(galeriStore);
const search = ref("");

const id = ref("");

const fieldError = ref<FieldError[]>([]);
const showModal = ref(false);

const showToast = ref(false);
const toastLabel = ref("");
const showAlert = ref(false);
const alertLabel = ref("");
const alertAction = ref("");
const alertActionButton = ref("");

function toggleToast() {
  showToast.value = !showToast.value;
}

function toggleModal() {
  showModal.value = !showModal.value;
}

function toggleAlert() {
  showAlert.value = !showAlert.value;
}

const actions = [
  {
    label: "Copy Url",
    onClick: onCopyClick,
    btnVariant: "primary",
    icon: Copy,
  },
  {
    label: "Hapus",
    onClick: onHapusClick,
    btnVariant: "danger",
    icon: Trash,
  },
  {
    label: "Toggle Tampilkan",
    onClick: onTampilkanClick,
    btnVariant: "secondary",
    icon: Eye,
  },
];

function onCopyClick(row: any) {
  const url = baseURL + "/galeri/" + row.path;

  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("URL telah disalin ke clipboard!");
    })
    .catch((err) => {
      console.error("Gagal menyalin URL: ", err);
    });
}

function onTampilkanClick(row: any) {
  id.value = row.id;
  alertLabel.value = `Tampilkan foto ${row.path} ke landing page?`;
  alertAction.value = "tampilkan";
  alertActionButton.value = "Tampilkan";
  toggleAlert();
}

function onHapusClick(row: any) {
  id.value = row.id;
  alertLabel.value = `Anda yakin menghapus \n ${row.path} ?`;
  alertAction.value = "hapus";
  alertActionButton.value = "Hapus";
  toggleAlert();
}

async function handleHapus() {
  const deleteRequest = await axios.delete(`/api/galeri/${id.value}`);

  if (deleteRequest.status == 200) {
    loadData();
    toggleAlert();
    toastLabel.value = "Berhasil menghapus foto";
    toggleToast();
  }
}

async function handleTampilkan() {
  const tampilkanRequest = await axios.patch(
    `/api/galeri/toggle-tampilkan/${id.value}`
  );

  if (tampilkanRequest.status == 200) {
    loadData();
    toggleAlert();
    toastLabel.value = "Berhasil menampilkan foto";
    toggleToast();
  }
}

async function handleConfirmAlert() {
  if (alertAction.value === "hapus") {
    handleHapus();
  } else {
    handleTampilkan();
  }
}

function validateGambar() {
  fieldError.value = [];

  if (!gambar.value) {
    fieldError.value.push({
      path: "gambar",
      message: "Mohon Sertakan Gambar",
    });

    return;
  }
}

function checkFieldError(field: string) {
  const isFieldError = fieldError.value.find(
    (element) => element.path == field
  );
  if (isFieldError) {
    return true;
  }
  return false;
}

async function handleSubmit() {
  validateGambar();

  if (!fieldError.value.length) {
    const url = baseURL + "/api/galeri";
    const payload = new FormData();
    if (gambar.value) {
      payload.append("gambar", gambar.value);
    }

    const postRequest = await fetch(url, {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (postRequest.ok) {
      toastLabel.value = "Berhasil input gambar";
      loadData();
      toggleModal();
      toggleToast();
    }
  }
}

const loadData = () => {
  const payload = {
    search: search.value,
    per_page: galeriStore.perPage,
    page: galeriStore.currentPage,
  };
  galeriStore.getData(payload).then((res) => {});
};

const handlePageChange = (page: any) => {
  galeriStore.currentPage = page;
  loadData();
};

const handlePerPageChange = (value: any) => {
  galeriStore.perPage = value;
  loadData();
};

watch(search, () => {
  loadData();
});

onMounted(async () => {
  loadData();
});
</script>
