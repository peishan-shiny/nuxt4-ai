interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errors?: unknown;
  error?: string | null;
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  params?: Record<string, string | number | boolean | null | undefined>;
  headers?: HeadersInit;
};
