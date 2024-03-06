<script setup lang="ts">
import { computed } from 'vue'

import { ShopType } from '~/types'

const colorMode = useColorMode()

const iconName = computed(() => (colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'))

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const user = useUser()

const items = computed(() => {
  if (user.value) {
    return [
      [
        {
          label: user.value.email
        }
      ],
      [
        {
          label: 'Выйти',
          icon: 'i-heroicons-arrow-left-start-on-rectangle-20-solid',
          click: () => {
            console.log('logout')
          }
        }
      ]
    ]
  }
  return []
})

const defaultTitle = 'Моя компания'

const title = computed(() => {
  if (user.value) {
    if (user.value.shop.type === ShopType.Branch) {
      return `${defaultTitle} - Кабинет продавца`
    } else if (user.value.shop.type === ShopType.Partner) {
      return `${defaultTitle} - Кабинет партнера`
    }
  }
  return defaultTitle
})
</script>

<template>
  <div
    class="flex justify-between items-center py-3.5 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-300"
  >
    <div class="flex gap-2">
      <NuxtLink to="/" class="px-2.5 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-100">
        {{ title }}
      </NuxtLink>
    </div>

    <div class="flex gap-1.5">
      <UDropdown v-if="user" :items="items" :popper="{ placement: 'bottom-start' }">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-user"
          class="hover:text-gray-700 dark:hover:text-gray-100"
        />
      </UDropdown>

      <UButton
        :icon="iconName"
        color="gray"
        class="hover:text-gray-700 dark:hover:text-gray-100"
        variant="ghost"
        @click="toggleColorMode"
      />
    </div>
  </div>
</template>
