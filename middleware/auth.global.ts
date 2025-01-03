export default defineNuxtRouteMiddleware((to, from) => {
  const userDataStore = useUserDataStore();

  if (to.path === "/welcome" && !userDataStore.username) {
    // Redirect to login if not logged in
    return navigateTo("/");
  }

  if (to.path === "/" && userDataStore.username) {
    // Redirect to welcome if already logged in
    return navigateTo("/welcome");
  }
});
