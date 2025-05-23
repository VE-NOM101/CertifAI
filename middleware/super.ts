export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUser();
  const toast = useToast();

  const config = useRuntimeConfig();
  const contract = new CertifAI(
    config.public.alchemyRpcUrl,
    config.public.certifaiContract
  );
  const response = await contract.getSuperAdmin();

  if (response.status) {
    if (response.address.toLowerCase() !== user.userAddress?.toLowerCase()) {
      toast.add({
        title: "Unauthorized",
        description: "Restricted for you",
        color: "error",
        icon: "si:error-line",
      });
      return abortNavigation();
    }
  } else {
    toast.add({
      title: "Error",
      description: "Something wrong",
      color: "error",
      icon: "si:error-line",
    });
    return abortNavigation();
  }
});
