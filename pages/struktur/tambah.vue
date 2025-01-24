<template>
  <div class="w-full flex flex-col">
    <h1 class="font-semibold text-lg mb-4">Struktur</h1>

    <div
      class="rounded-t-lg flex items-center justify-between px-4 py-3 bg-gray-50 border-b"
    >
      <h1>Input Orang</h1>
      <BaseButton
        @click="navigateTo('/struktur')"
        class="rounded-lg flex gap-1 items-center"
        size="sm"
      >
        <IconsChevron width="14" height="14" />
        Kembali
      </BaseButton>
    </div>
    <div class="bg-white shadow rounded-b-lg p-4 flex flex-col gap-4">
      <div>
        <BaseInput
          label="Nama Lengkap"
          type="text"
          :error="checkFieldError('nama')"
          v-model="nama"
        />
        <div v-for="(item, idx) in fieldError" :key="idx">
          <h1 v-if="item.path == 'nama'" class="text-danger text-sm mt-1">
            {{ item.message }}
          </h1>
        </div>
      </div>
      <div>
        <BaseTextArea
          label="Deskripsi"
          :error="checkFieldError('deskripsi')"
          v-model="deskripsi"
          height="h-40"
        />

        <div v-for="(item, idx) in fieldError" :key="idx">
          <h1 v-if="item.path == 'deskripsi'" class="text-danger text-sm mt-1">
            {{ item.message }}
          </h1>
        </div>
      </div>
      <div>
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
      </div>

      <div class="flex justify-between items-center">
        <BaseButton class="rounded-lg" @click="handleSubmit">Submit</BaseButton>
        <h1 v-if="post_success" class="text-green font-semibold">
          Berhasil Input Data
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
import BaseFileInput from "~/components/widgets/data-input/BaseFileInput.vue";
import BaseInput from "~/components/widgets/data-input/BaseInput.vue";
import BaseTextArea from "~/components/widgets/data-input/BaseTextArea.vue";
import { useMyAuthStore } from "~/store/auth";
import { useMyStrukturStore } from "~/store/struktur";

import type { FieldError } from "~/types/FieldError";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;

const authStore = useMyAuthStore();
const strukturStore = useMyStrukturStore();

const fieldError = ref<FieldError[]>([]);

const post_success = ref(false);

const nama = ref("");
const deskripsi = ref("");
const gambar = ref<File | null>(null);

function checkEmpty(field: Ref<string>, fieldName: string) {
  if (!field.value) {
    fieldError.value.push({
      path: fieldName,
      message: "Field ini tidak boleh kosong",
    });
  }
}

function resetForm() {
  nama.value = "";
  deskripsi.value = "";
  gambar.value = null;
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

  checkEmpty(nama, "nama");
  checkEmpty(deskripsi, "deskripsi");

  if (!gambar.value) {
    fieldError.value.push({
      path: "gambar",
      message: "Mohon sertakan gambar",
    });
  }
}

async function handleSubmit() {
  validateForm();
  post_success.value = false;

  if (!fieldError.value.length) {
    const payload = new FormData();

    payload.append("nama", nama.value);
    payload.append("deskripsi", deskripsi.value);
    if (gambar.value) {
      payload.append("gambar", gambar.value);
    }

    const url = baseURL + "/api/struktur";
    const postRequest = await fetch(url, {
      method: "POST",
      body: payload,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (postRequest.ok) {
      resetForm();
      post_success.value = true;
    } else {
      post_success.value = false;
      const response = await postRequest.json();
      console.log(response);
    }
  }
}
</script>
