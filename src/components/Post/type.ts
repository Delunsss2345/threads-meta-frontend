interface PostProps {
  username: string;
  time: string;
  content: string;
  verified?: boolean;
  like?: number;
  message?: number;
  repost?: number;
  share?: number;
  avatar?: string;
  file?: string;
  image?: string | string[];
}

interface InteractionBarProps {
  mode: "auto" | "share";
}

interface User {
  avatar?: string;
  username: string;
}

interface Post extends User {
  like?: number;
  message?: number;
  repost?: number;
  verified: boolean;
  share?: number;
  time: String;
  content: string;
  file?: File | undefined;
  image?: string | string[];
}

export type { InteractionBarProps, Post, PostProps, User };
