import { defineStore } from "pinia";
import { useAxios } from "@/composables/useAxios";
import { jwtDecode } from "jwt-decode";
interface ErrorData {
  message: string;
  error: any;
  statusCode: string;
}

type User = {
  id: string;
  username: string;
};

export const useMyAuthStore = defineStore("myAuthStore", {
  state: () => ({
    orgName: "Radio AlIkhwan",
    appName: "Radio Alikhwan",
    appDesc: "Admin Landing Page Radio AlIkhwan",
    welcomeText: "Selamat Datang",
    welcomeDesc:
      "Silahkan masukkan username dan password untuk masuk ke aplikasi.",
    loginText: "Login Ke Aplikasi Admin Radio Alikhwan",
    token: "",
    user: null as User | null,
    loading: false,
    alwaysLogin: false,
    error: false,
    error_data: null as ErrorData | null,
  }),
  persist: true,
  getters: {
    isTokenExpired(state): boolean {
      if (!state.token) return true;

      try {
        const decoded: { exp: number } = jwtDecode(state.token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (e) {
        return true;
      }
    },
  },
  actions: {
    clearToken() {
      this.token = "";
    },

    async login(credentials: {
      username: string;
      password: string;
      alwaysLogin: any;
    }) {
      this.loading = true;
      this.error = false;
      this.error_data = null;
      const axios = useAxios();

      return new Promise((resolve, reject) => {
        axios
          .post("/auth/login", credentials)
          .then((response) => {
            this.loading = false;
            this.alwaysLogin = credentials.alwaysLogin;
            this.token = response.data.access_token;
            this.user = response.data.user;

            console.log(this.user);

            resolve(resolve);
          })
          .catch((error: any) => {
            this.loading = false;
            this.error = true;
            this.error_data = error.response.data;
            reject(error);
          });
      });
    },
  },
});
