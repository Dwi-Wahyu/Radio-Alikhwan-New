<template>
  <div
    class="w-full min-h-screen text-white px-6 py-20 sm:px-20 sm:py-28 bg-primary flex flex-col items-center justify-center"
  >
    <div class="text-center mb-10 sm:mb-16" id="struktur">
      <h1 class="text-2xl mb-3 font-bold">Tim Profesional di Balik Layar</h1>
      <h1 class="text-lg">
        Kenali struktur organisasi dan peran tim kami dalam menghadirkan siaran
        berkualitas
      </h1>
    </div>

    <div v-if="!team.length" class="">
      <h1>Belum ada data</h1>
    </div>

    <div v-if="team" class="sm:hidden block">
      <div ref="parent" class="flex flex-col items-center gap-28 mt-20">
        <div
          v-for="(team, teamIdx) in teamVisible"
          class="flex items-center flex-col p-3 w-full border rounded-lg relative"
          :key="teamIdx"
        >
          <img
            :src="`${baseURL}/struktur/${team.gambar}`"
            class="absolute -top-20"
            alt=""
          />
          <div class="text-center mt-[7.5rem]">
            <h1 class="font-semibold text-lg">{{ team.nama }}</h1>
            <h1>
              {{ truncateHtml(team.deskripsi, 115) }}
            </h1>
          </div>
        </div>
      </div>

      <div
        v-if="jumlahPage"
        class="flex items-center gap-1 justify-center mt-10"
      >
        <button v-for="index in jumlahPage" @click="changePage(index)">
          <IconsDot
            width="30"
            height="30"
            color="#D00300"
            :fill="page == index ? '#D00300' : '#1B1B1B'"
          />
        </button>
      </div>
    </div>

    <div class="hidden sm:flex items-center flex-col">
      <div class="flex items-center gap-16">
        <button @click="changePage(page - 1)">
          <IconsChevron width="50" height="50" color="text-[#D00300]" />
        </button>
        <div v-if="team" ref="parent" class="grid grid-cols-2 gap-10">
          <div
            class="flex relative border-2 border-gray-500 rounded-[10px]"
            v-for="(team, teamIdx) in teamVisible"
            :key="teamIdx"
          >
            <img
              class="absolute -top-5 -left-5 w-[10rem] h-[10rem]"
              :src="`${baseURL}/struktur/${team.gambar}`"
              alt=""
            />
            <img
              class="invisible w-[10rem] h-[10rem]"
              :src="`${baseURL}/struktur/${team.gambar}`"
              alt=""
            />
            <div class="w-52 pl-0 p-4">
              <h1 class="font-semibold">{{ team.nama }}</h1>
              <p>
                {{ truncateHtml(team.deskripsi, 115) }}
              </p>
            </div>
          </div>
        </div>
        <button @click="changePage(page + 1)">
          <IconsChevron
            width="50"
            height="50"
            :reverse="true"
            color="text-[#D00300]"
          />
        </button>
      </div>

      <div v-if="jumlahPage" class="mt-7 flex">
        <button v-for="index in jumlahPage" @click="changePage(index)">
          <IconsDot
            width="30"
            height="30"
            color="#D00300"
            :fill="page == index ? '#D00300' : '#1B1B1B'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import { truncateHtml } from "~/function/truncateHtml";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;
const axios = useAxios();

const [parent] = useAutoAnimate();

type Teams = {
  imageUrl: string;
  name: string;
  description: string;
};

type Struktur = {
  nama: string;
  gambar: string;
  deskripsi: string;
};

const page = ref(1);

const teamVisible = ref<Struktur[]>([]);
const team = ref<Struktur[]>([]);

const jumlahPage = ref(0);

function changePage(pageSelected: number) {
  if (pageSelected < 1 || pageSelected > jumlahPage.value) {
    return;
  }

  page.value = pageSelected;

  const temp = [];

  const limit = pageSelected * 4;
  const start = limit - 4;

  for (let index = start; index < limit && index < team.value.length; index++) {
    temp.push(team.value[index]);
  }

  teamVisible.value = temp;
}

onMounted(async () => {
  const request = await axios.get("/api/struktur");

  if (request.status == 200) {
    team.value = request.data;

    jumlahPage.value = Math.ceil(request.data.length / 4);

    changePage(page.value);
  }
});
</script>
