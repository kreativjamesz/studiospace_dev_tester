export const useUserDataStore = defineStore('userDataStore', {
    state: () => ({
      username: '',
      auth: ''
    }),
    actions: {
      save_login(username, auth) { 
        this.username = username
        this.auth = auth
      }
    }
})