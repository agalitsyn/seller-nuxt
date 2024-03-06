<script setup lang="ts">
import { type SaleItemDTO, type OrderDTO } from '~/types'

const props = defineProps({
  editable: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Object as PropType<SaleItemDTO[]>,
    required: true
  },
  orders: {
    type: Object as PropType<OrderDTO[]>,
    required: true
  }
})

const rows = ref(props.rows)

watchEffect(() => {
  rows.value = props.rows
})

const emit = defineEmits(['sync'])

const columns = [
  {
    label: '№',
    key: 'number',
    sortable: true,
    direction: 'desc' as const
  },
  {
    label: 'Штрих-код',
    key: 'barcode'
  },
  {
    label: 'Оптовая цена',
    key: 'wholesalePrice'
  },
  {
    label: 'Розничная цена',
    key: 'price'
  },
  {
    label: 'Количество',
    key: 'quantity'
  },
  {
    label: 'Оптовая цена, всего',
    key: 'wholesalePriceTotal'
  },
  {
    label: 'Розничная цена, всего',
    key: 'priceTotal'
  }
]

const selectedColumns = ref(columns.filter((column) => column.key !== 'createdAt'))
const filteredColumns = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return rows.value
  }

  return rows.value.filter((item) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

// const rowMenuItems = (row: SaleItemDTO) => [
//   [
//     {
//       label: 'Редактировать',
//       icon: 'i-heroicons-pencil-square-20-solid',
//       click: () => openDialog(row)
//     }
//   ],
//   [
//     {
//       label: 'Удалить',
//       icon: 'i-heroicons-trash-20-solid'
//     }
//   ]
// ]

const editedItem = ref({ quantity: 1 } as SaleItemDTO)

const isDialogOpened = ref(false)

const openCreateDialog = () => {
  editedItem.value = { quantity: 1 } as SaleItemDTO
  isDialogOpened.value = true
}

const openEditDialog = (row: SaleItemDTO) => {
  if (!props.editable) {
    return
  }

  editedItem.value = row
  isDialogOpened.value = true
}

const syncEditedItemToRow = () => {
  const index = rows.value.findIndex((item) => item.barcode === editedItem.value.barcode)
  if (index !== -1) {
    rows.value[index] = editedItem.value
  } else {
    rows.value.push(editedItem.value)
  }

  emit('sync', index)
}
</script>

<template>
  <div>
    <h1>Позиции</h1>

    <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700 md:justify-between justify-start gap-1.5">
      <div class="flex gap-2">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple :ui-menu="{ width: 'w-60' }">
          <UButton icon="i-heroicons-view-columns" color="white" />
        </USelectMenu>
      </div>

      <div class="flex gap-2">
        <UInput v-model="q" placeholder="Поиск" />
        <UButton v-if="editable" color="primary" variant="solid" @click="openCreateDialog">Добавить</UButton>
      </div>
    </div>

    <UTable
      class="w-full"
      :rows="filteredRows"
      :columns="filteredColumns"
      :empty-state="{ icon: '', label: 'Нет данных' }"
      :ui="{ td: { color: 'text-gray-600 dark:text-gray-400' } }"
      @select="openEditDialog"
    >
      <template #number-data="{ index }"> {{ index + 1 }}</template>

      <!-- <template v-if="editable" #actions-data="{ row }">
        <UDropdown :items="rowMenuItems(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template> -->
    </UTable>

    <SaleItemModal
      v-model:open="isDialogOpened"
      v-model:item="editedItem"
      :orders="props.orders"
      @sync="syncEditedItemToRow"
    />
  </div>
</template>
