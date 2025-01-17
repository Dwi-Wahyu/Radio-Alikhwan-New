<template>
  <label v-if="label" :for="id" class="block text-sm font-bold mb-2">
    {{ label }}
  </label>
  <textarea
    :id="id"
    :disabled="disabled"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="`${height} ${error ? 'border-red-600' : 'border-gray-200'}`"
    class="text-left w-full focus:outline-none border p-4 rounded-lg"
  ></textarea>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "h-72",
  },
});
</script>
