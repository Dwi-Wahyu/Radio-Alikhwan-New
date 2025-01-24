<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M18 6L6 18M6 6l12 12"
    />
  </svg>
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: "22",
  },
  height: {
    type: String,
    default: "22",
  },
});
</script>
