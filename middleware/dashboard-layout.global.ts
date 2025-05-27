export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUser();
  const toast = useToast();
  if (to.path.startsWith("/dashboard")) {
    // if (!user.userAddress) {
    //   toast.add({
    //     title: "Error",
    //     description: "Please connect to your wallet first!!",
    //     color: "error",
    //     icon: "si:error-line",
    //   });
    //   return navigateTo("/");
    // }
    to.meta.layout = "dashboard-layout";
  }
});
