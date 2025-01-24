<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.7141 14.7322C12.9332 14.7322 14.732 12.9333 14.732 10.7143C14.732 8.49528 12.9332 6.69644 10.7141 6.69644C8.49513 6.69644 6.69629 8.49528 6.69629 10.7143C6.69629 12.9333 8.49513 14.7322 10.7141 14.7322Z"
      :fill="fill"
      :stroke="color"
      stroke-width="1"
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
  color: {
    type: String,
    default: "#fff",
  },
  fill: {
    type: String,
    default: "#fff",
  },
});
</script>
