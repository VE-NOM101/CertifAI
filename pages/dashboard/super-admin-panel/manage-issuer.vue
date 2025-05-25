<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import Joi from 'joi'
import type { FormSubmitEvent } from '@nuxt/ui'

const UButton = resolveComponent('UButton')

const schema = Joi.object({
  address: Joi.string()
    .required()
    .label('Public address')
})

const state = reactive({
  address: undefined as string | undefined
})
const toast = useToast()
const contract = useContract();
const rpc = contract.getContractInstance();
const isAdding = ref(false);
const isRemoving = ref(false);

async function addIssuer(payload: FormSubmitEvent<unknown>) {
  const event = payload as FormSubmitEvent<{ address: string }>

  try {
    isAdding.value = true;
    const response = await rpc.addIssuer(event.data.address);
    isAdding.value = false;
    if (response.status) {
      toast.add({
        title: 'Success',
        description: `Issuer Added.`,
        color: 'success'
      });
    } else {
      const message = response.message;
      console.error(message);
      toast.add({
        title: 'Error',
        description: `${message.slice(0, 100)}...`,
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

const table = useTemplateRef('table')

type IssuerList = {
  account: string
}

const data = ref<IssuerList[]>([])

async function removeIssuer(index: number) {
  const address = data.value.at(index)?.account;
  try {
    isRemoving.value = true;
    const response = await rpc.removeIssuer(address);
    isRemoving.value = false;
    if (response.status) {
      toast.add({
        title: 'Success',
        description: `Issuer Removed.`,
        color: 'success'
      });
    } else {
      const message = response.message;
      console.error(message);
      toast.add({
        title: 'Error',
        description: `${message.slice(0, 100)}...`,
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


const columns: TableColumn<IssuerList>[] = [
  {
    accessorKey: 'account',
    header: 'Account',
    cell: ({ row }) => `${row.getValue('account')}`
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) =>
      h(UButton, {
        icon: 'i-pajamas-remove',
        color: 'error',
        variant: 'outline',
        class: 'ml-auto',
        label: 'Remove',
        onClick: () => removeIssuer(row.index) 
      })
  }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})

onMounted(async () => {
  const response = await rpc.getAllIssuers();
  const issuers = Array.from(response);

  const formattedData = issuers.map((issuer) => {
    return { account: issuer }
  })

  data.value = <IssuerList[]>formattedData;
})
</script>

<template>
  <div class="w-full px-4 sm:px-6 md:px-12 pt-6 space-y-4">
    <!-- Add Issuer Button -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
      <UModal title="Add Issuer" description="Use public address only">
        <UButton color="warning" icon="i-heroicons-plus" label="Add Issuer" variant="subtle" />

        <template #body>
          <UForm :schema="schema" :state="state" @submit="addIssuer">
            <UFormField name="address" label="Enter issuer's public address" class="m-4">
              <UInput class="w-full" v-model="state.address" type="string" placeholder="e.g. 0x..." />
            </UFormField>

            <div class="flex justify-end">
              <UButton :loading="isAdding" loading-icon="hugeicons:reload" color="warning" type="submit">Update
              </UButton>
            </div>
          </UForm>
        </template>
      </UModal>
    </div>

    <!-- Table -->
    <div
      class="w-full overflow-x-auto rounded-xl border border-default bg-white dark:bg-black/20 backdrop-blur-md shadow-md">
      <UTable ref="table" v-model:pagination="pagination" :data="data" :columns="columns"
        :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }" class="min-w-[500px] md:min-w-full" />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
  </div>
</template>
