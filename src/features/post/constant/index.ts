export type PostModeKey =
  | "default"
  | "repost"
  | "static"
  | "detail"
  | "comment";

type InteractionMode = "auto" | "share" | "comment";

type PostModeStyle = {
  wrapper: string;
  cursor: string;
  grid: string;
  avatarSize: number;
  usernameText: string;
  contentText: string;
  timeText: string;
  imageOffset: string;
  contentOffset: string;
  mediaWidth: number;
  mediaHeight: number;
  interactionMode: InteractionMode;
  interactionSize: number;
};

export const POST_MODE_STYLES: Record<PostModeKey, PostModeStyle> = {
  default: {
    wrapper: "border-t border-b border-border px-6 py-3",
    cursor: "pointer",
    grid: "grid-cols-[48px_minmax(0,1fr)] gap-3",
    avatarSize: 10,
    usernameText: "text-sm",
    contentText: "text-sm",
    timeText: "text-xs",
    imageOffset: "ml-3 pl-12",
    contentOffset: "mt-3 pl-[58px]",
    mediaWidth: 210,
    mediaHeight: 280,
    interactionMode: "auto",
    interactionSize: 18,
  },
  repost: {
    wrapper: "",
    cursor: "pointer",
    grid: "grid-cols-[48px_minmax(0,1fr)] gap-3",
    avatarSize: 10,
    usernameText: "text-sm",
    contentText: "text-sm",
    timeText: "text-xs",
    imageOffset: "ml-3 pl-12",
    contentOffset: "mt-3 pl-[58px]",
    mediaWidth: 210,
    mediaHeight: 280,
    interactionMode: "auto",
    interactionSize: 18,
  },
  detail: {
    wrapper: "px-4",
    cursor: "pointer",
    grid: "grid-cols-[48px_minmax(0,1fr)] gap-3",
    avatarSize: 10,
    usernameText: "text-sm",
    contentText: "text-sm",
    timeText: "text-xs",
    imageOffset: "ml-3 pl-2",
    contentOffset: "mt-3 pl-2",
    mediaWidth: 210,
    mediaHeight: 280,
    interactionMode: "auto",
    interactionSize: 18,
  },
  comment: {
    wrapper: "border-t border-b border-border px-4 py-4",
    cursor: "pointer",
    grid: "grid-cols-[36px_minmax(0,1fr)] gap-2",
    avatarSize: 8,
    usernameText: "text-sm",
    contentText: "text-sm",
    timeText: "text-[10px]",
    imageOffset: "ml-1 pl-8",
    contentOffset: "mt-2 pl-5",
    mediaWidth: 150,
    mediaHeight: 200,
    interactionMode: "comment",
    interactionSize: 20,
  },
  static: {
    wrapper: "",
    cursor: "default",
    grid: "grid-cols-[48px_minmax(0,1fr)] gap-3",
    avatarSize: 10,
    usernameText: "text-sm",
    contentText: "text-sm",
    timeText: "text-xs",
    imageOffset: "",
    contentOffset: "",
    mediaWidth: 210,
    mediaHeight: 280,
    interactionMode: "share",
    interactionSize: 18,
  },
};
