import { defineStore } from "pinia";
import type { ResponseError } from "~/types/ResponseError";
import moment from "moment";
interface ResData {
  msg: string;
  data: any;
  status: string;
}

export const useMyGaleriStore = defineStore({
  id: "myGaleriStore",
  state: () => ({
    currentPage: 1,
    totalPages: 1,
    perPage: 5,
    data: [] as any[],
    totalDatas: 5,
    tableHeaders: ["Nama File", "Status", "Diupload Pada", "Aksi"],
    step: 1,
    error: false,
    post_success: false,
    error_data: null as ResponseError | null,
    responseData: null as ResData | null,
    loading: false,
  }),
  actions: {
    async getData(payload: any) {
      this.loading = true;
      this.responseData = null;
      this.error = false;
      this.error_data = null;
      this.data = [];
      const axios = useAxios();

      return new Promise((resolve, reject) => {
        axios
          .get("/api/galeri/data", { params: payload })
          .then((response) => {
            this.responseData = response.data;

            if (this.responseData) {
              for (const element of this.responseData.data.data) {
                const diuploadTanggal = moment(element.uploadedAt).format(
                  "YYYY-MM-DD HH:ss"
                );

                let status = "Ditampilkan";

                if (!element.tampilkan) {
                  status = "Tidak ditampilkan";
                }

                let tempData = {
                  id: element.id,
                  path: element.path,
                  status,
                  uploadedAt: diuploadTanggal,
                };
                this.data.push(tempData);
              }
            }

            this.currentPage = this.responseData?.data.currentPage;
            this.totalPages = this.responseData?.data.totalPages;
            this.totalDatas = this.responseData?.data.totalDatas;
            this.loading = false;

            console.log(this.data);

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
