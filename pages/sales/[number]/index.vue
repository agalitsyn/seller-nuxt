<script setup lang="ts">
import { format, isSameDay } from 'date-fns'

import { SaleStatus, type SaleEditDTO, formatStatus, type SaleItemDTO, type OrderDTO } from '~/types'

import { ordersMock, saleMock } from '~/mock'

const user = useUser()
const toast = useToast()

type State = {
  number: number
  status: SaleStatus
  period: { start: Date; end: Date }
  items: SaleItemDTO[]
}

const state: State = reactive({
  number: 0,
  status: SaleStatus.Draft,
  period: { start: new Date(), end: new Date() },
  items: []
})

const sale = ref({} as SaleEditDTO)
const orders = ref([] as OrderDTO[])

const breadcrumbs = computed(() => [
  {
    label: 'Главная',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Отчет о продажах',
    to: `/sales/${sale.value.number}`
  }
])

const initialDataFetched = ref(false)

const fetchData = async () => {
  await fetchSale()
  await fetchOrders()

  console.log(state.items, sale.value.items)
}

const fetchSale = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    sale.value = saleMock
    initialDataFetched.value = true

    state.number = sale.value.number
    state.status = sale.value.status
    state.period = {
      start: new Date(sale.value.periodStartedAt),
      end: new Date(sale.value.periodStoppedAt)
    }
    state.items = Object.assign([], sale.value.items)
  } catch (error) {
    console.error(error)
    toast.add({ title: 'Ошибка загрузки отчета', timeout: 3000, color: 'red' })
  }
}

const fetchOrders = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    orders.value = ordersMock
  } catch (error) {
    console.error(error)
    toast.add({ title: 'Ошибка загрузки заказов', timeout: 3000, color: 'red' })
  }
}

onMounted(async () => {
  await fetchData()
})

const editable = computed<boolean>((): boolean => {
  if (sale.value.status === SaleStatus.Draft) {
    return true
  }
  return false
})

const canUpdateStatus = computed<boolean>((): boolean => {
  if (sale.value.status === SaleStatus.Draft) {
    return true
  }
  return false
})

const pageMenuItems = computed(() => {
  const items = [
    [
      {
        label: 'Экспорт в excel',
        icon: 'i-heroicons-document-duplicate-20-solid',
        click: () => {
          console.log('foo')
        }
      }
    ]
  ]
  return items
})

const loading = ref(false)

const numberUpdate = async () => {
  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } catch (error) {
    console.error(error)
    toast.add({ title: 'Ошибка обновления номера', timeout: 3000, color: 'red' })

    // state.number = sale.value.number
  }

  // refetch data from server
  await fetchData()

  loading.value = false
}

// periodUpdate
// note: calendar don't have change event
watch(
  () => state.period,
  async (value) => {
    if (
      isSameDay(value.start, new Date(sale.value.periodStartedAt)) &&
      isSameDay(value.end, new Date(sale.value.periodStoppedAt))
    ) {
      // nothing
    } else {
      loading.value = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(error)
        toast.add({ title: 'Ошибка обновления периода', timeout: 3000, color: 'red' })

        // state.period = {
        //   start: new Date(sale.value.periodStartedAt),
        //   end: new Date(sale.value.periodStoppedAt)
        // }
      }

      // refetch data from server
      await fetchData()

      loading.value = false
    }
  }
)

const statusUpdate = async () => {
  loading.value = true
  try {
    state.status = SaleStatus.Review

    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.add({ title: 'Отправлено', timeout: 3000, color: 'green' })
  } catch (error) {
    console.error(error)
    toast.add({ title: 'Ошибка добавления позиции', timeout: 3000, color: 'red' })

    // state.status = sale.value.status
  }

  // refetch data from server
  await fetchData()

  loading.value = false
}

const rowUpdate = async (index: number) => {
  let item: SaleItemDTO = {} as SaleItemDTO
  if (index !== -1) {
    item = state.items[index]
  } else {
    item = state.items[state.items.length - 1]
  }

  loading.value = true
  try {
    // send item
    console.log('updated item', item)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } catch (error) {
    console.error(error)
    toast.add({ title: 'Ошибка отправки', timeout: 3000, color: 'red' })
  }

  // refetch data from server
  await fetchData()

  loading.value = false
}
</script>

<template>
  <div>
    <div v-if="!initialDataFetched">
      <div class="flex items-center space-x-4">
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>
    <div v-else>
      <UProgress v-if="loading" size="sm" animation="carousel" class="mb-1" />

      <UBreadcrumb :links="breadcrumbs" class="mb-6" :ui="{ active: 'text-white-500 dark:text-white-400' }" />

      <ShopTitle />

      <div class="flex justify-between items-center mb-10">
        <div class="flex items-center gap-2">
          <div>Отчет о продаже №</div>
          <UInput v-if="editable" v-model="state.number" variant="outline" class="w-16" @change="numberUpdate" />
          <div v-else>
            {{ sale.number }}
          </div>
          <div>от {{ format(new Date(sale.createdAt), 'dd-MM-yyyy HH:mm') }}</div>
          <div>за период</div>
          <UPopover :popper="{ placement: 'bottom-start' }" :disabled="!editable">
            <UButton color="white" class="text-gray-400 font-normal" icon="i-heroicons-calendar-days-20-solid">
              {{ format(state.period.start, 'dd-MM-yyyy') }} -
              {{ format(state.period.end, 'dd-MM-yyyy') }}
            </UButton>

            <template #panel="{ close }">
              <DatePicker v-model="state.period" @close="close" />
            </template>
          </UPopover>
        </div>

        <div class="flex gap-2">
          <UDropdown :items="pageMenuItems" :popper="{ placement: 'bottom-start' }">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-vertical-20-solid" />
          </UDropdown>
        </div>
      </div>

      <div class="flex justify-between items-center mb-10">
        <div class="flex gap-2">
          <UBadge
            :label="formatStatus(state.status).title"
            :color="formatStatus(state.status).color"
            size="lg"
            variant="subtle"
          />
          <UButton
            v-if="canUpdateStatus"
            color="orange"
            variant="soft"
            icon="i-heroicons-paper-airplane"
            :disabled="state.items.length === 0"
            @click="statusUpdate"
          >
            Отправить
          </UButton>
        </div>
      </div>

      <SaleItemsTable :rows="state.items" :orders="orders" :editable="editable" @sync="rowUpdate" />
    </div>
  </div>
</template>
