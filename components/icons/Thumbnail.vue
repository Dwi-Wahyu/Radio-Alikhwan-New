<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :class="`group-hover:${hoverColor}`"
  >
    <path
      fill="#fff"
      d="M3 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 15a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1z"
    />
    <path
      fill="#fff"
      d="M17 4H3v10h14zM5 12l2.5-3l2 2L12 8l3 4zm-1 3h12v1H4z"
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
