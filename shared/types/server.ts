export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  errors?: unknown
  error?: string | null
}

export type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  params?: Record<string, string | number | boolean | null | undefined>
  headers?: HeadersInit
}
