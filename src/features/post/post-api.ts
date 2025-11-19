import type { PostResponse } from "@/types/post";
import { http } from "@/utils/http";

export const postApi = {
  getFeeds: () => http.get<PostResponse>("/posts/feed"),
};
