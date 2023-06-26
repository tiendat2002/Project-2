import { defineStore } from "pinia";

export const useLogin = defineStore("showModalLogin", {
  state: () => ({
    isShowModalLogin: false,
  }),
  getters: {},
  actions: {
    showModalLogin() {
      this.isShowModalLogin = true;
    },
    hiddenModalLogin() {
      this.isShowModalLogin = false;
    },
  },
});
