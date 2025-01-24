<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :class="[{ 'rotate-180': reverse }, `group-hover:${hoverColor}`, color]"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-dasharray="12"
      stroke-dashoffset="12"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 12l7 -7M8 12l7 7"
    >
      <animate
        fill="freeze"
        attributeName="stroke-dashoffset"
        dur="0.3s"
        values="12;0"
      />
    </path>
  </svg>
</template>

<script setup>
defineProps({
  width: {
    type: String,
    default: "24",
  },
  height: {
    type: String,
    default: "24",
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "#fff",
  },
  hoverColor: {
    type: String,
    default: "text-primary",
  },
});
</script>
