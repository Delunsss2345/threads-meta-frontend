import type { MessageResponse } from "@/types/api";
import type {
  ForgotPasswordType,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  RestPasswordBody,
  ValidateEmail,
  ValidateResponse,
  ValidateTokenBody,
  ValidateTokenResponse,
  ValidateUsername,
} from "@/types/auth";
import type { UserResponse } from "@/types/user";
import { http } from "@/utils/http";

export const authApi = {
  login: (payload: LoginPayload) =>
    http.post<LoginResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    http.post<RegisterResponse>("/auth/register", payload),

  forgotPassword: (payload: ForgotPasswordType) =>
    http.post("/auth/forgot-password", payload, {
      headers: {
        "x-origin": import.meta.env.VITE_BASE_URL,
      },
    }),

  resendVerifyEmail: (payload: ValidateTokenBody) =>
    http.post("/auth/resend-verify-email", undefined, {
      headers: {
        "x-origin": import.meta.env.VITE_BASE_URL,
        Authorization: `Bearer ${payload.token}`,
      },
    }),

  verifyEmail: (payload: ValidateTokenBody) =>
    http.post("/auth/verify-email", payload),

  validateEmail: (payload: ValidateEmail) =>
    http.post<ValidateResponse>("/auth/validate/email", payload),
  validateUsername: (payload: ValidateUsername) =>
    http.post<ValidateResponse>("/auth/validate/username", payload),
  validateRestToken: (payload: ValidateTokenBody) =>
    http.get<ValidateTokenResponse>(
      `/auth/reset-password/validate?token=${payload.token}`
    ),

  resetPassword: (payload: RestPasswordBody) =>
    http.post("/auth/reset-password", payload),
  getCurrentUser: () => http.get<UserResponse>("/auth/user"),

  logout: () => http.post<MessageResponse>("/auth/logout"),
};
