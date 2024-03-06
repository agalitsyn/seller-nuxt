<script setup lang="ts">
import { format } from 'date-fns'

import { SaleStatus, type SaleDTO } from '~/types'

const columns = [
  {
    label: '№',
    key: 'number',
    sortable: true,
    direction: 'desc' as const
  },
  {
    label: 'Период',
    key: 'period'
  },
  {
    label: 'Позиций',
    key: 'total'
  },
  {
    label: 'Статус',
    key: 'status'
  },
  {
    label: 'Создано',
    key: 'createdAt'
  },
  {
    label: 'Обновлено',
    key: 'updatedAt'
  }
  // {
  //   key: 'actions'
  // }
]

const props = defineProps<{
  data: SaleDTO[]
}>()

const selectedColumns = ref(columns.filter((column) => column.key !== 'createdAt' && column.key !== 'updatedAt'))
const filteredColumns = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return props.data.slice((page.value - 1) * pageCount, page.value * pageCount)
  }

  return props.data.filter((item) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const page = ref(1)
const pageCount = 10

function select(row: SaleDTO) {
  navigateTo(`/sales/${row.number}`)
}

type StatusLocalized = {
  title: string
  color: string
}

const formatStatus = (status: SaleStatus): StatusLocalized => {
  switch (status) {
    case SaleStatus.Draft:
      return { title: 'Черновик', color: 'gray' }
    case SaleStatus.Review:
      return { title: 'На рассмотрении', color: 'orange' }
    case SaleStatus.Approved:
      return { title: 'Одобрено', color: 'emerald' }
  }
}

const formatPeriod = (row: SaleDTO) => {
  return `${formatDate(row.periodStartedAt)} - ${formatDate(row.periodStoppedAt)}`
}

const formatDate = (value: string, template: string = 'dd-MM-yyyy') => {
  return format(new Date(value), template)
}

const isDialogOpened = ref(false)
</script>

<template>
  <div>
    <h1>Отчеты о продажах</h1>

    <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700 md:justify-between justify-start gap-1.5">
      <div class="flex gap-2">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple :ui-menu="{ width: 'w-40' }">
          <UButton icon="i-heroicons-view-columns" color="white" />
        </USelectMenu>
      </div>

      <div class="flex gap-2">
        <UInput v-model="q" placeholder="Поиск" />
        <DatePickerRange />
        <UButton color="primary" variant="solid" @click="isDialogOpened = true">Добавить</UButton>
      </div>
    </div>

    <UTable
      class="w-full"
      :rows="filteredRows"
      :columns="filteredColumns"
      :empty-state="{ icon: '', label: 'Нет данных' }"
      :ui="{ td: { color: 'text-gray-600 dark:text-gray-400' } }"
      @select="select"
    >
      <template #period-data="{ row }">{{ formatPeriod(row) }}</template>

      <template #createdAt-data="{ row }">{{ formatDate(row.createdAt, 'dd-MM-yyyy HH:mm') }}</template>

      <template #updatedAt-data="{ row }">{{ formatDate(row.updatedAt, 'dd-MM-yyyy HH:mm') }}</template>

      <template #status-data="{ row }">
        <UBadge
          size="xs"
          :label="formatStatus(row.status).title"
          :color="formatStatus(row.status).color"
          variant="soft"
        />
      </template>
    </UTable>

    <div class="flex justify-end py-3.5 border-gray-200 dark:border-gray-700">
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="data.length"
        :active-button="{ variant: 'outline' }"
      />
    </div>

    <SaleModal v-model="isDialogOpened" />
  </div>
</template>
