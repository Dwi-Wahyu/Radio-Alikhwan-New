<template>
  <div class="w-screen flex fixed z-[60] top-0 left-0 h-screen">
    <div class="bg-black w-full h-full opacity-50"></div>
    <div class="w-full h-full flex fixed justify-center items-center">
      <div
        class="bg-white h-60 max-w-72 justify-center gap-2 relative p-6 rounded-[20px] flex items-center flex-col"
      >
        <div
          class="w-full cursor-pointer absolute top-0 left-0 flex justify-end p-4"
        >
          <div @click="handleClose">
            <IconsClose />
          </div>
        </div>
        <Icon :name="icon" size="120" style="color: #f24822" />
        <h1 class="font-semibold text-center text-[#938888]">{{ label }}</h1>
        <div class="w-full flex justify-evenly mt-4">
          <BaseButton @click="handleAction('cancel')" variant="secondary">
            Batalkan
          </BaseButton>
          <BaseButton @click="handleAction('confirm')" variant="danger">
            {{ actionLabel }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "../button/BaseButton.vue";

const emit = defineEmits(["cancel", "confirm"]);

const handleAction = (emitType) => {
  emit(emitType);
};

function handleClose() {
  emit("cancel");
}

defineProps({
  label: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    default: "Hapus",
  },
  icon: {
    type: String,
    default: "lucide:circle-alert",
  },
});
</script>
