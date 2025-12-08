import { type ReactNode } from "react";

const EmbedLayout = ({ children }: { children: ReactNode }) => {
  return <div className="relative p-4 border rounded-xl">{children}</div>;
};

export default EmbedLayout;
