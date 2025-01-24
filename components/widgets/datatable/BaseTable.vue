<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white text-sm overflow-hidden">
      <thead>
        <tr>
          <th
            v-if="showRowNumbers"
            class="px-4 bg-[#EAEFF3] py-2 text-left font-medium text-slate-600 rounded-l-[8px]"
          >
            No
          </th>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="bg-[#EAEFF3] px-4 py-2 text-left font-medium text-slate-600 last:rounded-r-[8px]"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="even:bg-slate-100 odd:bg-white font-semibold"
        >
          <td v-if="showRowNumbers" class="px-4 py-2 text-slate-700 rounded-l">
            {{ rowIndex + 1 }}
          </td>
          <td
            v-for="(value, colIndex) in columnsVisible"
            :key="colIndex"
            class="px-4 py-2 text-slate-700"
          >
            <template v-if="$slots[`cell-${colIndex}`]">
              <slot
                :name="`cell-${colIndex}`"
                :item="value"
                :index="colIndex"
              ></slot>
            </template>
            <template v-else>
              <div v-if="value.includes('img')">
                <!-- prettier-ignore -->
                <img :src="
                `${baseURL}/${value.split(':')[2]}/${
                    row[value.split(':')[1]]
                  }`
                " alt="" class="max-w-40">
              </div>
              <div v-if="!value.includes('img')">
                <span v-html="truncateHtml(row[value], 200)"></span>
              </div>
            </template>
          </td>
          <td
            v-if="showButtonAction"
            class="px-4 py-2 text-slate-700 rounded-r"
          >
            <div class="flex items-center gap-2">
              <BaseButton
                v-for="(action, actionIndex) in actions"
                :key="actionIndex"
                @click="handleAction(action, row)"
                :variant="action.btnVariant"
                size="sm"
              >
                <component :is="action.icon" v-if="action.icon"></component>
                <span class="mt-1 ml-1">
                  {{ action.label }}
                </span>
              </BaseButton>
            </div>
          </td>
        </tr>

        <tr v-if="data.length === 0">
          <td
            :colspan="
              headers.length +
              (showRowNumbers ? 1 : 0) +
              (showButtonAction ? 1 : 0)
            "
            class="text-center p-4 text-danger bg-red-100 font-bold text-base"
          >
            <h1 v-if="!loading">Tidak Ada Data Yang Di Temukan</h1>
            <h1 v-if="loading">Tunggu Sejenak</h1>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { truncateHtml } from "~/function/truncateHtml";
import BaseButton from "../button/BaseButton.vue";

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  actions: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showRowNumbers: {
    type: Boolean,
    default: false,
  },
  showButtonAction: {
    type: Boolean,
    default: false,
  },
  columnsVisible: {
    type: Array,
    default: () => [],
  },
});

const handleAction = (action, row) => {
  if (typeof action.onClick === "function") {
    action.onClick(row);
  }
};
</script>
