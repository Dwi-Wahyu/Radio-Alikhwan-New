<template>
  <div v-if="editor" class="flex gap-3 toolbar flex-wrap">
    <button
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      H1
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      H2
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      H3
    </button>
    <button
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      H4
    </button>
    <button
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
    >
      Paragraph
    </button>
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      Bold
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      Italic
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      Strike
    </button>
    <button
      @click="editor.chain().focus().toggleHighlight().run()"
      :class="{ 'is-active': editor.isActive('highlight') }"
    >
      Highlight
    </button>
    <button
      @click="editor.chain().focus().setTextAlign('left').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
    >
      Left
    </button>
    <button
      @click="editor.chain().focus().setTextAlign('center').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
    >
      Center
    </button>
    <button
      @click="editor.chain().focus().setTextAlign('right').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
    >
      Right
    </button>
    <button
      @click="editor.chain().focus().setTextAlign('justify').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
    >
      Justify
    </button>
    <button @click="toggleModal">Add Image</button>
  </div>

  <Modal
    v-if="showModal"
    title="Import Gambar"
    @close="toggleModal"
    @action="addImage"
  >
    <BaseInput
      label="Masukkan Url Gambar"
      v-model="url"
      type="text"
      :error="error"
    />
    <h1 v-if="error" class="text-sm font-semibold text-red-500 mt-2">
      Field tidak boleh kosong
    </h1>
  </Modal>
</template>

<script setup>
import BaseInput from "../data-input/BaseInput.vue";
import Modal from "../popup/Modal.vue";

// Props
const props = defineProps({
  editor: {
    type: Object,
    required: true,
  },
});

const url = ref("");

const showModal = ref(false);
const error = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}

function addImage() {
  error.value = false;

  if (url.value) {
    props.editor.chain().focus().setImage({ src: url.value }).run();
    url.value = "";
    toggleModal();
  } else {
    error.value = true;
  }
}

// Dynamic button class
const buttonClass = (isActive) =>
  `btn px-3 py-1 rounded-md ${
    isActive ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-300"
  }`;
</script>

<style scoped>
.btn {
  border: 1px solid #ddd;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.toolbar button {
  border-radius: 0.5rem;
  padding: 0.25rem 0.6rem;
  background: #e4e4e4;
}

.toolbar button.is-active {
  background: #1761d0;
  color: white;
}
</style>
