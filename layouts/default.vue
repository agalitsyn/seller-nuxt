<script setup lang="ts"></script>

<template>
  <div>
    <Navigation />

    <UContainer class="py-6 min-h-[calc(100vh-100px)]" :ui="{ constrained: 'max-w-full' }">
      <slot />
    </UContainer>

    <UModals />
    <UNotifications />

    <!-- <Footer /> -->
  </div>
</template>
