import type { MessageResponse } from "@/types/api";
import type { CreatePostResponse, PostResponse } from "@/types/post";
import { http } from "@/utils/http";

export const postApi = {
  getFeeds: () => http.get<PostResponse>("/posts/feed"),
  postThread: (payload: FormData) =>
    http.post<CreatePostResponse>("/posts", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteThread: (id: number) => http.del<MessageResponse>(`/posts/${id}`),
  replyThread: (id: number, payload: FormData) =>
    http.post(`/posts/${id}/reply`, payload),

  getThread: (id: number) => http.get<PostResponse>(`/posts/${id}`),
};
