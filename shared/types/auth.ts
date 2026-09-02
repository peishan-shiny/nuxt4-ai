export interface LoginRequest {
  account: string;
  pass: string;
}

export interface LoginResponseData {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
