<template>
  <div class="w-full flex flex-col">
    <h1 class="font-semibold text-lg mb-4">Program Acara</h1>

    <div
      class="rounded-t-lg flex items-center justify-between px-4 py-3 bg-gray-50 border-b"
    >
      <h1>Daftar Program Acara</h1>
      <BaseButton
        @click="navigateTo('/program-acara/tambah')"
        class="rounded-lg flex items-center gap-1"
        size="sm"
      >
        <Icon name="ic:round-plus" />

        Input Program Acara
      </BaseButton>
    </div>
    <div class="bg-white shadow rounded-b-lg p-4">
      <BaseTable
        :headers="programAcaraStore.tableHeaders"
        :data="programAcaraStore.data"
        :loading="!programAcaraStore.loading"
        :show-row-numbers="true"
        :show-button-action="true"
        :actions="actions"
        :columns-visible="['judul', 'mulai', 'selesai']"
      />

      <BasePagination
        :model-value="perPage"
        :current-page="programAcaraStore.currentPage"
        :total-pages="programAcaraStore.totalPages"
        :total-datas="programAcaraStore.totalDatas"
        :per-page="programAcaraStore.perPage"
        @page-change="handlePageChange"
        @perpage-change="handlePerPageChange"
      />
    </div>
  </div>

  <Modal
    title="Edit Program Acara"
    v-if="showEditModal"
    @action="handleEdit"
    @close="toggleEditModal"
  >
    <div class="flex flex-col gap-4">
      <div>
        <BaseInput
          label="Judul"
          type="text"
          :error="checkFieldError('judul')"
          v-model="judul"
        />
        <div v-for="(item, idx) in fieldError" :key="idx">
          <h1 v-if="item.path == 'judul'" class="text-danger text-sm mt-1">
            {{ item.message }}
          </h1>
        </div>
      </div>
      <div>
        <BaseInput
          label="Mulai"
          type="time"
          :error="checkFieldError('mulai')"
          v-model="mulai"
        />
        <div v-for="(item, idx) in fieldError" :key="idx">
          <h1 v-if="item.path == 'mulai'" class="text-danger text-sm mt-1">
            {{ item.message }}
          </h1>
        </div>
      </div>
      <div>
        <BaseInput
          label="Selesai"
          type="time"
          :error="checkFieldError('selesai')"
          v-model="selesai"
        />
        <div v-for="(item, idx) in fieldError" :key="idx">
          <h1 v-if="item.path == 'selesai'" class="text-danger text-sm mt-1">
            {{ item.message }}
          </h1>
        </div>
      </div>
    </div>
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
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import BasePagination from "~/components/widgets/datatable/BasePagination.vue";
import BaseTable from "~/components/widgets/datatable/BaseTable.vue";
import Alert from "~/components/widgets/popup/Alert.vue";
import Modal from "~/components/widgets/popup/Modal.vue";
import Toast from "~/components/widgets/popup/Toast.vue";
import { useMyProgramAcaraStore } from "~/store/program-acara";
import type { FieldError } from "~/types/FieldError";

const programAcaraStore = useMyProgramAcaraStore();
const axios = useAxios();

const search = ref("");
const perPage = ref(programAcaraStore.perPage);

const id = ref("");
const judul = ref("");
const mulai = ref("");
const selesai = ref("");

const alertLabel = ref("");
const toastLabel = ref("");

const fieldError = ref<FieldError[]>([]);

const showEditModal = ref(false);
const showToast = ref(false);
const showAlert = ref(false);

const actions = [
  {
    label: "Edit",
    onClick: onEditClick,
    btnVariant: "primary",
    icon: "lucide:edit",
  },
  {
    label: "Hapus",
    onClick: onHapusClick,
    btnVariant: "danger",
    icon: "mdi:trash-outline",
  },
];

function checkEmpty(field: Ref<string>, fieldName: string) {
  if (!field.value) {
    console.log(fieldName);

    fieldError.value.push({
      path: fieldName,
      message: "Field ini tidak boleh kosong",
    });
  }
}

function resetForm() {
  judul.value = "";
  mulai.value = "";
  selesai.value = "";
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

function validateForm() {
  fieldError.value = [];

  checkEmpty(judul, "judul");
  checkEmpty(mulai, "mulai");
  checkEmpty(selesai, "selesai");
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

function onEditClick(row: any) {
  id.value = row.id;
  judul.value = row.judul;
  mulai.value = row.mulai;
  selesai.value = row.selesai;
  toggleEditModal();
}

function onHapusClick(row: any) {
  id.value = row.id;
  alertLabel.value = `Anda yakin menghapus ${row.judul} ?`;
  toggleAlert();
}

async function handleDelete() {
  const deleteRequest = await axios.delete(`/api/program-acara/${id.value}`);

  console.log(deleteRequest);

  if (deleteRequest.status == 200) {
    loadData();
    toastLabel.value = "Berhasil menghapus program acara";
    toggleAlert();
    toggleToast();
  }
}

async function handleEdit() {
  validateForm();

  if (!fieldError.value.length) {
    const splitStart = mulai.value.split(":");
    const startHour = parseInt(splitStart[0]);
    const startMinute = parseInt(splitStart[1]);
    const startTime = new Date(2025, 1, 1, startHour, startMinute);

    const payload = {
      judul: judul.value,
      mulai: mulai.value,
      selesai: selesai.value,
      startTime,
    };

    const updateRequest = await axios.patch(
      `/api/program-acara/${id.value}`,
      payload
    );

    console.log(updateRequest);

    if (updateRequest.status == 200) {
      loadData();
      toastLabel.value = "Berhasil menghapus program acara";
      toggleToast();
    }
  }

  toggleEditModal();
}

const loadData = () => {
  const payload = {
    search: search.value,
    per_page: programAcaraStore.perPage,
    page: programAcaraStore.currentPage,
  };
  programAcaraStore.getData(payload).then((res) => {});
};

const handlePageChange = (page: any) => {
  programAcaraStore.currentPage = page;
  loadData();
};

const handlePerPageChange = (value: any) => {
  programAcaraStore.perPage = value;
  loadData();
};

watch(search, () => {
  loadData();
});

onMounted(async () => {
  loadData();
});
</script>
