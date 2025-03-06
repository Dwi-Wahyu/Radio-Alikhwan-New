<template>
  <div class="w-full py-20 flex flex-col items-center justify-center">
    <div class="text-center mb-10" id="galeri">
      <h1 class="text-2xl mb-3 font-bold">Gallery</h1>
      <h1 class="text-lg">Lebih Dekat dengan Aktivitas Kami</h1>
    </div>

    <div class="w-full sm:w-[80vw]">
      <Swiper
        @swiper="onSwiper"
        @slide-change="onSlideChange"
        :slides-per-view="1"
        :breakpoints="breakpoints"
      >
        <SwiperSlide v-for="(imageUrl, imageIdx) in dataGaleri" :key="imageIdx">
          <div class="flex items-center max-h-56 justify-center">
            <img
              :src="`${baseURL}/galeri/${imageUrl.path}`"
              class="max-h-96"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div v-if="!dataGaleri.length">
      <h1 class="mb-4">Belum ada foto di galeri</h1>
    </div>
  </div>
</template>

<script setup>
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, A11y, Navigation, Scrollbar } from "swiper/modules";

const breakpoints = {
  640: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 3,
  },
};

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;
const axios = useAxios();

const dataGaleri = ref([Pagination, A11y, Navigation]);

function onSwiper(swiper) {
  console.log(swiper);
}

function onSlideChange() {
  console.log("slide change");
}

onMounted(async () => {
  const request = await axios.get("/api/galeri");

  if (request.status == 200) {
    dataGaleri.value = request.data;
  }
});
</script>
