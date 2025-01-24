import { defineStore } from "pinia";
import { menuItems } from "~/data/sidebar/menu";

export const useMySidebarStore = defineStore("mySidebarStore", {
  state: () => ({
    appName: "Radio Alikhwan",
    menu: menuItems,
    parentActive: "/artikel",
    sidebarActive: true,
  }),
  actions: {
    async changeParent(payload: any) {
      this.parentActive = payload;
    },

    actionSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
  },
});
