<template>
  <svg
    v-if="!liked"
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    class="group-hover:text-[#1B1B1B]"
    viewBox="0 0 24 24"
    :class="[{ 'rotate-180': reverse }]"
  >
    <path
      fill="currentColor"
      d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z"
    />
  </svg>

  <svg
    v-if="liked"
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    class="group-hover:text-[#1B1B1B]"
    viewBox="0 0 24 24"
    :class="[{ 'rotate-180': reverse }]"
  >
    <path
      fill="currentColor"
      d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"
    />
  </svg>
</template>

<script setup>
defineProps({
  liked: {
    type: Boolean,
    default: false,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
});
</script>
