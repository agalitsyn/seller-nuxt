<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

import type { SaleItemDTO, OrderDTO } from '~/types'

import { ordersMock } from '~/mock'

const toast = useToast()

// TODO: here we can use multiple v-models
// see https://www.thisdot.co/blog/making-sense-of-multiple-v-model-bindings-in-vue-3
const props = defineProps({
  item: {
    type: Object as PropType<SaleItemDTO>,
    required: true
  },
  orders: {
    type: Object as PropType<OrderDTO[]>,
    required: true
  }
})

type State = {
  barcode: string
  quantity: number
  orderId?: string
  wholesalePrice?: number
  price?: number
  priceTotal?: number
  wholesalePriceTotal?: number
}

const state: State = reactive({
  barcode: props.item.barcode,
  quantity: props.item.quantity
})

const emit = defineEmits(['update:item'])

const item = ref(props.item)

watchEffect(() => {
  item.value = props.item
})

const updateItem = (value: State) => {
  item.value = {
    ...item.value,
    ...value
  } as SaleItemDTO
  emit('update:item', value)
}

const validate = (state: State): FormError[] => {
  const errors = []

  if (generalFormError.value) {
    errors.push({ path: 'generalError', message: generalFormError.value })
  }

  if (!state.barcode) {
    errors.push({ path: 'barcode', message: 'Не может быть пустым' })
  }
  if (!state.quantity) {
    errors.push({ path: 'quantity', message: 'Не может быть пустым' })
  }
  if (state.quantity <= 0) {
    errors.push({ path: 'quantity', message: 'Должно быть больше нуля' })
  }
  if (!state.orderId) {
    errors.push({ path: 'orderId', message: 'Не может быть пустым' })
  }
  // if (!state.wholesalePrice) {
  //   errors.push({ path: 'wholesalePrice', message: 'Не может быть пустым' })
  // }
  // if (!state.price) {
  //   errors.push({ path: 'price', message: 'Не может быть пустым' })
  // }
  // if (!state.priceTotal) {
  //   errors.push({ path: 'priceTotal', message: 'Не может быть пустым' })
  // }
  // if (!state.wholesalePriceTotal) {
  //   errors.push({ path: 'wholesalePriceTotal', message: 'Не может быть пустым' })
  // }
  return errors
}

function onSubmit(_: FormSubmitEvent<any>) {
  updateItem(state)
}

const fetchOrderItem = async (orderId: number) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const resp = ordersMock.find((order) => order.id === orderId)
    if (resp) {
      const selectedItem = resp.items.find((item) => item.barcode === state.barcode)
      if (selectedItem) {
        state.wholesalePrice = selectedItem.wholesalePrice
        state.price = selectedItem.price
        state.wholesalePriceTotal = state.wholesalePrice * state.quantity
        state.priceTotal = state.price * state.quantity
      } else {
        generalFormError.value = `Товар с штрих-кодом ${state.barcode} не найден в заказе №${orderId}`
        state.wholesalePrice = undefined
        state.price = undefined
        state.wholesalePriceTotal = undefined
        state.priceTotal = undefined
      }
    }
  } catch (error) {
    console.error(error)
    toast.add({ title: `Ошибка загрузки заказа №${orderId}`, timeout: 3000, color: 'red' })
  }
}

const flushForm = () => {
  generalFormError.value = ''

  if (!state.barcode) {
    state.wholesalePrice = undefined
    state.price = undefined
    state.wholesalePriceTotal = undefined
    state.priceTotal = undefined
  }
}

const onOrderSelect = async () => {
  flushForm()

  if (!state.barcode) {
    return
  }

  const orderId = parseInt(state.orderId as string)
  await fetchOrderItem(orderId)
}

const onBarcodeChange = async () => {
  flushForm()

  if (!state.orderId) {
    return
  }

  const orderId = parseInt(state.orderId as string)
  await fetchOrderItem(orderId)
}

const onQuantityChange = () => {
  if (!state.wholesalePrice && !state.price) {
    return
  }

  state.wholesalePriceTotal = state.wholesalePrice! * state.quantity
  state.priceTotal = state.price! * state.quantity
}

const generalFormError = ref('')
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <!-- <UFormGroup name="generalError"> -->
    <UAlert v-if="generalFormError" color="red" variant="soft" title="Ошибка" :description="generalFormError" />
    <!-- </UFormGroup> -->
    <UFormGroup label="Штрих-код" name="barcode">
      <UInput v-model="state.barcode" @input="onBarcodeChange" />
    </UFormGroup>

    <UFormGroup label="Количество" name="quantity">
      <UInput v-model="state.quantity" type="number" @input="onQuantityChange" />
    </UFormGroup>

    <UFormGroup label="Партия заказа товара" name="orderId">
      <USelect
        v-model="state.orderId"
        type="number"
        :options="props.orders"
        option-attribute="number"
        @input="onOrderSelect"
      />
    </UFormGroup>

    <UDivider class="py-4" />

    <div class="flex items-center justify-between gap-1.5">
      <UFormGroup label="Оптовая цена" name="wholesalePrice">
        <UInput v-model="state.wholesalePrice" type="number" disabled />
      </UFormGroup>

      <UFormGroup label="Розничная цена" name="price">
        <UInput v-model="state.price" type="number" disabled />
      </UFormGroup>
    </div>

    <div class="flex items-center justify-between gap-1.5">
      <UFormGroup label="Всего" name="wholesalePriceTotal">
        <UInput v-model="state.wholesalePriceTotal" type="number" disabled />
      </UFormGroup>

      <UFormGroup label="Всего" name="priceTotal">
        <UInput v-model="state.priceTotal" type="number" disabled />
      </UFormGroup>
    </div>

    <UDivider class="py-4" />

    <UButton type="submit" :disabled="generalFormError !== ''" :variant="generalFormError !== '' ? 'solid' : 'soft'">
      ОК
    </UButton>
  </UForm>
</template>
