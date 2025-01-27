<template>
  <div
    class="px-6 py-10 sm:pt-28 sm:px-20 sm:py-16 w-full min-h-screen bg-[#F7F7F7]"
  >
    <div class="flex items-center mb-5 gap-3 mt-5 sm:mt-0" id="artikel">
      <h1
        class="text-2xl font-bold italic"
        @click="navigateTo('https://github.com/Dwi-Wahyu', { external: true })"
      >
        Berita Terbaru
      </h1>
      <div class="border border-gray-400 flex-grow"></div>
    </div>

    <div v-if="artikelData.length" class="sm:hidden flex flex-col">
      <div
        @click="navigateTo(`/news/${artikelData[0].id}`)"
        class="relative mb-4 cursor-pointer"
      >
        <div
          class="absolute inset-0 rounded-lg bg-gradient-to-t from-black via-transparent to-transparent z-20 transition-opacity duration-300 hover:opacity-0"
        ></div>

        <div class="absolute bottom-0 left-0 p-5 text-wrap z-30">
          <h1 class="text-white font-semibold">
            {{ artikelData[0].title }}
          </h1>
        </div>

        <img
          :src="`${baseURL}/artikel/thumbnail/${artikelData[0].thumbnail}`"
          alt=""
          class="w-full rounded-lg shadow"
        />
      </div>

      <div v-if="artikelData.length > 2" class="flex flex-col">
        <div
          @click="navigateTo(`/news/${artikelData[1].id}`)"
          class="relative mb-4 cursor-pointer"
        >
          <div
            class="absolute inset-0 rounded-lg bg-gradient-to-t from-black via-transparent to-transparent z-20 transition-opacity duration-300 hover:opacity-0"
          ></div>

          <div class="absolute bottom-0 left-0 p-5 text-wrap z-30">
            <h1 class="text-white font-semibold">
              {{ artikelData[1].title }}
            </h1>
          </div>

          <img
            :src="`${baseURL}/artikel/thumbnail/${artikelData[1].thumbnail}`"
            alt=""
            class="w-full rounded-lg shadow"
          />
        </div>

        <div
          @click="navigateTo(`/news/${artikelData[2].id}`)"
          class="relative cursor-pointer"
        >
          <div
            class="absolute inset-0 rounded-lg bg-gradient-to-t from-black via-transparent to-transparent z-20 transition-opacity duration-300 hover:opacity-0"
          ></div>

          <div class="absolute bottom-0 left-0 p-5 text-wrap z-30">
            <h1 class="text-white font-semibold">
              {{ artikelData[2].title }}
            </h1>
          </div>

          <img
            :src="`${baseURL}/artikel/thumbnail/${artikelData[2].thumbnail}`"
            alt=""
            class="w-full rounded-lg shadow"
          />
        </div>
      </div>
    </div>

    <div v-if="!artikelData" class="flex items-center justify-center">
      <h1>Belum Ada Berita</h1>
    </div>

    <div v-if="artikelData.length" class="sm:block hidden">
      <div
        @click="navigateTo(`/news/${artikelData[0].id}`)"
        class="flex bg-white w-full items-center justify-between cursor-pointer shadow"
      >
        <div class="p-4">
          <h1 class="font-semibold text-lg">
            {{ artikelData[0].title }}
          </h1>
          <span v-html="truncateHtml(artikelData[0].content, 1000)"> </span>
        </div>
        <img
          :src="`${baseURL}/artikel/thumbnail/${artikelData[0].thumbnail}`"
          class="w-[500px] h-[400px]"
          alt=""
        />
      </div>

      <div class="border border-gray-400 flex-grow my-6"></div>

      <div v-if="artikelData.length > 2" class="grid grid-cols-2 gap-4">
        <div
          @click="navigateTo(`/news/${artikelData[1].id}`)"
          class="flex bg-white cursor-pointer shadow rounded-r"
        >
          <!-- Gambar -->
          <img
            :src="`${baseURL}/artikel/thumbnail/${artikelData[1].thumbnail}`"
            alt=""
            class="w-2/5 object-cover rounded-l"
          />

          <!-- Konten -->
          <div class="p-4 w-3/5">
            <h1 class="font-semibold text-lg">
              {{ artikelData[1].title }}
            </h1>
            <span v-html="truncateHtml(artikelData[1].content, 100)"> </span>
          </div>
        </div>

        <div
          @click="navigateTo(`/news/${artikelData[2].id}`)"
          class="flex bg-white cursor-pointer shadow rounded-r"
        >
          <!-- Gambar -->
          <img
            :src="`${baseURL}/artikel/thumbnail/${artikelData[2].thumbnail}`"
            alt=""
            class="w-2/5 object-cover rounded-l"
          />

          <!-- Konten -->
          <div class="p-4 w-3/5">
            <h1 class="font-semibold text-lg">
              {{ artikelData[2].title }}
            </h1>
            <span v-html="truncateHtml(artikelData[2].content, 100)"> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { truncateHtml } from "~/function/truncateHtml";

const axios = useAxios();

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;

const artikelData = ref([]);

onMounted(async () => {
  const getArtikel = await axios.get("/api/artikel", { params: { take: 3 } });

  if (getArtikel.status == 200) {
    artikelData.value = getArtikel.data;
  }
});
</script>
