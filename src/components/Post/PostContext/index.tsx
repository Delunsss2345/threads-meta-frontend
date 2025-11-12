import { createContext } from "react";
import type { Post } from "../type";

export const PostContext = createContext<{
  post: Post;
} | null>(null);

const PostProvider = ({
  children,
  post,
}: {
  children: React.ReactNode;
  post: Post;
}) => {
  return (
    <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
