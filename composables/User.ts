import { defineStore } from 'pinia'

export const useUser = defineStore("user", () => {
  const userAddress = ref<string | null>(null);

  function setUserAddress(newUserAddress: string) {
    userAddress.value = newUserAddress;
  }

  return {
    userAddress,
    setUserAddress,
  };
});
