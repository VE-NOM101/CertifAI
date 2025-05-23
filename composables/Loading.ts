import { defineStore } from "pinia";

export const useLoading = defineStore("loading", () => {
  const isLoading = ref<boolean | false>(false);
  function setLoading(val: boolean) {
    isLoading.value = val;
  }
  return {
    isLoading,
    setLoading,
  };
});
