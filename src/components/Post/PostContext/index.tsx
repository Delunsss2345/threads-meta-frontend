import { createContext } from "react";

export interface PostProps {
  id: number;

  avatar: string | null;
  username: string;
  name: string;

  verified: boolean;

  time: string;

  content: string;
  images: string[];

  like: number;
  message: number;
  repost: number;
  share: number;

  original_post?: {
    username: string;
    content: string;
    avatar: string | null;
  } | null;
  is_liked_by_auth?: boolean;
  is_saved_by_auth?: boolean;
  is_reposted_by_auth?: boolean;
}

export const PostContext = createContext<{
  post: PostProps;
} | null>(null);

const PostProvider = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: PostProps;
}) => {
  return (
    <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
