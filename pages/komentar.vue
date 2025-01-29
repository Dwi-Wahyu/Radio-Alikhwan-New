<template>
  <div class="w-full flex flex-col">
    <h1 class="font-semibold text-lg mb-4">Komentar Tentang Radio</h1>

    <div
      v-if="!komentarData.length"
      class="px-4 py-3 flex-col gap-3 bg-white h-40 shadow flex items-center justify-center rounded-lg"
    >
      <IconsEmpty />
      <h1 class="font-semibold">Belum Ada Komentar</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <KomentarCard
        v-for="(komentar, komentarIdx) in komentarData"
        :key="komentarIdx"
        :komentar="komentar"
        @invalidate="onInvalidate"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});

const axios = useAxios();

const komentarData = ref([]);

function onInvalidate() {
  fetchData();
}

async function fetchData() {
  const request = await axios.get("/api/komentar");

  if (request.status == 200) {
    komentarData.value = request.data;
  }
}

onMounted(() => {
  fetchData();
});
</script>
