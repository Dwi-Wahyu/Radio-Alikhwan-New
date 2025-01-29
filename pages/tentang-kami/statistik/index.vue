<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between my-4">
      <h1 class="font-semibold text-lg">Statistik</h1>
      <div>
        <BaseButton
          @click="toggleInputStatisticForm"
          class="flex mr-3 gap-1 items-center"
        >
          <IconsChevron
            width="15"
            height="15"
            :class="showInputStatistic ? 'rotate-90' : '-rotate-90'"
          />

          Input Statistik
        </BaseButton>
        <BaseButton
          @click="toggleInputDataForm"
          class="flex gap-1 items-center"
        >
          <IconsChevron
            width="15"
            height="15"
            :class="showInputData ? 'rotate-90' : '-rotate-90'"
          />

          Input Data Statistik
        </BaseButton>
      </div>
    </div>

    <div ref="parent">
      <div
        v-if="showInputStatistic"
        class="bg-white shadow rounded-lg p-4 flex flex-col gap-4"
      >
        <div>
          <label for="" class="font-semibold text-sm block mb-2">
            Nama Statistik
          </label>
          <div class="flex gap-3 items-center">
            <BaseInput
              type="text"
              :error="checkFieldError('nama_statistik')"
              v-model="nama_statistik"
              class="flex-grow"
            />
            <BaseButton class="rounded-lg" @click="handleSubmitStatistics">
              <IconsPlus class="mr-1" />

              Submit
            </BaseButton>
          </div>
          <h1 v-if="post_success" class="text-green font-semibold mt-1">
            Berhasil Input Statistik
          </h1>
          <div v-for="(item, idx) in fieldError" :key="idx">
            <h1
              v-if="item.path == 'nama_statistik'"
              class="text-danger text-sm mt-1"
            >
              {{ item.message }}
            </h1>
          </div>
        </div>
      </div>

      <div
        v-if="showInputData"
        class="bg-white shadow rounded-lg p-4 flex flex-col gap-4"
      >
        <div>
          <BaseSelect
            class="block w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            label="Nama Statistik"
            id="id_statistik"
            :options="statistikStore.statistikData"
            :model-value="id_statistik"
            @update:model-value="changeIdStatistik"
          >
            <option
              v-for="(option, idx) in statistikStore.statistikData"
              :key="idx"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </BaseSelect>
          <div v-for="(item, idx) in fieldError" :key="idx">
            <h1
              v-if="item.path == 'id_statistik'"
              class="text-danger text-sm mt-1"
            >
              {{ item.message }}
            </h1>
          </div>
        </div>
        <div>
          <BaseInput
            label="Kategori"
            type="text"
            :error="checkFieldError('kategori')"
            v-model="kategori"
          />
          <div v-for="(item, idx) in fieldError" :key="idx">
            <h1 v-if="item.path == 'kategori'" class="text-danger text-sm mt-1">
              {{ item.message }}
            </h1>
          </div>
        </div>
        <div>
          <BaseInput
            label="Persentase"
            type="number"
            :error="checkFieldError('persentase')"
            v-model="persentase"
          />
          <div v-for="(item, idx) in fieldError" :key="idx">
            <h1
              v-if="item.path == 'persentase'"
              class="text-danger text-sm mt-1"
            >
              {{ item.message }}
            </h1>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <BaseButton class="rounded-lg" @click="handleSubmitData">
            <IconsPlus class="mr-1" />

            Submit
          </BaseButton>
          <h1 v-if="post_success" class="text-green font-semibold">
            Berhasil Input Data
          </h1>
        </div>
      </div>
    </div>

    <div
      v-if="!statistikStore.data.length"
      class="px-4 py-3 flex-col gap-3 bg-white h-40 shadow flex items-center justify-center rounded-lg"
    >
      <IconsEmpty />
      <h1 class="font-semibold">Belum Ada Statistik</h1>
    </div>

    <div class="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div
        v-for="(statistik, statistikIdx) in statistikStore.data"
        :key="statistikIdx"
      >
        <div
          class="bg-gray-50 flex justify-between items-center border-b rounded-t-lg px-4 py-3"
        >
          <h1 class="font-semibold">{{ statistik.nama_statistik }}</h1>
          <button
            @click="
              navigateTo(`/tentang-kami/statistik/${statistik.id_statistik}`)
            "
          >
            <IconsSettings />
          </button>
        </div>
        <div
          v-if="statistikStore.data"
          class="bg-white text-black items-center shadow rounded-b-lg p-4 flex flex-col gap-4"
        >
          <Charts
            v-if="statistik.chartData.labels.length"
            :chart-data="statistik.chartData"
            legendTextColor="black"
          />

          <div v-else>
            <IconsDataEmpty />
            <h1>Belum Ada Data</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

import { useAutoAnimate } from "@formkit/auto-animate/vue";
import Charts from "~/components/landing/Charts.vue";
import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import BaseSelect from "~/components/widgets/data-input/BaseSelect.vue";
import { useMyStatistikStore } from "~/store/statistik";
import type { FieldError } from "~/types/FieldError";

const [parent] = useAutoAnimate();

const statistikStore = useMyStatistikStore();

const fieldError = ref<FieldError[]>([]);

const { post_success } = storeToRefs(statistikStore);

const id_statistik = ref("");
const nama_statistik = ref("");
const kategori = ref("");
const persentase = ref("");

const statisticOptions = ref(statistikStore.statistikData);

const showInputData = ref(false);
const showInputStatistic = ref(false);

function changeIdStatistik(value: string) {
  id_statistik.value = value;
}

function toggleInputDataForm() {
  if (showInputStatistic.value) {
    showInputStatistic.value = false;
  }

  showInputData.value = !showInputData.value;
}

function toggleInputStatisticForm() {
  if (showInputData.value) {
    showInputData.value = false;
  }

  showInputStatistic.value = !showInputStatistic.value;
}

function checkEmpty(field: Ref<string>, fieldName: string) {
  if (!field.value) {
    fieldError.value.push({
      path: fieldName,
      message: "Field ini tidak boleh kosong",
    });
  }
}

function resetForm() {
  id_statistik.value = "";
  kategori.value = "";
  persentase.value = "";
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

  checkEmpty(id_statistik, "id_statistik");
  checkEmpty(kategori, "kategori");
  checkEmpty(persentase, "persentase");
}

async function handleSubmitStatistics() {
  fieldError.value = [];

  post_success.value = false;
  if (!nama_statistik.value) {
    fieldError.value.push({
      path: "nama_statistik",
      message: "Field ini tidak boleh kosong",
    });
  }

  if (!fieldError.value.length) {
    const payload = {
      nama_statistik: nama_statistik.value,
    };

    statistikStore.createStatistic(payload).then((val) => {
      nama_statistik.value = "";
      loadData();
    });
  }
}

async function handleSubmitData() {
  validateForm();
  post_success.value = false;

  if (!fieldError.value.length) {
    const payload = {
      id_statistik: id_statistik.value,
      kategori: kategori.value,
      persentase: persentase.value,
    };

    statistikStore.sendData(payload).then((val) => {
      resetForm();
      loadData();
    });
  }
}

function loadData() {
  statistikStore.getData().then((val) => {});

  console.log(statistikStore.data);
}

onBeforeMount(() => {
  loadData();
});
</script>
