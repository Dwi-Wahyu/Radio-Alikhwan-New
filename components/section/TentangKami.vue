<template>
  <div class="px-6 py-20 sm:px-20 sm:py-28 bg-primary text-white">
    <div class="text-center mb-8" id="tentang-kami">
      <h1 class="text-2xl mb-3 font-bold">Tentang Kami</h1>
      <h1 class="text-lg font-semibold">Mengenal Kami Lebih Dekat</h1>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div class="flex flex-col gap-1 text-justify" id="kata-sambutan">
        <h1 class="font-semibold mb-1">Kata Sambutan</h1>
        <div v-if="kataSambutan">
          <span v-html="kataSambutan"></span>
        </div>
      </div>

      <div id="profil-radio">
        <h1 class="font-semibold mb-1">Profil Radio</h1>
        <table>
          <tbody>
            <tr v-for="(about, elementIdx) in aboutCompany" :key="elementIdx">
              <td class="sm:min-w-52">
                {{ about.label }}
              </td>
              <td>: {{ about.content }}</td>
            </tr>
          </tbody>
        </table>
        <button
          @click="navigateTo('/iklan/tarif-iklan.png', { external: true })"
          class="text-blue-600 underline"
        >
          Tertarik Untuk Beriklan?
        </button>
      </div>
    </div>

    <div class="mt-5" id="profil-pendengar">
      <h1 class="font-semibold mb-3 text-center">Statistik</h1>

      <div v-if="!statistik.length">
        <h1>Belum ada statistik</h1>
      </div>

      <div
        v-if="statistik.length"
        class="grid grid-cols-1 place-items-center sm:grid-cols-2 items-center justify-center gap-y-10"
      >
        <div v-for="(element, elementIdx) in statistik">
          <h1 class="text-center">{{ element.nama_statistik }}</h1>
          <Charts legend-text-color="white" :chart-data="element.chartData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { backgroundColor, hoverBackgroundColor } from "~/data/chartColor";
import Charts from "../landing/Charts.vue";

const axios = useAxios();
const kataSambutan = ref("");
const statistik = ref([]);

const formatSiaran = ref({
  labels: ["Indonesia", "Daerah", "Dangdut / Melayu", "Nasyid / Qasidah"],
  datasets: [
    {
      label: "Dataset 1",
      data: [80, 10, 5, 5],
      backgroundColor: ["#2C3E50", "#8E44AD", "#C0392B", "#D35400"],
      hoverBackgroundColor: [
        "#2C3E50AA",
        "#8E44ADAA",
        "#C0392BAA",
        "#D35400AA",
      ],
    },
  ],
});

const profilKelasPendengar = ref({
  labels: ["Kelas A, B, dan C", "Kelas D"],
  datasets: [
    {
      label: "Dataset 1",
      data: [83, 17],
      backgroundColor: ["#2C3E50", "#8E44AD"],
      hoverBackgroundColor: ["#2C3E50AA", "#8E44ADAA"],
    },
  ],
});

const profilUsiaPendengar = ref({
  labels: [
    "Dibawah 15 Tahun",
    "15 - 19 Tahun",
    "20 - 29 Tahun",
    "30 - 39 Tahun",
    "Diatas 40 Tahun",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [5, 20, 40, 25, 10],
      backgroundColor: ["#2C3E50", "#8E44AD", "#C0392B", "#D35400", "#27AE60"],
      hoverBackgroundColor: [
        "#2C3E50AA",
        "#8E44ADAA",
        "#C0392BAA",
        "#D35400AA",
        "#27AE60AA",
      ],
    },
  ],
});

const profilGenderPendengar = ref({
  labels: ["Laki Laki", "Perempuan"],
  datasets: [
    {
      label: "Dataset 1",
      data: [58, 42],
      backgroundColor: ["#2C3E50", "#8E44AD"],
      hoverBackgroundColor: ["#2C3E50AA", "#8E44ADAA"],
    },
  ],
});

const aboutCompany = [
  {
    label: "COMPANY",
    content: "PT. RADIO AL-IKHWAN MAKASSAR",
  },
  {
    label: "STATION",
    content: "RADIO AL-IKHWAN (RAIFMMOSLEM)",
  },
  {
    label: "AIR TIME",
    content: "AIR TIME : 06.30 – 22.00",
  },
  {
    label: "COVERAGE AREAS",
    content: "MAKASSAR, MAROS, PANGKEP, BARRU, GOWA, TAKALAR",
  },
  {
    label: "TRANSMITTER POWER",
    content: "500 WATT",
  },
  {
    label: "PRSSNI",
    content: "223-VIII/1978",
  },
  {
    label: "ADDRESS",
    content:
      "ADDRESS : Jl. Abd Kadir No. 1 A, Kel. Bontoduri, Kec. Tamalate, Kota Makassar, SULSEL",
  },
  {
    label: "Whatsapp",
    content: "085210210911",
  },
  {
    label: "Email",
    content: "fmraimakassar@gmail.com",
  },
];

async function fetchKataSambutan() {
  const request = await axios.get("/api/kata-sambutan");

  if (request.status == 200) {
    kataSambutan.value = request.data.content;
  }
}

async function fetchStatistik() {
  const request = await axios.get("/api/statistik");

  if (request.status == 200) {
    statistik.value = request.data;

    const temp = [];

    for (const element of request.data) {
      let labels = [];
      let dataPerKategori = [];

      for (const item of element.data) {
        labels.push(item.kategori);
        dataPerKategori.push(parseInt(item.persentase));
      }

      let datasets = [
        {
          label: "Dataset 1",
          data: dataPerKategori,
          backgroundColor: backgroundColor.slice(0, labels.length),
          hoverBackgroundColor: hoverBackgroundColor.slice(0, labels.length),
        },
      ];

      let chartData = {
        labels,
        datasets,
      };

      let tempData = {
        id_statistik: element.id,
        nama_statistik: element.nama_statistik,
        chartData,
      };

      temp.push(tempData);
    }

    statistik.value = temp;
  }
}

onMounted(async () => {
  fetchKataSambutan();
  fetchStatistik();
});
</script>
