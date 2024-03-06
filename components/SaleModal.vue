<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)

watchEffect(() => {
  isOpen.value = props.modelValue
})

const updateIsOpen = (value: boolean) => {
  isOpen.value = value
  emit('update:modelValue', value)
}
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
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Создать отчет о продажах</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="updateIsOpen(false)"
            />
          </div>
        </template>

        <SaleForm />

        <!-- <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="ghost" label="Отмена" @click="updateIsOpen(false)" />
          </div>
        </template> -->
      </UCard>
    </USlideover>
  </div>
</template>
