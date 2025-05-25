// stores/user.ts
import { defineStore } from "pinia";

export const useContract = defineStore("contract", () => {
  const config = useRuntimeConfig();

  // ✅ initialize once here
  const contractInstance = new CertifAI(
    config.public.alchemyRpcUrl,
    config.public.certifaiContract
  );

  function getContractInstance() {
    return contractInstance;
  }

  return {
    getContractInstance,
  };
});
