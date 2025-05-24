export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUser();
  const toast = useToast();

  if (!user.isIssuer && !user.isSuperAdmin) {
    toast.add({
      title: "Unauthorized",
      description: "Restricted for you",
      color: "error",
      icon: "si:error-line",
    });
    return abortNavigation();
  }
});
