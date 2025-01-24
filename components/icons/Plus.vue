<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :class="`group-hover:${hoverColor}`"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 12h14m-7-7v14"
    />
  </svg>
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: "15",
  },
  height: {
    type: String,
    default: "15",
  },
  hoverColor: {
    type: String,
    default: "text-primary",
  },
});
</script>
