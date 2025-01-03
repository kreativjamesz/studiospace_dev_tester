export const useUserDataStore = defineStore("userDataStore", {
  persist: true,
  state: () => ({
    username: "",
    auth: "",
  }),
  actions: {
    save_login(username: string, auth: string) {
      this.username = username;
      this.auth = auth;
    },
  },
});
