import type { ReactNode } from "react";

const MenuItem = ({
  icon,
  children,
  className = "",
}: {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 text-sm hover:bg-accent rounded-lg cursor-pointer transition-colors ${className}`}
    >
      <span>{children}</span>
      <span className="text-muted-foreground">{icon}</span>
    </div>
  );
};

export default MenuItem;
