import type { FetchContext } from 'ofetch';
export class ApiError<T = unknown> extends Error {
  public status: number;
  public payload: ApiResponse<T> | null;

  constructor(message: string, status: number, payload: ApiResponse<T> | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

const getErrorMessage = (payload: ApiResponse<unknown> | null | undefined): string | null => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  if (typeof payload.error === 'string' && payload.error) {
    return payload.error;
  }

  if (typeof payload.errors === 'string' && payload.errors) {
    return payload.errors;
  }

  if (Array.isArray(payload.errors)) {
    return payload.errors.join(', ');
  }

  if (payload.errors && typeof payload.errors === 'object') {
    const messages = Object.values(payload.errors)
      .filter((value): value is string => typeof value === 'string')
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(', ');
    }
  }

  return null;
};

const createApiFetcher = () => {
  const runtimeConfig = useRuntimeConfig();
  const baseUrl = runtimeConfig.public.apiBaseUrl;

  return $fetch.create({
    baseURL: baseUrl,
    async onRequest({ options }: FetchContext) {
      // 設定請求 headers
      const { authInfoCookie } = useAuth();
      const _accessToken = authInfoCookie.value?.accessToken;
      const _tokenType = authInfoCookie.value?.tokenType;
      if (!_accessToken || !_tokenType) return;
      options.headers = new Headers(options.headers);
      options.headers.set('Authorization', `${_tokenType} ${_accessToken}`);
      options.headers.set('Accept', 'application/json');
    },
    async onResponse({ response }: FetchContext) {
      if (!response) {
        return;
      }

      const { status, _data } = response;
      const apiResDataContent = _data.data;

      if (status === 200 || status === 201) {
        if (apiResDataContent?.accessToken) {
          useAuth().changAccessTokenCookie(apiResDataContent);
        }
      }

      if (_data.success === false) {
        throw new ApiError(
          getErrorMessage(apiResDataContent) ?? 'Request failed',
          response.status,
          apiResDataContent,
        );
      }
    },
    async onResponseError({
      response,
      error,
    }: {
      response?: { _data?: unknown; status?: number };
      error?: unknown;
    }) {
      if (error instanceof ApiError) {
        throw error;
      }

      const payload = response?._data as ApiResponse<unknown> | null;
      const message = getErrorMessage(payload) ?? 'Request failed';
      throw new ApiError(message, response?.status ?? 500, payload);
    },
  });
};

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const apiFetcher = createApiFetcher();

  return await apiFetcher<T>(path, {
    ...options,
    method:
      options.method?.toUpperCase() === 'GET' ||
      options.method?.toUpperCase() === 'POST' ||
      options.method?.toUpperCase() === 'PUT' ||
      options.method?.toUpperCase() === 'DELETE' ||
      options.method?.toUpperCase() === 'PATCH' ||
      options.method?.toUpperCase() === 'HEAD'
        ? (options.method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD')
        : 'GET',
    params: options.params,
    body: options.body as BodyInit | Record<string, unknown> | null | undefined,
  });
};

export const useApi = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) =>
    request<T>(path, { ...options, method: 'DELETE' }),
};
