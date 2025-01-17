<template>
  <Header class="fixed top-0 left-0 z-50" />

  <div class="bg-[#F7F7F7] min-h-screen">
    <div
      v-if="artikelData"
      class="pt-28 flex-col md:flex-row md:px-20 md:pt-24 md:pb-10 flex smgap-8"
    >
      <div
        class="sm:bg-white sm:mt-0 p-5 flex flex-col gap-4 w-full rounded relative sm:shadow flex-grow"
      >
        <div
          class="w-fit gap-1 flex items-center px-4 py-2 sm:p-2 -top-8 sm:top-0 left-5 cursor-pointer rounded-full bg-white shadow absolute sm:-left-12"
          @click="navigateTo('/')"
        >
          <Icon name="line-md:chevron-left" />
          <h1 class="block sm:hidden font-semibold">Kembali</h1>
        </div>

        <div v-for="(artikel, artikelIdx) in artikelData">
          <div
            class="flex flex-col gap-3"
            v-if="artikel.id == id"
            :key="artikelIdx"
          >
            <h1 class="text-xl text-start font-semibold">
              {{ artikel.title }}
            </h1>
            <div class="flex justify-center">
              <img
                :src="`${baseURL}/artikel/thumbnail/${artikel.thumbnail}`"
                alt=""
                class=""
              />
            </div>

            <span class="text-justify" v-html="artikel.content"> </span>

            <h1>{{ moment(artikel.createdAt).format("YYYY-MM-DD") }}</h1>
          </div>
        </div>
      </div>

      <div class="md:w-[40vw] w-full p-5">
        <div class="flex items-center gap-3 mb-5">
          <h1 class="text-xl font-bold">Berita Lainnya</h1>
          <div class="border border-gray-400 flex-grow"></div>
        </div>

        <div
          v-for="(otherArtikel, otherArtikelIdx) in artikelData"
          class="flex flex-col gap-4"
        >
          <div
            v-if="otherArtikel.id != id"
            class="bg-white shadow flex items-center mb-4 gap-3 rounded-l-full cursor-pointer"
            @click="navigateTo(`/news/${otherArtikel.id}`)"
          >
            <img
              :src="`${baseURL}/artikel/thumbnail/${otherArtikel.thumbnail}`"
              alt=""
              class="rounded-full w-[5rem] h-[5rem]"
            />
            <h1 class="font-semibold">{{ otherArtikel.title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "login",
});

import moment from "moment";
import Header from "~/components/landing/Header.vue";

const route = useRoute();
const { id } = route.params;

const artikelSelected = ref([]);

type NewsData = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
};

type Artikel = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  thumbnail: string;
};

const news = ref<NewsData>();
const idValid = ref(false);

const artikel = ref<Artikel>();

const newsData: NewsData[] = [
  {
    id: "1",
    title:
      "Novak appeals in court against dearless Care cancellation of Australian",
    imageUrl: "/news/news1.png",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam suscipit, autem earum possimus blanditiis consequuntur inventore cupiditate iusto natus? Ratione non nesciunt qui officiis rem sapiente est similique voluptates quae facere fuga beatae, ullam excepturi velit ipsum explicabo, impedit dolores tenetur ut provident? Perferendis totam voluptate fugit ab facilis ullam est sit saepe minus ratione dolorem veniam ea provident nobis at cum beatae vel autem, similique asperiores voluptates recusandae voluptatem, numquam inventore. Cumque, impedit possimus. Architecto laborum laboriosam veritatis porro ab. Ut impedit minima aperiam eius numquam. Similique enim cupiditate sapiente sunt at totam autem est illum, eaque impedit hic! Sed molestiae similique optio ipsa quia consequuntur qui corporis sequi delectus accusamus ipsum nisi laborum temporibus, natus rerum reprehenderit quidem voluptate hic repudiandae dignissimos dolorem, reiciendis suscipit debitis eveniet? Voluptate tempore doloribus delectus saepe quasi sapiente ipsam. Nisi provident dolorem qui et quod corporis sit, esse dolor. Consectetur, cumque ipsa!",
  },
  {
    id: "2",
    title: "African Nation Are Struggling To Save",
    imageUrl: "/news/news2.png",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam suscipit, autem earum possimus blanditiis consequuntur inventore cupiditate iusto natus? Ratione non nesciunt qui officiis rem sapiente est similique voluptates quae facere fuga beatae, ullam excepturi velit ipsum explicabo, impedit dolores tenetur ut provident? Perferendis totam voluptate fugit ab facilis ullam est sit saepe minus ratione dolorem veniam ea provident nobis at cum beatae vel autem, similique asperiores voluptates recusandae voluptatem, numquam inventore. Cumque, impedit possimus. Architecto laborum laboriosam veritatis porro ab. Ut impedit minima aperiam eius numquam. Similique enim cupiditate sapiente sunt at totam autem est illum, eaque impedit hic! Sed molestiae similique optio ipsa quia consequuntur qui corporis sequi delectus accusamus ipsum nisi laborum temporibus, natus rerum reprehenderit quidem voluptate hic repudiandae dignissimos dolorem, reiciendis suscipit debitis eveniet? Voluptate tempore doloribus delectus saepe quasi sapiente ipsam. Nisi provident dolorem qui et quod corporis sit, esse dolor. Consectetur, cumque ipsa!",
  },
  {
    id: "3",
    title: "How to get best deals on",
    imageUrl: "/news/news3.png",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam suscipit, autem earum possimus blanditiis consequuntur inventore cupiditate iusto natus? Ratione non nesciunt qui officiis rem sapiente est similique voluptates quae facere fuga beatae, ullam excepturi velit ipsum explicabo, impedit dolores tenetur ut provident? Perferendis totam voluptate fugit ab facilis ullam est sit saepe minus ratione dolorem veniam ea provident nobis at cum beatae vel autem, similique asperiores voluptates recusandae voluptatem, numquam inventore. Cumque, impedit possimus. Architecto laborum laboriosam veritatis porro ab. Ut impedit minima aperiam eius numquam. Similique enim cupiditate sapiente sunt at totam autem est illum, eaque impedit hic! Sed molestiae similique optio ipsa quia consequuntur qui corporis sequi delectus accusamus ipsum nisi laborum temporibus, natus rerum reprehenderit quidem voluptate hic repudiandae dignissimos dolorem, reiciendis suscipit debitis eveniet? Voluptate tempore doloribus delectus saepe quasi sapiente ipsam. Nisi provident dolorem qui et quod corporis sit, esse dolor. Consectetur, cumque ipsa!",
  },
];

const axios = useAxios();

const runtimeConfig = useRuntimeConfig();
const { baseURL } = runtimeConfig.public.axios;

const artikelData = ref<Artikel[]>([]);

onMounted(async () => {
  const newsAvailable = newsData.find((temp) => temp.id == id);

  if (newsAvailable) {
    idValid.value = true;
    news.value = newsAvailable;
  }

  const getArtikel = await axios.get("/api/artikel", { params: { take: 5 } });

  if (getArtikel.status == 200) {
    console.log(getArtikel.data);

    artikelData.value = getArtikel.data;
  }
});
</script>
