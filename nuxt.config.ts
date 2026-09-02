// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://pxapi.fortune-inc.com/api/'
    }
  },
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: [
      'app/composables/**', 
      'app/utils/**'
    ],
  },
  // app: {
  //   head: {
  //     title: 'Nuxt 4 + Bootstrap 5',
  //     meta: [
  //       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //       { name: 'description', content: 'A Nuxt 4 project with Bootstrap 5 configured.' }
  //     ]
  //   }
  // }
})
