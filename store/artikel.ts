import { defineStore } from "pinia";
interface ResData {
  msg: string;
  data: any;
  status: string;
}

import moment from "moment";

export const useMyArtikelStore = defineStore({
  id: "myArtikelStore",
  state: () => ({
    currentPage: 1,
    totalPages: 1,
    perPage: 5,
    data: [] as any[],
    totalDatas: 5,
    tableHeaders: ["Judul", "Content", "Thumbnail", "Diupload Pada", "Aksi"],
    step: 1,
    error: false,
    error_data: null as ResData | null,
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
          .get("/api/artikel/data", { params: payload })
          .then((response) => {
            this.responseData = response.data;

            if (this.responseData) {
              for (const element of this.responseData.data.data) {
                const createdAt = moment(element.createdAt).format(
                  "YYYY-MM-DD HH:mm"
                );

                let tempData = {
                  id: element.id,
                  title: element.title,
                  content: element.content,
                  thumbnail: element.thumbnail,
                  createdAt,
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
            console.log(error);

            this.error = true;
            this.error_data = error.response.data;
            this.loading = false;
            // reject(error.response.data)
          });
      });
    },
  },
});
