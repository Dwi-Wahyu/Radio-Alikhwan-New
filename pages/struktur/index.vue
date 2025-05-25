<template>
  <div class="flex flex-col w-full">
    <div class="flex items-center justify-between mb-4 mt-2">
      <h1 class="font-semibold text-lg">Struktur Perusahaan</h1>
      <BaseButton
        @click="navigateTo('/struktur/tambah')"
        class="rounded-lg flex gap-1 items-center"
        size="sm"
      >
        <IconsPlus width="14" height="14" />
        Tambahkan Tim
      </BaseButton>
    </div>

    <div
      v-if="!strukturStore.data.length"
      class="px-4 py-3 flex-col gap-3 bg-white h-40 shadow flex items-center justify-center rounded-lg"
    >
      <IconsEmpty />
      <h1 class="font-semibold">Belum Ada Struktur</h1>
    </div>

    <div
      v-if="strukturStore.data"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div
        v-for="(orang, orangIdx) in strukturStore.data"
        :key="orangIdx"
        class="bg-white shadow p-4 rounded-lg flex flex-col md:flex-row gap-4"
      >
        <!-- Bagian Gambar - Diperbaiki -->
        <div class="relative group w-full md:w-40 h-40 flex-shrink-0">
          <div
            @click="onEditPhotoClick(orang.id, orang.gambar)"
            class="w-full h-full bg-black/50 absolute inset-0 group-hover:flex hidden items-center justify-center flex-col gap-1 rounded-lg cursor-pointer transition-all duration-200"
          >
            <IconsPhoto class="text-white" />
            <h1 class="text-white font-semibold text-sm">Ganti Foto</h1>
          </div>
          <img
            :src="`${baseURL}/struktur/${orang.gambar}`"
            class="relative z-20 w-full h-full object-cover rounded-lg"
            :alt="`Foto ${orang.nama}`"
          />
        </div>

        <!-- Bagian Konten -->
        <div class="flex flex-col justify-between flex-1">
          <div>
            <h1 class="font-semibold text-lg">{{ orang.nama }}</h1>
            <p class="text-gray-600 text-sm mt-1">{{ orang.deskripsi }}</p>
          </div>

          <div class="flex gap-2 mt-4">
            <BaseButton
              class="flex items-center gap-1"
              variant="secondary"
              @click="onEditClick(orang)"
            >
              <IconsEdit />
              Edit
            </BaseButton>
            <BaseButton
              class="flex items-center gap-1"
              variant="danger"
              @click="onHapusClick(orang)"
            >
              <IconsTrash />
              Hapus
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal dan komponen lainnya tetap sama -->
  <Modal
    title="Edit Data"
    v-if="showEditModal"
    @action="handleEdit"
    @close="toggleEditModal"
  >
    <!-- ... -->
  </Modal>

  <Modal
    title="Ganti Foto"
    v-if="changeFotoModal"
    @action="handleGantiFoto"
    @close="toggleFotoModal"
  >
    <!-- ... -->
  </Modal>

  <Alert
    v-if="showAlert"
    :label="alertLabel"
    @cancel="toggleAlert"
    @confirm="handleDelete"
  />

  <Toast v-if="showToast" :label="toastLabel" @close="toggleToast" />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseFileInput from "~/components/widgets/data-input/BaseFileInput.vue";
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import BaseTextArea from "~/components/widgets/data-input/BaseTextArea.vue";
import Alert from "~/components/widgets/popup/Alert.vue";
import Modal from "~/components/widgets/popup/Modal.vue";
import Toast from "~/components/widgets/popup/Toast.vue";
import { useMyAuthStore } from "~/store/auth";
import { useMyStrukturStore, type Struktur } from "~/store/struktur";
import type { FieldError } from "~/types/FieldError";

const strukturStore = useMyStrukturStore();
const authStore = useMyAuthStore();

const dataStruktur = ref<Struktur[]>(strukturStore.data);
const axios = useAxios();

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;

const id = ref("");
const nama = ref("");
const deskripsi = ref("");
const gambar = ref<File | null>(null);
const previousPhotoPath = ref("");

const fieldError = ref<FieldError[]>([]);

const showEditModal = ref(false);
const changeFotoModal = ref(false);
const showToast = ref(false);
const showAlert = ref(false);

const alertLabel = ref("");
const toastLabel = ref("");

function toggleFotoModal() {
  changeFotoModal.value = !changeFotoModal.value;
}

function toggleEditModal() {
  showEditModal.value = !showEditModal.value;
}

function toggleToast() {
  showToast.value = !showToast.value;
}

function toggleAlert() {
  showAlert.value = !showAlert.value;
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

function checkEmpty(field: Ref<string>, fieldName: string) {
  if (!field.value) {
    fieldError.value.push({
      path: fieldName,
      message: "Field ini tidak boleh kosong",
    });
  }
}

function validateForm() {
  fieldError.value = [];

  checkEmpty(nama, "nama");
  checkEmpty(deskripsi, "deskripsi");
}

function onEditPhotoClick(idOrang: string, gambar: string) {
  id.value = idOrang;
  previousPhotoPath.value = gambar;

  toggleFotoModal();
}

function onEditClick(row: any) {
  id.value = row.id;
  nama.value = row.nama;
  deskripsi.value = row.deskripsi;
  toggleEditModal();
}

function onHapusClick(row: any) {
  id.value = row.id;
  alertLabel.value = `Anda yakin menghapus data ${row.nama} ?`;
  toggleAlert();
}

async function handleDelete() {
  const deleteRequest = await axios.delete(`/api/struktur/${id.value}`);

  console.log(deleteRequest);

  if (deleteRequest.status == 200) {
    toastLabel.value = deleteRequest.data;
    loadData();
    toggleAlert();
    toggleToast();
  }
}

async function handleEdit() {
  validateForm();

  if (!fieldError.value.length) {
    const payload = {
      nama: nama.value,
      deskripsi: deskripsi.value,
    };

    const updateRequest = await axios.patch(
      `/api/struktur/${id.value}`,
      payload
    );

    if (updateRequest.status == 200) {
      loadData();
      toggleEditModal();
    }
  }
}

async function handleGantiFoto() {
  fieldError.value = [];

  if (!gambar.value) {
    fieldError.value.push({
      path: "gambar",
      message: "Field ini tidak boleh kosong",
    });
  }

  if (!fieldError.value.length) {
    const payload = new FormData();

    payload.append("previousPhotoPath", previousPhotoPath.value);
    if (gambar.value) {
      payload.append("gambar", gambar.value);
    }

    const url = `${baseURL}/api/struktur/ganti-foto/${id.value}`;

    const fetchGantiFoto = await fetch(url, {
      method: "PATCH",
      body: payload,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (fetchGantiFoto.ok) {
      loadData();
      toggleFotoModal();
    }
  }
}

async function loadData() {
  strukturStore.getData().then((value: any) => {});

  const getAllStruktur = await axios.get("/api/struktur");
}

onMounted(async () => {
  loadData();
});
</script>
