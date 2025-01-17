<template>
  <div class="flex md:flex-row w-full h-screen bg-primary">
    <div class="md:flex hidden flex-col w-2/3 bg-login">
      <div class="flex flex-row gap-2 p-4">
        <img src="/logo/logo-footer.svg" class="p-0 rounded-lg h-14" alt="" />
      </div>
      <div class="flex items-center flex-1 ml-10">
        <h1 class="text-white font-bold text-4xl w-2/4">{{ store.appDesc }}</h1>
        <img src="@/public/backgrounds/bg.png" alt="" class="inherit right-0" />
      </div>
    </div>
    <div
      class="flex flex-col md:w-1/3 w-full md:bg-white justify-center md:p-14 p-4 flex-1"
    >
      <h3 class="absolute bottom-2 text-xs text-gray-500 right-14">
        Copyright &copy; Ridha Faisyah Marola MW 215007
      </h3>
      <div class="flex flex-row gap-4">
        <img
          src="@/public/logo/logo.png"
          class="bg-white p-1 rounded-lg h-12 md:hidden block"
          alt=""
        />
        <div class="flex flex-col">
          <h1
            class="font-bold text-sm text-center md:text-right text-white flex md:hidden"
          >
            {{ store.appName }}
          </h1>
          <h1
            class="font-bold text-md text-left md:text-right block text-white md:hidden"
          >
            {{ store.orgName }}
          </h1>
        </div>
      </div>

      <div
        class="flex mt-4 flex-col md:bg-none bg-white p-4 md:p-0 rounded-xl md:rounded-none"
      >
        <h1 class="font-bold text-xl text-left md:text-right hidden md:block">
          {{ store.welcomeText }}
        </h1>
        <h1 class="font-light text-sm text-left md:text-right hidden md:block">
          {{ store.welcomeDesc }}
        </h1>
        <h1 class="font-light text-xs md:text-right block md:hidden">
          {{ store.welcomeDesc }}
        </h1>
        <div class="flex flex-col form-login gap-4 py-4">
          <BaseInput
            v-model="username"
            :disabled="clicked"
            label="Username"
            id="name"
            type="text"
            :error="store.error"
            placeholder="Masukkan Username Anda"
          />
          <BaseInput
            v-model="password"
            :disabled="clicked"
            label="Password"
            id="password"
            type="password"
            :error="store.error"
            placeholder="Masukkan Password Anda"
          />
          <BaseCheckbox v-model="tetapLogin" id="agree" label="Tetap Login" />
          <hr />

          <BaseButton
            @click="handleClick"
            variant="primary"
            add-class="rounded-3xl"
            :disabled="clicked"
            >Masuk Sekarang</BaseButton
          >
          <h1 class="text-danger text-center font-bold pb-2">
            {{ store.error_data?.message }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "login",
});

import { useMyAuthStore } from "~/store/auth";
import BaseInput from "@/components/widgets/data-input/BaseInput.vue";
import BaseCheckbox from "@/components/widgets/data-input/BaseCheckbox.vue";
import BaseButton from "@/components/widgets/button/BaseButton.vue";

const store = useMyAuthStore();
const router = useRouter();
const username = ref("wahyu");
const password = ref("wahyu123");
const tetapLogin = ref(false);
const clicked = ref(false);

const handleClick = () => {
  clicked.value = true;
  const payload = {
    username: username.value,
    password: password.value,
    alwaysLogin: tetapLogin.value,
  };
  store
    .login(payload)
    .then((res) => {
      router.push("/artikel");
    })
    .catch((err) => {
      clicked.value = false;
      console.log(store.error);
    });
};

onBeforeMount(async () => {
  store.error = false;
  store.error_data = null;

  console.log(store.token);
  // if (store.token != "") {
  //   router.push("/artikel");
  // }
});
</script>

<style scoped></style>
