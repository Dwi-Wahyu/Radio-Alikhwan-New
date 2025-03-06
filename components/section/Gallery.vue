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
        :slides-per-view="3"
      >
        <SwiperSlide v-for="(imageUrl, imageIdx) in dataGaleri" :key="imageIdx">
          <img
            :src="`${baseURL}/galeri/${imageUrl.path}`"
            class="max-h-20 sm:max-h-56"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- <div v-if="!dataGaleri.length">
      <h1 class="mb-4">Belum ada foto di galeri</h1>
    </div>

    <Carousel
      v-if="dataGaleri"
      class="block sm:hidden"
      v-bind="mobileCarouselConfig"
    >
      <Slide v-for="(imageUrl, imageIdx) in dataGaleri" :key="imageIdx">
        <img
          :src="`${baseURL}/galeri/${imageUrl.path}`"
          class="max-w-96"
          alt=""
        />
      </Slide>

      <template #addons>
        <div class="mt-5">
          <Pagination />
        </div>
      </template>
    </Carousel>

    <Carousel v-if="dataGaleri" class="hidden sm:block" v-bind="carouselConfig">
      <Slide v-for="(imageUrl, imageIdx) in dataGaleri" :key="imageIdx">
        <img
          :src="`${baseURL}/galeri/${imageUrl.path}`"
          class="max-w-96 max-h-[353px]"
          alt=""
        />
      </Slide>

      <template #addons>
        <div class="mt-5">
          <Pagination />
        </div>
      </template>
    </Carousel> -->
  </div>
</template>

<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
// import "vue3-carousel/carousel.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import { Carousel, Slide, Pagination } from "vue3-carousel";

import { Swiper, SwiperSlide } from "swiper/vue";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;
const axios = useAxios();

const dataGaleri = ref([]);

// const carouselConfig = {
//   itemsToShow: 3.5,
// };

// const mobileCarouselConfig = {
//   itemsToShow: 1,
// };

// const galleryImage = [
//   "/gallery/image 10.png",
//   "/gallery/image 11.png",
//   "/gallery/image 13.png",
//   "/gallery/image 14.png",
//   "/gallery/image 7.png",
// ];

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
