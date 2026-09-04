import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default defineNuxtPlugin((nuxtApp) => {
  // 將 bootstrap 實例注入到 Nuxt 上，方便在組件中透過 $bootstrap 呼叫相關方法
  return {
    provide: {
      bootstrap: bootstrap,
    },
  };
});
