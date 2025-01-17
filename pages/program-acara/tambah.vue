<template>
  <div class="w-full flex flex-col">
    <h1 class="font-semibold text-lg mb-4">Program Acara</h1>

    <div
      class="rounded-t-lg flex items-center justify-between px-4 py-3 bg-gray-50 border-b"
    >
      <h1>Input Program Acara</h1>
      <BaseButton
        @click="navigateTo('/program-acara')"
        class="rounded-lg flex items-center gap-1"
        size="sm"
      >
        <Icon name="mdi:chevron-left" />

        Kembali
      </BaseButton>
    </div>
    <div class="bg-white shadow rounded-b-lg p-4 flex flex-col gap-4">
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

      <div class="flex justify-between items-center">
        <BaseButton class="rounded-lg" @click="handleSubmit">Submit</BaseButton>
        <h1 v-if="post_success" class="text-green font-semibold">
          Berhasil Input Program Acara
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import { useMyProgramAcaraStore } from "~/store/program-acara";
import type { FieldError } from "~/types/FieldError";

const programAcaraStore = useMyProgramAcaraStore();

const fieldError = ref<FieldError[]>([]);

const { post_success } = storeToRefs(programAcaraStore);

const judul = ref("");
const mulai = ref("");
const selesai = ref("");

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

async function handleSubmit() {
  validateForm();
  post_success.value = false;

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

    programAcaraStore.sendData(payload).then((val) => {
      resetForm();
    });
  }
}
</script>
