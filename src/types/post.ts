import type { PaginationResponse } from "./api";
import type { User } from "./user";

export interface OriginalPost {
  id: number;
  user_id: number;
  content: string;
  parent_id: number | null;
  original_post_id: number | null;
  is_quote: boolean;
  reply_permission: "everyone" | "followers" | "mentions";
  requires_reply_approval: boolean;
  status: string;
  is_ghost: boolean;
  ghost_expires_at: string | null;
  topic_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User;
}

export interface PostItem {
  id: number;
  user_id: number;
  content: string;
  parent_id: number | null;
  original_post_id: number | null;
  is_quote: boolean;
  reply_permission: "everyone" | "followers" | "mentions";
  requires_reply_approval: boolean;
  status: string;
  is_ghost: boolean;
  ghost_expires_at: string | null;
  topic_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  likes_count: number;
  replies_count: number;
  reposts_and_quotes_count: number;
  media_urls: string[];
  user: User;
  original_post: OriginalPost | null;
}


export interface PostResponse {
  success: boolean;
  data: PostItem[];
  pagination: PaginationResponse;
}
