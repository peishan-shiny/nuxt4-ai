import { login as loginService } from '@@/server/auth'
import type { LoginRequest, LoginResponse } from '@@/shared/types/auth'

export const useAuth = () => {
  const login = async (payload: LoginRequest): Promise<LoginResponse> => {
    return await loginService(payload)
  }

  return {
    login,
  }
}
