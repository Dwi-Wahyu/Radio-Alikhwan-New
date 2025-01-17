<template>
  <div class="w-full min-h-screen">
    <div
      class="flex bg-primary fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out"
      :class="
        sidebarStore.sidebarActive ? 'sidebar-active' : 'sidebar-inactive'
      "
    >
      <Sidebar />
    </div>
    <div
      class="flex w-full min-h-screen py-10 pr-7 bg-[#E7EDF2] transition-all ease-in-out duration-300"
      :class="sidebarStore.sidebarActive ? 'pl-[18.7rem]' : 'pl-[7rem]'"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "~/components/admin/Sidebar.vue";
import { useMySidebarStore } from "~/store/sidebar";
import { useMyAuthStore } from "~/store/auth";
const sidebarStore = useMySidebarStore();
const authStore = useMyAuthStore();
const router = useRouter();
</script>

<style scoped>
.sidebar-active {
  width: 17rem;
}

.sidebar-inactive {
  width: 5rem;
}
</style>
