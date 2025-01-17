<template>
  <div class="w-full flex flex-col">
    <h1 class="font-semibold text-lg mb-4">Kata Sambutan</h1>

    <div class="bg-white shadow rounded-t-lg p-4">
      <BaseTextArea v-model="content" :error="error" />
    </div>
    <div
      class="rounded-b-lg bg-gray-50 shadow p-4 justify-between flex items-center border-t"
    >
      <BaseButton class="rounded-lg" @click="handleSubmit">Submit</BaseButton>

      <h1 v-if="error" class="text-red-600 font-semibold">
        Kata Sambutan Tidak Boleh Kosong
      </h1>
      <h1 v-if="success" class="text-green font-semibold">
        Berhasil Update Kata Sambutan
      </h1>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

import BaseButton from "~/components/widgets/button/BaseButton.vue";
import BaseTextArea from "~/components/widgets/data-input/BaseTextArea.vue";

const id = ref("");
const content = ref("");
const error = ref(false);
const axios = useAxios();
const success = ref(false);

async function handleSubmit() {
  error.value = false;
  success.value = false;

  if (!content.value) {
    error.value = true;
  } else {
    const payload = {
      content: content.value,
    };

    const updateRequest = await axios.patch(
      `/api/kata-sambutan/${id.value}`,
      payload
    );

    if (updateRequest.status == 200) {
      success.value = true;
    } else {
      error.value = true;
    }
  }
}

onMounted(async () => {
  try {
    const getKataSambutan = await axios.get("/api/kata-sambutan");

    content.value = getKataSambutan.data.content;
    id.value = getKataSambutan.data.id;
  } catch (error) {
    console.log(error);
  }
});
</script>
