// TODO:要修改 API skill 檔名和檔案位置
export const useApiAuth = () => {
  const login = async (payload: LoginRequest): Promise<LoginResponse> => {
    // TODO:路徑先寫死
    const data = await useApi.post<LoginResponseData>('admin/auth/login', payload);

    // TODO:回應這樣寫也很怪
    return {
      success: true,
      data,
    };
  };

  return {
    login,
  };
};
