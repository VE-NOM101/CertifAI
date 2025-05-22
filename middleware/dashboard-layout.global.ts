export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith("/dashboard")) {
    to.meta.layout = "dashboard-layout";
  }
});
