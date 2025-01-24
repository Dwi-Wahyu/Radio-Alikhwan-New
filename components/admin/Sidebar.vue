<template>
  <div class="fixed top-0 left-0 gap-2 w-full flex justify-end py-3 px-6">
    <div v-if="authStore.user">
      <h1>{{ authStore.user.username }}</h1>
    </div>

    <button @click="handleLogout">
      <IconsLogout />
    </button>
  </div>

  <div
    class="flex w-full flex-col gap-4 h-screen"
    :class="store.sidebarActive ? 'p-4' : 'p-1'"
  >
    <div class="flex flex-col items-center gap-2" v-if="!store.sidebarActive">
      <img src="/logo/al-ikhwan.png" class="my-4" alt="" />

      <div class="flex flex-col gap-5">
        <button
          v-for="(item, index) in store.menu"
          :key="index"
          @click="store.actionSidebar"
        >
          <img
            :src="
              store.parentActive == item.route
                ? `/icons/${item.icon}.svg`
                : `/icons/${item.icon2}.svg`
            "
            alt=""
            class="w-6"
          />
        </button>
      </div>
    </div>
    <div class="flex flex-row gap-2 items-center" v-if="store.sidebarActive">
      <img src="/logo/logo-footer.svg" alt="" />
    </div>
    <hr class="bg-white" v-if="store.sidebarActive" />

    <div class="flex flex-col mt-2 gap-1" v-if="store.sidebarActive">
      <div
        class="flex flex-col"
        v-for="(item, index) in store.menu"
        @click="store.changeParent(item.route)"
      >
        <h1
          v-if="item.type == 'menuName'"
          class="text-sm font-semibold text-white pt-3 pb-1"
        >
          {{ item.title }}
        </h1>
        <nuxt-link
          :to="item.route"
          class="flex flex-row gap-4 p-2 cursor-pointer hover:bg-second"
          v-if="item.child.length == 0 && item.type == 'parent'"
          :class="{
            'bg-second': store.parentActive == item.route,
            'rounded-lg': item.child == 0 && item.type == 'parent',
          }"
        >
          <img
            :src="
              store.parentActive == item.route
                ? `/icons/${item.icon}.svg`
                : `/icons/${item.icon2}.svg`
            "
            alt=""
            class="w-6"
          />

          <h1
            class="text-white text-lg"
            :class="
              store.parentActive == item.route ? 'font-bold' : 'font-base'
            "
          >
            {{ item.title }}
          </h1>
        </nuxt-link>
        <div
          class="flex flex-row gap-4 p-2 rounded-t-lg cursor-pointer hover:bg-second"
          v-if="item.child.length > 0"
          :class="store.parentActive.includes(item.route) ? 'bg-second' : ''"
        >
          <img
            :src="
              store.parentActive == item.route
                ? `/icons/${item.icon}.svg`
                : `/icons/${item.icon2}.svg`
            "
            alt=""
            class="w-6"
          />

          <h1
            class="text-white text-lg"
            :class="
              store.parentActive.includes(item.route)
                ? 'font-bold'
                : 'font-base'
            "
          >
            {{ item.title }}
          </h1>
        </div>
        <transition name="fade">
          <div
            class="flex flex-col gap-2 pl-12 p-2 bg-second rounded-b-lg"
            v-if="
              item.child.length > 0 && store.parentActive.includes(item.route)
            "
          >
            <div
              class="flex flex-row"
              v-for="(itemChild, indexChild) in item.child"
            >
              <nuxt-link :to="itemChild.route" class="text-white">
                <h1
                  :class="
                    route.path == itemChild.route ? 'font-bold' : 'font-base'
                  "
                >
                  {{ itemChild.title }}
                </h1>
              </nuxt-link>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="flex justify-center mt-2">
      <IconsBurger class="cursor-pointer" @click="store.actionSidebar" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import auth from "~/middleware/auth";
import { useMyAuthStore } from "~/store/auth";
import { useMySidebarStore } from "~/store/sidebar";

const store = useMySidebarStore();
const authStore = useMyAuthStore();
const route = useRoute();
const router = useRouter();

function handleLogout() {
  authStore.token = "";
  router.push("/masuk");
}

onMounted(async () => {
  store.changeParent(route.path);
});
</script>

<style scoped>
/* Tambahkan efek fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
