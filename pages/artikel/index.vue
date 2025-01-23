<template>
  <div class="w-full">
    <h1 class="font-semibold text-lg">Artikel</h1>

    <div
      class="bg-slate-100 flex justify-between items-center border-b rounded-t-lg px-4 py-3 mt-4"
    >
      <h1>Daftar Artikel</h1>

      <BaseButton
        @click="navigateTo('/artikel/tambah')"
        class="rounded-lg flex gap-1 items-center"
        size="sm"
      >
        <Icon name="ic:round-plus" />
        Tulis Artikel
      </BaseButton>
    </div>
    <div class="bg-white shadow rounded-b-lg p-5">
      <BaseTable
        :headers="artikelStore.tableHeaders"
        :data="artikelStore.data"
        :loading="artikelStore.loading"
        :show-row-numbers="true"
        :show-button-action="true"
        :actions="actions"
        :columns-visible="['title', 'content', 'thumbnail', 'like', 'dislike']"
      />

      <BasePagination
        :model-value="perPage"
        :current-page="artikelStore.currentPage"
        :total-pages="artikelStore.totalPages"
        :total-datas="artikelStore.totalDatas"
        :per-page="artikelStore.perPage"
        @page-change="handlePageChange"
        @perpage-change="handlePerPageChange"
      />
    </div>
  </div>

  <Alert
    v-if="showAlert"
    :label="alertLabel"
    @cancel="toggleAlert"
    @confirm="handleHapus"
  />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BasePagination from "~/components/widgets/datatable/BasePagination.vue";
import BaseTable from "~/components/widgets/datatable/BaseTable.vue";
import Alert from "~/components/widgets/popup/Alert.vue";
import { useMyArtikelStore } from "~/store/artikel";
import { useMyGaleriStore } from "~/store/galeri";
import { useMyProgramAcaraStore } from "~/store/program-acara";
import { useMyStatistikStore } from "~/store/statistik";
import { useMyStrukturStore } from "~/store/struktur";

const artikelStore = useMyArtikelStore();
const galleryStore = useMyGaleriStore();
const programAcaraStore = useMyProgramAcaraStore();
const statistikStore = useMyStatistikStore();
const strukturStore = useMyStrukturStore();
const axios = useAxios();

const search = ref("");
const perPage = ref(artikelStore.perPage);

const id = ref("");

const alertLabel = ref("");
const toastLabel = ref("");

const showToast = ref(false);
const showAlert = ref(false);

const loadData = () => {
  const payload = {
    search: search.value,
    per_page: artikelStore.perPage,
    page: artikelStore.currentPage,
  };
  artikelStore.getData(payload).then((res) => {});
};

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

function toggleToast() {
  showToast.value = !showToast.value;
}

function toggleAlert() {
  showAlert.value = !showAlert.value;
}

function onEditClick(row: any) {
  navigateTo(`/artikel/${row.id}`);
}

function onHapusClick(row: any) {
  id.value = row.id;
  alertLabel.value = `Anda yakin menghapus artikel? ?`;
  toggleAlert();
}

async function handleHapus() {
  const deleteRequest = await axios.delete(`/api/artikel/${id.value}`);

  console.log(deleteRequest);

  if (deleteRequest.status == 200) {
    loadData();
    toastLabel.value = "Berhasil menghapus artikel";
    toggleAlert();
    toggleToast();
  }
}

const handlePageChange = (page: any) => {
  artikelStore.currentPage = page;
  loadData();
};

const handlePerPageChange = (value: any) => {
  artikelStore.perPage = value;
  loadData();
};

watch(search, () => {
  loadData();
});

onMounted(async () => {
  loadData();
});
</script>
