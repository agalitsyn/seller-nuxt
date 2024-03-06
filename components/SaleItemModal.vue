<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { SaleItemDTO, OrderDTO } from '~/types'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object as PropType<SaleItemDTO>,
    required: true
  },
  orders: {
    type: Object as PropType<OrderDTO[]>,
    required: true
  }
})

const emit = defineEmits(['update:open', 'update:item', 'sync'])

const isOpen = ref(props.open)
const item = ref(props.item)

watchEffect(() => {
  isOpen.value = props.open
  item.value = props.item
})

const updateIsOpen = (value: boolean) => {
  isOpen.value = value
  emit('update:open', value)
}

const updateItem = (value: SaleItemDTO) => {
  item.value = value
  emit('update:item', value)

  updateIsOpen(false)
  emit('sync')
}

const title = computed(() => {
  return props.item.barcode ? 'Редактировать позицию' : 'Добавить позицию'
})
</script>

<template>
  <div>
    <USlideover v-model="isOpen" prevent-close>
      <UCard
        class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{ title }}</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="updateIsOpen(false)"
            />
          </div>
        </template>

        <SaleItemForm v-model:item="item" :orders="props.orders" @update:item="updateItem" />

        <!-- <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="ghost" label="Отмена" @click="updateIsOpen(false)" />
          </div>
        </template> -->
      </UCard>
    </USlideover>
  </div>
</template>
