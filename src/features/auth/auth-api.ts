import type { MessageResponse } from "@/types/api";
import type {
  ForgotPasswordType,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ValidateEmail,
  ValidateEmailResponse,
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
        "x-origin": import.meta.env.VITE_BASE_API,
      },
    }),

  validateEmail: (payload: ValidateEmail) =>
    http.post<ValidateEmailResponse>("/auth/validate/email", payload),
  getCurrentUser: () => http.get<UserResponse>("/auth/user"),

  logout: () => http.post<MessageResponse>("/auth/logout"),
};
