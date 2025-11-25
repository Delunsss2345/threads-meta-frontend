import type { BaseResponse } from "./api";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  verified: boolean;
  avatar_url: string | null;
  bio?: string | null;
  is_private?: boolean;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSuggestion extends User {
  is_following: boolean;
  is_followed_by: boolean;
  followers_count: number;
}

export interface UpdateUserBody {
  _method?: "PUT";
  name?: string;
  username?: string;
  bio?: string;
  avatar?: File | null;
  is_private?: boolean | number;
}
export type UserSuggestionResponse = BaseResponse<UserSuggestion[]>;
export type UserResponse = Omit<BaseResponse<User>, "message">;
