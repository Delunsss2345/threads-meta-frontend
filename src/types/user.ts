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

export type UserResponse = Omit<BaseResponse<User>, "message">;
