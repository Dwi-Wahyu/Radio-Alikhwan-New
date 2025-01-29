<template>
  <div class="px-4 py-3 bg-white h-fit shadow rounded-lg">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="font-semibold">{{ komentar.nama }}</h1>
        <h1>{{ komentar.isi }}</h1>
        <h1 class="text-xs mt-1">
          {{ moment(komentar.createdAt).format("YYYY-MM-DD HH:mm") }}
        </h1>
      </div>

      <div class="flex gap-4">
        <div class="flex flex-col items-center">
          <IconsLike />
          <h1>{{ komentar.like }}</h1>
        </div>
        <div class="flex flex-col items-center">
          <IconsLike :reverse="true" />
          <h1>{{ komentar.dislike }}</h1>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 mt-3 gap-3">
      <WidgetsButtonBaseButton
        variant="secondary"
        add-class="flex gap-1 items-center"
        @click="toggleShowReply"
      >
        Lihat Balasan

        <IconsChevron
          width="15"
          height="15"
          :class="showReply ? 'rotate-90' : '-rotate-90'"
        />
      </WidgetsButtonBaseButton>
      <WidgetsButtonBaseButton
        add-class="flex items-center gap-1"
        variant="danger"
        @click="toggleAlert"
      >
        <IconsTrash />
        Hapus
      </WidgetsButtonBaseButton>
    </div>
    <div v-if="komentar.subkomentar.length">
      <div v-if="showReply" class="flex flex-col gap-3 mt-4">
        <hr />
        <div
          v-for="(subkomentar, subkomentarIdx) in komentar.subkomentar"
          :key="subkomentarIdx"
          class="flex justify-between items-center"
        >
          <div>
            <div class="flex gap-1 items-center">
              <h1 class="font-semibold">{{ subkomentar.nama }}</h1>
              <IconsChevron :reverse="true" width="10" height="10" />
              <h1>{{ subkomentar.replyTo }}</h1>
            </div>
            <h1>{{ subkomentar.isi }}</h1>
            <h1 class="text-xs mt-1">
              {{ moment(subkomentar.createdAt).format("YYYY-MM-DD HH:mm") }}
            </h1>
          </div>

          <div class="flex gap-4">
            <div class="flex flex-col items-center">
              <IconsLike />
              <h1>{{ subkomentar.like }}</h1>
            </div>
            <div class="flex flex-col items-center">
              <IconsLike :reverse="true" />
              <h1>{{ subkomentar.dislike }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 v-if="showReply" class="text-center font-semibold mt-4">
        Tidak Ada Balasan
      </h1>
    </div>
    <WidgetsPopupAlert
      v-if="showAlert"
      :label="alertLabel"
      @cancel="toggleAlert"
      @confirm="handleDelete"
    />

    <WidgetsPopupToast
      v-if="showToast"
      label="Berhasil menghapus komentar"
      @close="toggleToast"
    />
  </div>
</template>

<script setup>
import moment from "moment";

const showReply = ref(false);
const showToast = ref(false);
const showAlert = ref(false);

const axios = useAxios();

const emit = defineEmits(["invalidate"]);

const props = defineProps({
  komentar: {
    type: Object,
    default: null,
  },
});

const alertLabel = `Yakin menghapus komentar ${props.komentar.nama}`;

function toggleAlert() {
  showAlert.value = !showAlert.value;
}

function toggleToast() {
  showToast.value = !showToast.value;
  if (!showToast.value) {
    emit("invalidate");
  }
}

async function handleDelete() {
  const deleteRequest = await axios.delete(
    `/api/komentar/${props.komentar.id}`
  );

  if (deleteRequest.status == 200) {
    toggleToast();
    toggleAlert();
  }
}

function toggleShowReply() {
  showReply.value = !showReply.value;
}
</script>
