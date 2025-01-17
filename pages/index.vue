<template>
  <Header class="fixed top-0 left-0 z-50" />
  <Sidebar />

  <Home />
  <Artikel />
  <TentangKami />
  <ProgramAcara />
  <Struktur />
  <Gallery />
  <Footer />
</template>

<script setup>
import Header from "~/components/landing/Header.vue";
import Sidebar from "~/components/landing/Sidebar.vue";
import Artikel from "~/components/section/Artikel.vue";
import Footer from "~/components/section/Footer.vue";
import Gallery from "~/components/section/Gallery.vue";
import Home from "~/components/section/Home.vue";
import ProgramAcara from "~/components/section/ProgramAcara.vue";
import Struktur from "~/components/section/Struktur.vue";
import TentangKami from "~/components/section/TentangKami.vue";

definePageMeta({
  layout: "login",
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
