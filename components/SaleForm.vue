<script setup lang="ts">
import { sub, format, previousMonday, previousSunday } from 'date-fns'

import type { FormError, FormSubmitEvent } from '#ui/types'

const dateFormat = 'dd-MM-yyyy'

const state = reactive({
  period: { start: sub(previousMonday(new Date()), { days: 7 }), end: previousSunday(new Date()) }
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.period) {
    errors.push({ path: 'period', message: 'Не может быть пустым' })
  }
  return errors
}

async function onSubmit(_: FormSubmitEvent<any>) {
  console.log({ periodStartedAt: state.period.start.toISOString(), periodStoppedAt: state.period.end.toISOString() })
  await navigateTo('/sales/100')
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Период" name="period">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton color="white" class="text-gray-400 font-normal" icon="i-heroicons-calendar-days-20-solid">
          {{ format(state.period.start, dateFormat) }} -
          {{ format(state.period.end, dateFormat) }}
        </UButton>

        <template #panel="{ close }">
          <DatePicker v-model="state.period" @close="close" />
        </template>
      </UPopover>
    </UFormGroup>

    <UDivider class="py-4" />

    <UButton type="submit">ОК</UButton>
  </UForm>
</template>
