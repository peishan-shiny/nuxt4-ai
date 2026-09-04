<script setup lang="ts">
import type { LoginRequest } from '@/types/auth';
import { useApiAuth } from '@/composables/api/useApiAuth';
const { login } = useApiAuth();
const { logout } = useAuth();

const account = ref('');
const password = ref('');
const isLoggingIn = ref(false);
const isLoggingOut = ref(false);
const statusMessage = ref('');
const statusType = ref<'success' | 'error' | ''>('');

async function handleLogin() {
  if (!account.value.trim() || !password.value.trim()) {
    statusType.value = 'error';
    statusMessage.value = '請輸入帳號與密碼。';
    return;
  }

  isLoggingIn.value = true;
  statusType.value = '';
  statusMessage.value = '';

  try {
    const payload: LoginRequest = {
      account: account.value.trim(),
      pass: password.value,
    };

    const response = await login(payload);

    if (response?.success) {
      statusType.value = 'success';
      statusMessage.value = `登入成功，token 類型為 ${response.data?.tokenType ?? 'Bearer'}。`;
    } else {
      statusType.value = 'error';
      statusMessage.value = response?.error ?? '登入失敗。';
    }
  } catch (error) {
    statusType.value = 'error';
    statusMessage.value = error instanceof Error ? error.message : '登入失敗。';
  } finally {
    isLoggingIn.value = false;
  }
}

async function handleLogout() {
  isLoggingOut.value = true;
  statusType.value = '';
  statusMessage.value = '';

  try {
    await logout();
    statusType.value = 'success';
    statusMessage.value = '已登出。';
  } catch (error) {
    statusType.value = 'error';
    statusMessage.value = error instanceof Error ? error.message : '登出失敗。';
  } finally {
    isLoggingOut.value = false;
  }
}
</script>

<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="mb-3">Admin</h1>
        <p class="text-muted">請輸入帳號與密碼後測試登入 API。</p>

        <div class="card shadow-sm">
          <div class="card-body">
            <div class="mb-3">
              <label for="account" class="form-label">員工編號</label>
              <input id="account" v-model="account" class="form-control" placeholder="admin" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">密碼</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                placeholder="請輸入密碼"
              />
            </div>

            <button class="btn btn-primary w-100" :disabled="isLoggingIn" @click="handleLogin">
              {{ isLoggingIn ? '登入中...' : '登入' }}
            </button>

            <button
              class="btn btn-outline-secondary w-100 mt-2"
              :disabled="isLoggingOut"
              @click="handleLogout"
            >
              {{ isLoggingOut ? '登出中...' : '登出' }}
            </button>

            <p
              v-if="statusMessage"
              class="mt-3 mb-0"
              :class="statusType === 'error' ? 'text-danger' : 'text-success'"
            >
              {{ statusMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
