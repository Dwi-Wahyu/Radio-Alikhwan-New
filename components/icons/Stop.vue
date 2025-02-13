<template>
  <div class="relative w-8 h-8">
    <!-- SVG Pertama (Muncul saat tidak dihover) -->
    <svg
      class="absolute inset-0 transition-opacity duration-300 hover:opacity-0"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="none" />
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1"
      >
        <rect width="4" height="14" x="6" y="5" rx="1" />
        <rect width="4" height="14" x="14" y="5" rx="1" />
      </g>
    </svg>

    <!-- SVG Kedua (Muncul saat dihover) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
      width="30"
      height="30"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="24" fill="none" />
      <rect
        width="4"
        height="14"
        x="6"
        y="5"
        fill="currentColor"
        rx="1"
        stroke-width="0.3"
        stroke="currentColor"
      />
      <rect
        width="4"
        height="14"
        x="14"
        y="5"
        fill="currentColor"
        rx="1"
        stroke-width="0.3"
        stroke="currentColor"
      />
    </svg>
  </div>
</template>
