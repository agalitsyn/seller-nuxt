<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const state = reactive({
  email: undefined,
  password: undefined
})

const form = ref()

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email) {
    errors.push({ path: 'email', message: 'Не может быть пустым' })
  }
  if (!state.password) {
    errors.push({ path: 'password', message: 'Не может быть пустым' })
  }
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  form.value.clear()

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  } catch (error) {
    console.error(error)

    if (error.statusCode === 422) {
      form.value.setErrors(
        error.data.errors.map((err) => {
          // Map validation errors to { path: string, message: string }
        })
      )
    }
  }
}
</script>

<template>
  <UContainer class="py-6 min-h-[calc(100vh-100px)] flex justify-center items-center">
    <UForm ref="form" :validate="validate" :state="state" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Пароль" name="password" class="pt-4">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit" class="mt-4">Войти</UButton>
    </UForm>
  </UContainer>
</template>
