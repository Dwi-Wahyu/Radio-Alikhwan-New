<template>
  <div
    class="w-full px-6 bg-primary shadow-xl text-white py-4 md:px-20 flex justify-between items-center"
  >
    <div class="flex items-center gap-2">
      <img src="/logo/al-ikhwan.png" alt="" />
      <h1 class="text-xl hidden sm:block font-bold text-[24px]">
        Al-Ikhwan Radio
      </h1>
    </div>

    <button @click="toggleSidebar" class="block sm:hidden">
      <IconsBurger />
    </button>

    <div class="sm:flex gap-7 hidden relative">
      <div v-for="(item, navIdx) in navMenu" :key="navIdx">
        <NuxtLink :href="item.path" v-if="item.type == 'link'">
          {{ item.label }}
        </NuxtLink>

        <div v-if="item.type == 'dropdown'">
          <div class="cursor-pointer" @click="toggleDropdown">
            {{ item.label }}
          </div>

          <div
            v-if="showDropdown"
            class="shadow absolute top-12 right-[49%] bg-white text-black rounded flex flex-col"
          >
            <NuxtLink
              class="p-3 hover:bg-gray-300 first:rounded-t last:rounded-b text-sm"
              v-for="(menu, menuIdx) in item.submenu"
              :key="menuIdx"
              :href="menu.link"
              :target="menu.target"
            >
              {{ menu.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navMenu } from "~/data/sidebar/landingPageMenu";
import { useMyLandingPageSidebar } from "~/store/sidebarLandingPage";

const showDropdown = ref(false);

const store = useMyLandingPageSidebar();

function toggleSidebar() {
  store.actionSidebar();
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
</script>
