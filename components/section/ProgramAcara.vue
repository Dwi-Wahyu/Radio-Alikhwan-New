<template>
  <div class="px-6 py-20 sm:px-20 sm:py-28 bg-[#F7F7F7] min-h-screen">
    <div class="text-center sm:mb-16" id="program-acara">
      <h1 class="text-2xl mb-3 font-bold">Program Acara</h1>
      <h1 class="text-lg">Program Pilihan untuk Setiap Suasana</h1>

      <div ref="parent" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
        <div
          class="bg-white rounded-lg min-w-40 min-h-52 gap-2 shadow flex flex-col items-center justify-center p-4"
          v-for="(program, programIdx) in programVisible"
          :key="programIdx"
        >
          <IconsClockClock1 />
          <h1 class="font-semibold">
            {{ program.mulai }} - {{ program.selesai }}
          </h1>
          <h1>{{ program.judul }}</h1>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="mt-10 flex items-center rounded-lg bg-[#D9D9D9]">
          <button
            @click="changePage(page - 1)"
            class="bg-primary rounded-lg flex items-center p-2"
          >
            <IconsChevron width="15" height="15" color="text-white" />
          </button>
          <h1 class="w-14 font-bold">{{ page }}</h1>
          <button
            @click="changePage(page + 1)"
            class="bg-primary flex items-center rounded-lg p-2"
          >
            <IconsChevron
              :reverse="true"
              width="15"
              height="15"
              color="text-white"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAutoAnimate } from "@formkit/auto-animate/vue";

const page = ref(1);

const axios = useAxios();

type Program = {
  judul: string;
  mulai: string;
  selesai: string;
};

const [parent] = useAutoAnimate();

const programVisible = ref<Program[]>([]);
const programAcara = ref<Program[]>([]);
const jumlahPage = ref(0);

function changePage(pageSelected: number) {
  if (pageSelected < 1 || pageSelected > jumlahPage.value) {
    return;
  }

  page.value = pageSelected;

  const temp = [];

  const limit = pageSelected * 4;
  const start = limit - 4;

  for (
    let index = start;
    index < limit && index < programAcara.value.length;
    index++
  ) {
    temp.push(programAcara.value[index]);
  }

  programVisible.value = temp;
}

onMounted(async () => {
  const request = await axios.get("/api/program-acara");

  if (request.status == 200) {
    programAcara.value = request.data;

    jumlahPage.value = Math.ceil(request.data.length / 4);

    changePage(page.value);
  }
});
</script>
