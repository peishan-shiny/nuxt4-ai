import type { FetchContext } from 'ofetch'
import type { ApiResponse, RequestOptions } from '../../shared/types/server'

export class ApiError<T = unknown> extends Error {
  public status: number
  public payload: ApiResponse<T> | null

  constructor(message: string, status: number, payload: ApiResponse<T> | null = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

const getErrorMessage = (payload: ApiResponse<unknown> | null | undefined): string | null => {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  if (typeof payload.error === 'string' && payload.error) {
    return payload.error
  }

  if (typeof payload.errors === 'string' && payload.errors) {
    return payload.errors
  }

  if (Array.isArray(payload.errors)) {
    return payload.errors.join(', ')
  }

  if (payload.errors && typeof payload.errors === 'object') {
    const messages = Object.values(payload.errors)
      .filter((value): value is string => typeof value === 'string')
      .filter(Boolean)

    if (messages.length > 0) {
      return messages.join(', ')
    }
  }

  return null
}

const serializeRequestBody = (body: unknown): BodyInit | null | undefined => {
  if (body === undefined) {
    return undefined
  }

  if (typeof body === 'string' || body instanceof FormData) {
    return body
  }

  return JSON.stringify(body)
}

const createApiFetcher = () => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = (runtimeConfig.public?.apiBaseUrl as string | undefined) ?? ''

  return $fetch.create({
    baseURL: baseUrl,
    async onRequest({ options }: FetchContext) {
      const headers = new Headers(options.headers ?? {})

      if (options.body && !headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
      }

      options.headers = headers
      options.body = serializeRequestBody(options.body)
    },
    async onResponse({ response }: FetchContext) {
      if (!response) {
        return
      }

      const payload = response._data

      if (payload && typeof payload === 'object' && 'success' in payload) {
        const apiPayload = payload as ApiResponse<unknown>

        if (apiPayload.success === false) {
          throw new ApiError(getErrorMessage(apiPayload) ?? 'Request failed', response.status, apiPayload)
        }

        response._data = (apiPayload.data ?? payload) as unknown
      }
    },
    async onResponseError({ response, error }: { response?: { _data?: unknown; status?: number }; error?: unknown }) {
      if (error instanceof ApiError) {
        throw error
      }

      const payload = response?._data as ApiResponse<unknown> | null
      const message = getErrorMessage(payload) ?? 'Request failed'
      throw new ApiError(message, response?.status ?? 500, payload)
    },
  })
}

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const apiFetcher = createApiFetcher()

  return await apiFetcher<T>(path, {
    ...options,
    method: (options.method?.toUpperCase() === 'GET' || options.method?.toUpperCase() === 'POST' || options.method?.toUpperCase() === 'PUT' || options.method?.toUpperCase() === 'DELETE' || options.method?.toUpperCase() === 'PATCH' || options.method?.toUpperCase() === 'HEAD')
      ? options.method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'
      : 'GET',
    params: options.params,
    body: options.body as BodyInit | Record<string, unknown> | null | undefined,
  })
}

export const useApi = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) => request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body' | 'method'>) => request<T>(path, { ...options, method: 'PUT', body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'body' | 'method'>) => request<T>(path, { ...options, method: 'DELETE' }),
}
