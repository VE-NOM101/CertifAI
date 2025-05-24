import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const userAddress = ref<string | null>(null);
  const userBalance = ref<string | null>(null);
  const isSuperAdmin = ref<boolean | null>(null);
  const isIssuer = ref<boolean | null>(false);

  function setUserAddress(newUserAddress: string) {
    userAddress.value = newUserAddress;
  }

  function setUserBalance(newUserBalance: string) {
    userBalance.value = newUserBalance;
  }

  function setSuperAdmin(val: boolean) {
    isSuperAdmin.value = val;
  }
  function setIsIssuer(val: boolean) {
    isIssuer.value = val;
  }

  return {
    userAddress,
    setUserAddress,
    userBalance,
    setUserBalance,
    isSuperAdmin,
    setSuperAdmin,
    isIssuer,
    setIsIssuer,
  };
});
