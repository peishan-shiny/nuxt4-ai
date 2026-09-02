<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-body p-5 text-center">
              <h1 class="display-5 fw-bold mb-3">Nuxt 4 + Bootstrap 5</h1>
              <p class="lead text-muted mb-4">Bootstrap 已成功安裝並套用到 Nuxt 專案中。</p>
              <div class="d-flex flex-wrap justify-content-center gap-2">
                <a href="https://nuxt.com" class="btn btn-primary" target="_blank" rel="noreferrer">
                  Nuxt 官方文件
                </a>
                <a
                  href="https://getbootstrap.com"
                  class="btn btn-outline-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bootstrap 文件
                </a>
              </div>
              <NuxtPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
