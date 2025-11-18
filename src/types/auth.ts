import type { BaseResponse } from "./api";
import type { ApiUser } from "./user";

export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterData {
  user: ApiUser;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export type RegisterResponse = BaseResponse<RegisterData>;

export interface LoginData {
  user: ApiUser;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export type LoginResponse = BaseResponse<LoginData>;
