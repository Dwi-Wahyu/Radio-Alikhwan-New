import { defineStore } from "pinia";
import type { ResponseError } from "~/types/ResponseError";

export type Struktur = {
  id: string;
  urutan: number;
  nama: string;
  gambar: string;
  deskripsi: string;
};

export const useMyStrukturStore = defineStore({
  id: "myStrukturStore",
  state: () => ({
    data: [] as Struktur[],
    error: false,
    post_success: false,
    error_data: null as ResponseError | null,
    loading: false,
  }),
  actions: {
    async getData() {
      this.loading = true;
      this.error = false;
      this.error_data = null;
      this.data = [];
      const axios = useAxios();

      const getAllStruktur = await axios.get("/api/struktur");

      if (getAllStruktur.status == 200) {
        this.data = getAllStruktur.data;
      }
      return new Promise((resolve, reject) => {
        axios.get("/api/struktur").then((response) => {});
      });
    },
  },
});
