import type { LoginRequest, LoginResponse } from '@/types/auth';

export const useApiAuth = () => {
  const login = async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await useApi.post<LoginResponse>('/auth/login', payload);

    return response;
  };

  return {
    login,
  };
};
