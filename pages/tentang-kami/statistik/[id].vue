<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between my-4">
      <h1 class="font-semibold text-lg">Edit Statistik</h1>
      <div>
        <BaseButton
          @click="navigateTo('/tentang-kami/statistik')"
          class="flex mr-3 gap-1 items-center"
        >
          <Icon name="lucide:chevron-left" />
          Kembali
        </BaseButton>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg shadow">
      <BaseInput type="text" label="Nama Statistik" v-model="nama_statistik" />
      <h1 class="font-semibold mt-4">Data</h1>
      <div
        v-for="(item, itemIdx) in data"
        :key="itemIdx"
        class="border-b flex flex-col last:border-b-0"
      >
        <div class="grid grid-cols-2 mt-2 pb-2 items-center relative">
          <h1>{{ item.kategori }}</h1>
          <h1>: {{ item.persentase }} %</h1>
          <BaseButton
            @click="onEditClick(item.id, item.kategori, item.persentase)"
            size="sm"
            class="w-fit absolute right-0"
            ><Icon name="lucide:edit"
          /></BaseButton>
        </div>
      </div>
    </div>
    <div class="w-full mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <BaseButton
        @click="toggleAlert"
        class="flex mr-3 gap-1 items-center"
        variant="danger"
      >
        <Icon name="lucide:trash-2" />
        Hapus Statistik
      </BaseButton>
      <BaseButton
        @click="handleSubmitPerubahan"
        class="flex mr-3 gap-1 items-center"
        variant="secondary"
      >
        <Icon name="lucide:edit" />
        Submit Perubahan
      </BaseButton>
    </div>
  </div>

  <Modal
    v-if="showEditModal"
    @close="toggleEditModal"
    @action="handleEditData"
    title="Edit Data"
  >
    <div class="flex flex-col gap-3">
      <BaseInput type="text" label="Kategori" v-model="kategori" />
      <BaseInput type="text" label="Persentase" v-model="persentase" />
    </div>
  </Modal>

  <Toast
    v-if="showToast"
    label="Berhasil Update Statistik"
    @close="toggleToast"
  />

  <Alert
    label="Yakin Menghapus Statistik?"
    v-if="showAlert"
    @cancel="toggleAlert"
    @confirm="handleDelete"
  />
</template>

<script lang="ts" setup>
import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import Modal from "~/components/widgets/popup/Modal.vue";
import type { FieldError } from "~/types/FieldError";

import { useLocalStorage } from "@/composables/useLocalStorage";
import Toast from "~/components/widgets/popup/Toast.vue";
import Alert from "~/components/widgets/popup/Alert.vue";

const { setItem, getItem, removeItem, clearLocalStorage } = useLocalStorage();

definePageMeta({
  layout: "default",
  middleware: "auth",
});

type Data = {
  id: string;
  id_statistik: string;
  kategori: string;
  persentase: string;
};

const dataId = ref("");
const kategori = ref("");
const persentase = ref("");

const fieldError = ref<FieldError[]>([]);
const axios = useAxios();

const route = useRoute();

const { id } = route.params;
const nama_statistik = ref();
const data = ref<Data[] | undefined>([]);

const showEditModal = ref(false);
const showToast = ref(false);
const showAlert = ref(false);

const dataEdited = ref(false);

function onEditClick(id: string, kategoriVal: string, persentaseVal: string) {
  dataId.value = id;
  kategori.value = kategoriVal;
  persentase.value = persentaseVal;

  toggleEditModal();
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

// function checkFieldError(field: string) {
//   const isFieldError = fieldError.value.find(
//     (element) => element.path == field
//   );
//   if (isFieldError) {
//     return true;
//   }
//   return false;
// }

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

  checkEmpty(nama_statistik, "nama_statistik");
}

function handleEditData() {
  console.log(kategori.value, persentase.value);

  // Update data di LocalStorage
  const payload = {
    kategori: kategori.value,
    persentase: persentase.value,
  };

  setItem(dataId.value, JSON.stringify(payload));
  dataEdited.value = true;

  // Update data di array untuk langsung terlihat di UI
  const index = data.value?.findIndex((item) => item.id === dataId.value);
  if (index !== undefined && index >= 0 && data.value) {
    data.value[index].kategori = payload.kategori;
    data.value[index].persentase = payload.persentase;
  }

  toggleEditModal();
}

function getAllUpdatedData() {
  if (!data.value) return [];

  return data.value.map((item) => {
    const localData = getItem(item.id);
    if (localData) {
      const parsedLocalData = JSON.parse(localData);
      return {
        ...item,
        kategori: parsedLocalData.kategori || item.kategori,
        persentase: parsedLocalData.persentase || item.persentase,
      };
    }
    return item; // Jika tidak ada data di localStorage, gunakan data asli
  });
}

async function handleSubmitPerubahan() {
  validateForm();

  const updatedData = getAllUpdatedData();

  if (!fieldError.value.length) {
    const payload = {
      nama_statistik: nama_statistik.value,
      data: updatedData,
    };

    console.log(payload);

    const updateRequest = await axios.patch(`/api/statistik/${id}`, payload);

    if (updateRequest.status == 200) {
      toggleToast();
    }
  }
}

async function handleDelete() {
  const deleteRequest = await axios.delete(`/api/statistik/${id}`);

  if (deleteRequest.status == 200) {
    navigateTo("/tentang-kami/statistik");
  }
}

onMounted(async () => {
  const fetchData = await axios.get(`/api/statistik/${id}`);
  if (fetchData.status === 200) {
    nama_statistik.value = fetchData.data.nama_statistik;

    data.value = fetchData.data.data.map((item: Data) => {
      const localData = getItem(item.id);
      if (localData) {
        const parsedLocalData = JSON.parse(localData);
        return {
          ...item,
          kategori: parsedLocalData.kategori || item.kategori,
          persentase: parsedLocalData.persentase || item.persentase,
        };
      }

      return item;
    });
  }
});

onBeforeRouteLeave(() => {
  if (process.client) {
    clearLocalStorage();
  }
});
</script>
