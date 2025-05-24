<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '@nuxt/ui'

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

async function onSubmit(payload: FormSubmitEvent<unknown>) {
  const event = payload as FormSubmitEvent<{ fee: number }>
  toast.add({
    title: 'Success',
    description: `Validation fee submitted: ${event.data.fee} ETH`,
    color: 'success'
  })
  console.log(event.data)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-[50vh] px-4">
    <UForm :schema="schema" :state="state" @submit="onSubmit"
      class="w-full max-w-md space-y-6 bg-white/20 dark:bg-black/20 backdrop-blur-xl border rounded-xl p-6 shadow-lg">
      <UFormField name="fee" label="Validation Fee (ETH)">
        <UInput v-model="state.fee" type="number" step="0.0001" placeholder="e.g. 0.05" />
      </UFormField>

      <div class="flex justify-end">
        <UButton type="submit">Update</UButton>
      </div>
    </UForm>
  </div>
</template>
