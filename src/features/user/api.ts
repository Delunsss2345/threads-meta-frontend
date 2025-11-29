import { http } from "@/utils/http";

export const userApi = {
  updateUser: (payload: FormData) => http.post("/auth/profile", payload),
  followUser: (id: number) => http.post(`/users/${id}/follow`),
  unFollowUser: (id: number) =>
    http.post(`/user/${id}/follow`, {
      _method: "DELETE",
    }),
};
