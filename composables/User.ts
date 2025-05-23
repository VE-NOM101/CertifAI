import { defineStore } from 'pinia'

export const useUser = defineStore("user", () => {
  const userAddress = ref<string | null>(null);
  const userBalance = ref<string | null>(null);

  function setUserAddress(newUserAddress: string) {
    userAddress.value = newUserAddress;
  }

  function setUserBalance(newUserBalance: string) {
    userBalance.value = newUserBalance;
  }

  return {
    userAddress,
    setUserAddress,
    userBalance,
    setUserBalance
  };
});
