<template>
  <div
    class="flex px-6 text-white py-4 justify-between bg-primary/60 items-center fixed z-50 bottom-0 left-0 w-full"
  >
    <div class="flex items-center gap-3">
      <button
        @click="handlePlay"
        class="transition-all duration-500 ease-in-out"
      >
        <IconsPlay v-if="!isPlaying" />
        <IconsStop v-if="isPlaying" />
      </button>
      <div>
        <h1 class="font-semibold text-sm">Streaming Radio</h1>
        <h1 class="text-xs">101,90 FM Al-IKhwan Makassar</h1>
      </div>
    </div>

    <div class="relative flex items-center">
      <div
        class="-rotate-90 absolute -top-[7.5rem] -right-[3.6rem] duration-300 transition-all ease-in-out rounded-xl bg-primary/60 flex items-center justify-center px-3 py-2"
        :class="showVolume ? 'opacity-100' : 'opacity-0'"
      >
        <input
          type="range"
          @input="onChangeVolume"
          :min="0"
          :max="1"
          :step="0.01"
          v-model="volume"
        />
      </div>
      <button @click="toggleShowVolume">
        <IconsSpeaker />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const isPlaying = ref(false);
const showVolume = ref(false);

const volume = ref(1);

const audio = ref<HTMLAudioElement | null>(null);
const streamUrl = "https://stream.radioalikhwan.com";

function onChangeVolume() {
  if (audio.value) {
    audio.value.volume = volume.value;
  }
}

watch(volume, (newVolume) => {
  if (audio.value) {
    audio.value.volume = newVolume;
  }
});

function handlePlay() {
  if (!audio.value) {
    audio.value = new Audio(streamUrl);
    audio.value.volume = volume.value;
    audio.value.onended = () => (isPlaying.value = false);
  }

  if (audio.value.paused) {
    audio.value.play();
    isPlaying.value = true;
  } else {
    audio.value.pause();
    isPlaying.value = false;
  }
}

function toggleShowVolume() {
  showVolume.value = !showVolume.value;
}
</script>
