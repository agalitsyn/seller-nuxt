<script setup lang="ts">
import { salesMock } from '~/mock'

const breadcrumbs = [
  {
    label: 'Главная',
    icon: 'i-heroicons-home',
    to: '/'
  }
]
</script>

<template>
  <div>
    <UBreadcrumb :links="breadcrumbs" class="mb-6" :ui="{ active: 'text-white-500 dark:text-white-400' }" />

    <ShopTitle />

    <SaleTable :data="salesMock" />
  </div>
</template>
