// src/components/activity/types.ts
export interface Activity {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timeAgo: string;
  type: "thread" | "follow"; // "Thread gợi ý" hoặc "Gợi ý theo dõi"
  likes?: number;
  comments?: number;
  reposts?: number;
  views?: number;
  isVerified?: boolean;
}