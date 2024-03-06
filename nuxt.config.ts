// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    // The private keys which are only available server-side
    appTitle: 'Моя компания - Кабинет продавца',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  }
})
