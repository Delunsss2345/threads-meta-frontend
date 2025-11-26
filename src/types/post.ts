import type { BaseResponse, MessageResponse, PaginationResponse } from "./api";
import type { User } from "./user";

export const ReplyPermission = {
  EVERYONE: "everyone",
  FOLLOWERS: "followers",
  MENTIONS: "mentions",
} as const;

export type ReplyPermission =
  (typeof ReplyPermission)[keyof typeof ReplyPermission];

export const PostStatus = {
  APPROVED: "approved",
  PENDING: "pending",
  DELETED: "deleted",
} as const;

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];

export interface BasePost {
  id: number;
  user_id: number;
  content: string;
  parent_id: number | null;
  original_post_id: number | null;
  is_quote: boolean;
  reply_permission: ReplyPermission;
  requires_reply_approval: boolean;
  status: PostStatus | string;
  is_ghost: boolean;
  ghost_expires_at: string | null;
  topic_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OriginalPost extends BasePost {
  user: User;
  media_urls: string[];
  likes_count: number;
  replies_count: number;
}

export interface PostItem extends BasePost {
  media_urls: string[];
  user: User;
  likes_count: number;
  replies_count: number;
  reposts_and_quotes_count: number;
  is_liked_by_auth?: boolean;
  is_saved_by_auth?: boolean;
  is_reposted_by_auth?: boolean;
  original_post: OriginalPost | null;
}

export interface ReplyUser {
  id: number;
  name: string;
  username: string;
  bio: string | null;
  is_private: boolean;
  verified: boolean;
  created_at: string;
  updated_at: string;
  avatar_url: string | null;
}

export interface ReplyData extends BasePost {
  status: PostStatus;
  likes_count: number;
  replies_count: number;
  reposts_and_quotes_count: number;
  media_urls: string[];
  user: ReplyUser;
}

export interface PostResponse {
  success: boolean;
  data: PostItem[];
  pagination: PaginationResponse;
}

export type CreatePostResponse = BaseResponse<Omit<PostItem, "original_post">>;

export interface CreatePostBody {
  content: string;
  media: File[];
}

export interface CreatePostReplyBody {
  content: string;
  media: File[];
}

export interface LikeData {
  is_liked: boolean;
  likes_count: number;
}

export interface RepostData {
  is_reposted: boolean;
  reposts_and_quotes_count: number;
}

export interface SaveData {
  is_saved: boolean;
}
export type SinglePostResponse = BaseResponse<PostItem>;
export type LikePostResponse = BaseResponse<LikeData>;
export type RepostPostResponse = BaseResponse<RepostData>;
export type SavePostResponse = BaseResponse<SaveData>;
export type ReplyResponse = BaseResponse<ReplyData[]>;
export type PostHidden = MessageResponse;
