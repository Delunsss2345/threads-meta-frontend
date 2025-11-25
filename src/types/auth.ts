import type { BaseResponse } from "./api";
import type { User } from "./user";

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
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginData {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export type ForgotPasswordType = {
  email: string;
};
export type ValidateEmail = {
  email: string;
};

export type ValidateTokenBody = {
  token: string;
};

export type RestPasswordBody = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type RegisterResponse = BaseResponse<RegisterData>;
export type LoginResponse = BaseResponse<LoginData>;
export type ValidateEmailResponse = BaseResponse<{
  available: boolean;
}>;
export type ValidateTokenResponse = BaseResponse<{
  valid: boolean; //false -> sai token
}>;
