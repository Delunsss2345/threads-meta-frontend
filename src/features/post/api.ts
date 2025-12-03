import { PER_PAGE } from "@/constant/pagination";
import type { MessageResponse } from "@/types/api";
import type {
  CreatePostResponse,
  PostResponse,
  ReplyResponse,
  SinglePostResponse,
} from "@/types/post";
import { http } from "@/utils/http";

export const postApi = {
  getFeeds: (page: number = 1) =>
    http.get<PostResponse>(
      `/posts/feed?type=for_you&page=${page}&per_page=${PER_PAGE}`
    ),
  postThread: (payload: FormData) =>
    http.post<CreatePostResponse>("/posts", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteThread: (id: number) => http.del<MessageResponse>(`/posts/${id}`),
  replyThread: (id: number, payload: FormData) =>
    http.post(`/posts/${id}/reply`, payload),

  getReplies: (id: number, page: number = 1) =>
    http.get<ReplyResponse>(
      `/posts/${id}/replies?page=${page}&per_page=${PER_PAGE}`
    ),

  getReposts: (id: number, page: number = 1) =>
    http.get<PostResponse>(
      `/users/${id}/reposts?page=${page}&per_page=${PER_PAGE}`
    ),

  getThread: (id: number) => http.get<SinglePostResponse>(`/posts/${id}`),
  like: (id: number) => http.post(`/posts/${id}/like`),
  repost: (id: number) => http.post(`/posts/${id}/repost`),
  quote: (id: number, content: string) =>
    http.post(`/posts/${id}/quote`, { content }),
  save: (id: number) => http.post(`/posts/${id}/save`),
  hide: (id: number) => http.post(`/posts/${id}/hide`),
  report: (id: number, reason: string) =>
    http.post(`/posts/${id}/report`, { reason }),
};
