import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://pxapi.fortune-inc.com/api/',
    },
  },
  css: ['~/assets/scss/main.scss'],
  imports: {
    dirs: ['app/composables/**', 'app/utils/**'],
  },
  alias: {
    '@scss': fileURLToPath(new URL('./app/assets/scss', import.meta.url)),
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Bootstrap 5 底層仍使用舊版 Sass 語法，暫時關閉相關棄用警告
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  },
});
