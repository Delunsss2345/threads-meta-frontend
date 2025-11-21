import { http } from "@/utils/http";

export const postInteractionApi = {
  like: async (id: number) => http.post(`/posts/${id}/like`),
};
