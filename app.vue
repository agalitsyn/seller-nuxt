<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

useHead({
  title: runtimeConfig.appTitle
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
