<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '@nuxt/ui'
import { ethers } from 'ethers'

const schema = Joi.object({
  fee: Joi.number()
    .greater(0)
    .required()
    .label('Validation Fee (ETH)')
})

const state = reactive({
  fee: undefined as number | undefined
})

const toast = useToast()
const contract = useContract();
const rpc = contract.getContractInstance();
const isUpdating = ref(false);

async function onSubmit(payload: FormSubmitEvent<unknown>) {
  const event = payload as FormSubmitEvent<{ fee: number }>

  try {
    isUpdating.value = true;
    const response = await rpc.updateValidationFee(event.data.fee);
    isUpdating.value = false;
    if (response.status) {
      await getValidationFee();
      toast.add({
        title: 'Success',
        description: `Validation fee updated`,
        color: 'success'
      });
    } else {
      toast.add({
        title: 'Error',
        description: `Validation fee can't be updated.`,
        color: 'error'
      });
    }
  } catch (error) {
    toast.add({
      title: 'Error',
      description: `Something gone wrong.`,
      color: 'error'
    });
  }
}


async function getValidationFee() {

  const response = await rpc.getValidationFee();
  const fee = ethers.formatEther(response);
  state.fee = parseFloat(fee);
}

onMounted(async () => {
  await getValidationFee();
})
</script>

<template>
  <div class="flex justify-center items-center min-h-[50vh] px-4">
    <UForm :schema="schema" :state="state" @submit="onSubmit"
      class="w-full max-w-md space-y-6 bg-white/20 dark:bg-black/20 backdrop-blur-xl border rounded-xl p-6 shadow-lg">
      <UFormField name="fee" label="Validation Fee (ETH)">
        <UInput v-model="state.fee" type="number" step="0.0001" placeholder="e.g. 0.05" />
      </UFormField>

      <div class="flex justify-end">
        <UButton :loading="isUpdating" loading-icon="hugeicons:reload" color="warning" type="submit">Update</UButton>
      </div>
    </UForm>
  </div>
</template>
