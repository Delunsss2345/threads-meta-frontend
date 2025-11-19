interface InteractionBarProps {
  mode: "auto" | "share";
}

interface User {
  avatar?: string;
  username: string;
}

export type { InteractionBarProps, User };
