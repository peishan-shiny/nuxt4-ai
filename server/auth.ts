import { useApi } from '@@/app/composables/useApi'
import type { LoginRequest, LoginResponse, LoginResponseData } from '@@/shared/types/auth'

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const data = await useApi.post<LoginResponseData>('admin/auth/login', payload)

  return {
    success: true,
    data,
  }
}
