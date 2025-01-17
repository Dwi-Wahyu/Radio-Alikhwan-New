<template>
  <div
    v-if="sidebarActive"
    class="block sm:hidden w-full h-screen fixed top-0 left-0 z-[100]"
  >
    <div
      @click="store.actionSidebar"
      class="absolute z-[80] w-full h-screen bg-black opacity-40"
    ></div>

    <div
      class="w-[80vw] z-[90] flex flex-col items-center gap-7 delay-500 absolute right-0 bg-primary text-white p-7 h-screen duration-500 ease-in-out"
      :class="sidebarActive ? 'right-0' : '-right-full'"
    >
      <img src="/logo/logo-footer.svg" alt="" />

      <div class="w-full border-t mb-1"></div>

      <div v-for="(item, navIdx) in navMenu" :key="navIdx">
        <NuxtLink
          v-if="item.type == 'link'"
          :href="item.path"
          class="font-semibold"
        >
          {{ item.label }}
        </NuxtLink>

        <div
          v-if="item.type == 'dropdown'"
          class="flex w-full flex-col items-center"
        >
          <button
            class="flex items-center gap-1 font-semibold"
            @click="toggleDropdown"
          >
            {{ item.label }}

            <Icon name="line-md:chevron-down" />
          </button>

          <div
            v-if="showDropdown"
            class="w-full bg-white mt-3 text-black rounded-lg flex flex-col items-center"
          >
            <NuxtLink
              class="p-3 w-full text-center first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100"
              v-for="(menu, menuIdx) in item.submenu"
              :key="menuIdx"
              :href="menu.link"
            >
              {{ menu.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <button @click="store.actionSidebar">
        <Icon name="line-md:chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { navMenu } from "~/data/sidebar/landingPageMenu";
import { useMySidebarStore } from "~/store/sidebar";

const store = useMySidebarStore();
const showDropdown = ref(false);

const { sidebarActive } = storeToRefs(store);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
</script>
