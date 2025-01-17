<template>
  <div class="">
    <div v-if="editor" class="mb-4">
      <ButtonBar :editor="editor" />
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { Editor, EditorContent } from "@tiptap/vue-3";
import ButtonBar from "./ButtonBar.vue";

import "./Editor.css";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "update:title"]);

// Editor instance
const editor = ref(null);

// Watch for changes in `modelValue` and update editor content
watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return;

    // HTML
    const isSame = editor.value.getHTML() === value;

    // JSON (if needed)
    // const isSame = JSON.stringify(editor.value.getJSON()) === JSON.stringify(value)

    if (isSame) return;

    editor.value.commands.setContent(value, false);
  }
);

// Initialize editor on mount
onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image,
    ],
    content: props.modelValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate: () => {
      emit("update:modelValue", editor.value.getHTML());
    },
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>
