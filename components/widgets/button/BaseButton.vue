<template>
  <button
    :type="type"
    :class="[
      addClass,
      baseClasses,
      variantClasses,
      sizeClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      rounded,
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button", // Bisa 'button', 'submit', atau 'reset'
  },
  variant: {
    type: String,
    default: "primary", // Bisa 'primary', 'secondary', atau 'outline'
  },
  size: {
    type: String,
    default: "md", // Bisa 'sm', 'md', atau 'lg'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  addClass: {
    type: String,
    default: "",
  },
  rounded: {
    type: String,
    default: "rounded-lg",
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled) {
    emit("click", event);
  }
};

const baseClasses =
  "inline-flex items-center group justify-center font-medium transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-primary text-white hover:bg-white hover:text-black border-primary border focus:bg-primary focus:text-white ";
    case "secondary":
      return "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500";
    case "outline":
      return "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100 focus:ring-blue-500";
    case "danger":
      return "bg-[#FF0000] text-white border border-[#FF0000] hover:bg-white hover:text-[#FF0000]";
    default:
      return "";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "";
  }
});
</script>
