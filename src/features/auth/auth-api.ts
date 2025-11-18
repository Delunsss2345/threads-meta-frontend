import type { MessageResponse } from "@/types/api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";
import type { UserResponse } from "@/types/user";
import { http } from "@/utils/http";

export const authApi = {
  login: (payload: LoginPayload) =>
    http.post<LoginResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    http.post<RegisterResponse>("/auth/register", payload),

  getCurrentUser: () => http.get<UserResponse>("/auth/user"),

  logout: () => http.post<MessageResponse>("/auth/logout"),
};
