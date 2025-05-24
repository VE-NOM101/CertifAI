<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'

const table = useTemplateRef('table')

type IssuerList = {
  account: string
  date: string
}

const data = ref<IssuerList[]>([
  {
    account: '0xb2e2256Be1cB4c90D8a2e138bbF3EF2463404f42',
    date: '2024-03-11T15:30:00',
  }
])

function removeIssuer(index: number) {
  data.value.splice(index, 1)
}

function addIssuer() {
  data.value.push({
    account: `0xNewIssuer${Math.random().toString().slice(2, 6)}`,
    date: new Date().toISOString()
  })
}

const columns: TableColumn<IssuerList>[] = [
  {
    accessorKey: 'account',
    header: 'Account',
    cell: ({ row }) => `${row.getValue('account')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) =>
      h(
        'button',
        {
          class:
            'text-xs md:text-sm text-white bg-red-600 hover:bg-red-700 px-2 md:px-3 py-1 rounded-md',
          onClick: () => removeIssuer(row.index)
        },
        'Remove'
      )
  }
]

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
</script>

<template>
  <div class="w-full px-4 sm:px-6 md:px-12 pt-6 space-y-6">
    <!-- Add Issuer Button -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
      <UButton icon="i-heroicons-plus" @click="addIssuer">
        Add Issuer
      </UButton>
    </div>

    <!-- Table -->
    <div class="w-full overflow-x-auto rounded-xl border border-default bg-white dark:bg-black/20 backdrop-blur-md shadow-md">
      <UTable
        ref="table"
        v-model:pagination="pagination"
        :data="data"
        :columns="columns"
        :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
        class="min-w-[500px] md:min-w-full"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
