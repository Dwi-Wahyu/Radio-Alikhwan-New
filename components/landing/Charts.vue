<script lang="ts" setup>
import { ref } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "vue-chartjs";

import ChartDataLabels from "chartjs-plugin-datalabels";

// Registrasi plugin Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

// Mendefinisikan props
const props = defineProps<{
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  };
  legendTextColor: string;
}>();

// Jika Anda ingin menggunakan default value untuk chartData
const defaultChartData = {
  labels: ["Kategori A", "Kategori B", "Kategori C"],
  datasets: [
    {
      label: "Dataset 1",
      data: [40, 30, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384AA", "#36A2EBAA", "#FFCE56AA"],
    },
  ],
};

const defaultLegendTextColor = "white";

// Menggunakan props atau default value jika tidak ada
const chartData = ref(props.chartData || defaultChartData);
const legendTextColor = ref(props.legendTextColor || defaultLegendTextColor);
</script>

<template>
  <div>
    <Pie
      :data="chartData"
      :options="{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: legendTextColor,
            },
          },
          datalabels: {
            color: 'white',
          },
        },
      }"
    />
  </div>
</template>
