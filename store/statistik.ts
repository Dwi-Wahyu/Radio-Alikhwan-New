import { defineStore } from "pinia";
import { backgroundColor, hoverBackgroundColor } from "~/data/chartColor";
import type { ResponseError } from "~/types/ResponseError";
interface ResData {
  msg: string;
  data: any;
  status: string;
}

export const useMyStatistikStore = defineStore({
  id: "myStatistikStore",
  state: () => ({
    currentPage: 1,
    data: [] as any[],
    statistikData: [] as any[],
    error: false,
    post_success: false,
    statistikSelected: [] as any[],
    error_data: null as ResponseError | null,
    responseData: null as ResData | null,
    loading: false,
  }),
  actions: {
    async setStatistikSelected(id: string) {
      this.statistikSelected = this.data.find(
        (value) => value.id_statistik == id
      );
    },

    async createStatistic(payload: any) {
      this.responseData = null;
      this.post_success = false;
      this.error = false;
      this.error_data = null;
      const axios = useAxios();

      return new Promise((resolve, reject) => {
        axios
          .post("/api/statistik", payload)
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

    async sendData(payload: any) {
      this.responseData = null;
      this.post_success = false;
      this.error = false;
      this.error_data = null;
      const axios = useAxios();

      return new Promise((resolve, reject) => {
        axios
          .post("/api/statistik/data", payload)
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

    async getData() {
      this.loading = true;
      this.responseData = null;
      this.error = false;
      this.error_data = null;
      this.data = [];
      this.statistikData = [];
      const axios = useAxios();

      return new Promise((resolve, reject) => {
        axios
          .get("/api/statistik")
          .then((response) => {
            this.responseData = response.data;
            this.loading = false;

            if (response.data) {
              for (const element of response.data) {
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
                    hoverBackgroundColor: hoverBackgroundColor.slice(
                      0,
                      labels.length
                    ),
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

                let temp = {
                  label: element.nama_statistik,
                  value: element.id,
                };

                this.statistikData.push(temp);
                this.data.push(tempData);
              }
            }

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
