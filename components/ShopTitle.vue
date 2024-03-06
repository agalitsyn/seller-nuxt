<script setup lang="ts">
import { ShopType } from '~/types'

const user = useUser()

const title = computed(() => {
  if (user.value) {
    if (user.value.shop.type === ShopType.Branch) {
      return `Точка продаж "${user.value.shop.title}" `
    } else {
      return user.value.shop.title
    }
  }
  return ''
})
</script>

<template>
  <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight mb-10">
    {{ title }}
  </h2>
</template>
