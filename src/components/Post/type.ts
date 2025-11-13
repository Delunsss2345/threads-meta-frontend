interface InteractionBarProps {
  mode: "auto" | "share";
}

interface User {
  avatar?: string;
  username: string;
}

interface Post extends User {
  time: string;
  content: string;
  verified?: boolean;
  like?: number;
  message?: number;
  repost?: number;
  share?: number;
  images?: string[];
  file?: {
    url: string;
    name: string;
    type: "audio" | "other";
    mime?: string;
    sources?: string[];
  };
}

export type { InteractionBarProps, Post, User };
