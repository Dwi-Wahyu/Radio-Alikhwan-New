<template>
  <Header class="fixed top-0 left-0 z-50" />

  <div class="bg-[#F7F7F7] min-h-screen">
    <div
      v-if="artikelData"
      class="pt-28 flex-col md:flex-row md:px-20 md:pt-24 md:pb-10 flex smgap-8"
    >
      <div
        class="sm:bg-white sm:mt-0 p-5 flex flex-col gap-4 w-full rounded relative sm:shadow flex-grow"
      >
        <div
          class="w-fit gap-1 flex items-center px-4 py-2 sm:p-2 -top-8 sm:top-0 left-5 cursor-pointer rounded-full bg-white shadow absolute sm:-left-12"
          @click="navigateTo('/')"
        >
          <IconsChevron color="#000" />
          <h1 class="block sm:hidden font-semibold">Kembali</h1>
        </div>

        <div v-for="(artikel, artikelIdx) in artikelData">
          <div
            class="flex flex-col gap-3"
            v-if="artikel.id == id"
            :key="artikelIdx"
          >
            <h1 class="text-xl text-start font-semibold">
              {{ artikel.title }}
            </h1>
            <div class="flex justify-center">
              <img
                :src="`${baseURL}/artikel/thumbnail/${artikel.thumbnail}`"
                alt=""
                class=""
              />
            </div>

            <span class="text-justify" v-html="artikel.content"> </span>

            <div class="flex items-center gap-2 justify-between">
              <div class="flex gap-2">
                <BaseButton class="flex gap-2" @click="handleAction('like')">
                  <IconsLike :liked="liked" />

                  <h1>{{ artikel.like }}</h1>
                </BaseButton>

                <BaseButton class="flex gap-1" @click="handleAction('dislike')">
                  <IconsLike :liked="disliked" :reverse="true" />

                  <h1>{{ artikel.dislike }}</h1>
                </BaseButton>
              </div>
              <h1>{{ moment(artikel.createdAt).format("YYYY-MM-DD") }}</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-[40vw] w-full p-5">
        <div class="flex items-center gap-2 mb-5">
          <h1 class="text-xl font-bold">Berita Lainnya</h1>
          <div class="border border-gray-400 flex-grow"></div>
        </div>

        <div
          v-for="(otherArtikel, otherArtikelIdx) in artikelData"
          class="flex flex-col gap-4"
        >
          <div
            v-if="otherArtikel.id != id"
            class="bg-white shadow flex items-center mb-4 gap-3 rounded-l-full cursor-pointer"
            @click="navigateTo(`/news/${otherArtikel.id}`)"
          >
            <img
              :src="`${baseURL}/artikel/thumbnail/${otherArtikel.thumbnail}`"
              alt=""
              class="rounded-full w-[5rem] h-[5rem]"
            />
            <h1 class="font-semibold">{{ otherArtikel.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "login",
});

import moment from "moment";
import Header from "~/components/landing/Header.vue";
import BaseButton from "~/components/widgets/button/BaseButton.vue";

const axios = useAxios();

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;

const artikelData = ref<Artikel[]>([]);

const route = useRoute();
const { id } = route.params;

const liked = ref(false);
const disliked = ref(false);

function handleLike() {
  disliked.value = false;
  liked.value = !liked.value;
}

function handleDislike() {
  liked.value = false;
  disliked.value = !disliked.value;
}

async function handleAction(action: string) {
  if (action == "like") {
    handleLike();
  } else {
    handleDislike();
  }

  const url = `${baseURL}/api/artikel/${action}/${id}`;
  const fetchAction = await axios.patch(url);

  if (fetchAction.status == 200) {
    loadData();
  }
}

type Artikel = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  thumbnail: string;
  like: number;
  dislike: number;
};

async function loadData() {
  const getArtikel = await axios.get("/api/artikel", { params: { take: 5 } });

  if (getArtikel.status == 200) {
    artikelData.value = getArtikel.data;
  }
}

onMounted(() => {
  loadData();
});
</script>
