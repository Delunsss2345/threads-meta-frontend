import type { mapPost } from "@/features/post/map";

interface InteractionBarProps {
  mode: "auto" | "share" | "comment" | "detail";
}

interface User {
  avatar?: string;
  username: string;
}
export type MappedPost = ReturnType<typeof mapPost>;
export type MappedUser = MappedPost["user"];

export type { InteractionBarProps, User };
