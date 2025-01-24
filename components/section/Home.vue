<script lang="ts" setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { ref } from "vue";
import Header from "../landing/Header.vue";

const carouselConfig = {
  itemsToShow: 1,
  autoplay: 5000,
  mouseDrag: false,
  wrapAround: true,
};

const carouselRef = ref<InstanceType<typeof Carousel> | null>(null);
const currentSlide = ref(0);

function changePage(value: number) {
  if (carouselRef.value) {
    carouselRef.value.slideTo(value);
  }
}

const backgroundsImage = [
  "/backgrounds/bg1.png",
  "/backgrounds/bg2.png",
  "/backgrounds/bg3.png",
];
</script>

<template>
  <div
    class="w-full relative sm:h-screen flex flex-col items-center justify-center"
    id="home"
  >
    <Header class="sm:hidden z-30" />
    <Carousel
      ref="carouselRef"
      v-model="currentSlide"
      class="z-10 absolute top-0 left-0"
      v-bind="carouselConfig"
    >
      <Slide v-for="(imageUrl, imageIdx) in backgroundsImage" :key="imageIdx">
        <img class="w-full h-fit sm:h-screen" :src="imageUrl" alt="" />
      </Slide>
    </Carousel>
    <div class="w-full hidden sm:flex absolute bottom-8 z-40 justify-center">
      <button @click="changePage(0)">
        <IconsDot
          width="25"
          height="25"
          :color="currentSlide == 0 ? '#fff' : '#6b7280'"
          :fill="currentSlide == 0 ? '#fff' : '#6b7280'"
        />
      </button>
      <button @click="changePage(1)">
        <IconsDot
          width="25"
          height="25"
          :color="currentSlide == 1 ? '#fff' : '#6b7280'"
          :fill="currentSlide == 1 ? '#fff' : '#6b7280'"
        />
      </button>
      <button @click="changePage(2)">
        <IconsDot
          width="25"
          height="25"
          :color="currentSlide == 2 ? '#fff' : '#6b7280'"
          :fill="currentSlide == 2 ? '#fff' : '#6b7280'"
        />
      </button>
    </div>

    <div class="absolute z-40 -bottom-10">
      <button
        @click="
          navigateTo('https://alhastream.com/p/alikhwan/', { external: true })
        "
        class="text-white group flex sm:hidden w-fit hover:bg-[#D00300] transition-all duration-300 ease-in-out mt-14 pr-4 inset-0 bg-red-900/20 backdrop-blur-md gap-2 items-center p-2 rounded-full"
      >
        <div
          class="p-3 relative bg-[#D00300] group-hover:text-[#D00300] group-hover:bg-white transition-all duration-300 ease-in-out rounded-full flex items-center justify-center"
        >
          <IconsMusic />
        </div>
        <h1 class="font-semibold">MULAI MENDENGARKAN</h1>
      </button>
    </div>

    <div
      class="z-20 flex absolute mt-[7.1rem] sm:mt-0 top-0 left-0 w-full px-20 flex-col sm:h-screen sm:justify-center"
    >
      <img src="~/assets/icons/home-logo.svg" alt="" class="w-[40rem] mt-5" />
      <button
        @click="
          navigateTo('https://alhastream.com/p/alikhwan/', { external: true })
        "
        class="text-white group hidden sm:flex w-fit hover:bg-[#D00300] transition-all duration-300 ease-in-out mt-14 pr-4 inset-0 bg-red-900/20 backdrop-blur-md gap-2 items-center p-2 rounded-full"
      >
        <div
          class="p-5 relative bg-[#D00300] group-hover:text-[#D00300] group-hover:bg-white transition-all duration-300 ease-in-out rounded-full flex items-center justify-center"
        >
          <IconsMusic />
        </div>
        <h1 class="font-semibold">MULAI MENDENGARKAN</h1>
      </button>
    </div>
  </div>
</template>
