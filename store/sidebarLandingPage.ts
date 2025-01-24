import { defineStore } from "pinia";

export const useMyLandingPageSidebar = defineStore("myLandingPageSidebar", {
  state: () => ({
    appName: "Radio Alikhwan",
    sidebarActive: false,
  }),
  actions: {
    toggleSidebarLandingPage() {
      this.sidebarActive = !this.sidebarActive;
    },

    actionSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
  },
});
