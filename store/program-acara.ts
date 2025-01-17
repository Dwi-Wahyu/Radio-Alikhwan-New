import { defineStore } from "pinia";
import type { ResponseError } from "~/types/ResponseError";
interface ResData {
  msg: string;
  data: any;
  status: string;
}

export const useMyProgramAcaraStore = defineStore({
  id: "myProgramAcara",
  state: () => ({
    currentPage: 1,
    totalPages: 1,
    perPage: 5,
    data: [] as any[],
    totalDatas: 5,
    tableHeaders: ["Judul", "Mulai", "Selesai", "Aksi"],
    step: 1,
    error: false,
    post_success: false,
    error_data: null as ResponseError | null,
    responseData: null as ResData | null,
    loading: false,
  }),
  actions: {
    async sendData(payload: any) {
      this.responseData = null;
      this.post_success = false;
      this.error = false;
      this.error_data = null;
      const axios = useAxios();

      return new Promise((resolve, reject) => {
        axios
          .post("/api/program-acara", payload)
          .then((response) => {
            this.responseData = response.data;
            this.post_success = true;

            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);

            this.error = true;
            this.error_data = error.response.data;
            reject(error.response.data);
          });
      });
    },

    async getData(payload: any) {
      this.loading = true;
      this.responseData = null;
      this.error = false;
      this.error_data = null;
      this.data = [];
      const axios = useAxios();

      return new Promise((resolve, reject) => {
        axios
          .get("/api/program-acara/data", { params: payload })
          .then((response) => {
            this.responseData = response.data;

            if (this.responseData) {
              for (const element of this.responseData.data.data) {
                let tempData = {
                  id: element.id,
                  judul: element.judul,
                  mulai: element.mulai,
                  selesai: element.selesai,
                };
                this.data.push(tempData);
              }
            }

            this.currentPage = this.responseData?.data.currentPage;
            this.totalPages = this.responseData?.data.totalPages;
            this.totalDatas = this.responseData?.data.totalDatas;
            this.loading = false;

            resolve(this.data);
          })
          .catch((error) => {
            this.error = true;
            this.error_data = error.response.data;
            this.loading = false;
            reject(error.response.data);
          });
      });
    },
  },
});
