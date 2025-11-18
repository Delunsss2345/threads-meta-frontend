import type { LoginPayload } from "@/types/auth";
import { http } from "@/utils/http";

export const authApi = {
  login: (payload: LoginPayload) => http.post("/auth/login", payload),

  getCurrentUser: () => http.get("/auth/me"),

  logout: () => http.post("/auth/logout"),
};
