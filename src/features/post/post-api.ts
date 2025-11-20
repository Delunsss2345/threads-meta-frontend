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
};
