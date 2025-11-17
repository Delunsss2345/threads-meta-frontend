import { http } from "@/utils/http";
import type { LoginPayload } from "./auth-type";

export const authApi = {
  login: (payload: LoginPayload) => http.post("/auth/login", payload),

  getCurrentUser: () => http.get("/auth/me"),

  logout: () => http.post("/auth/logout"),
};
