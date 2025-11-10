interface PostProps {
  author: string;
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
  like?: number;
  message?: number;
  repost?: number;
  share?: number;
  user: User;
}

interface User {
  avatar?: string;
  username: string;
  content: string;
  file?: File;
  image?: string | string[];
}

export type { InteractionBarProps, PostProps, User };
