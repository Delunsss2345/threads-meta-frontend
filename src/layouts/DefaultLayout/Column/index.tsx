import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";
import Header from "../Header";

const Column = ({
  id,
  pathName,
  children,
  textHeader,
}: {
  id?: number;
  pathName?: string;
  children: ReactNode;
  textHeader?: string;
}) => {
  if (!id) {
    return (
      <div className="column">
        <Header textHeader={pathName} />
        <div
          className={`column-container relative z-2 flex-1 md:pt-6 border-b border-l border-r shadow  bg-primary-foreground ${
            pathName?.startsWith("/settings/") ? "settings-page px-4 !pt-0" : ""
          }`}
        >
          <div className="h-full min-h-screen mx-auto">{children}</div>
        </div>
      </div>
    );
  }
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      className="column"
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition:
          transition || "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)",
        zIndex: isDragging ? 9999 : 1,
      }}
      {...attributes}
    >
      <Header dragHandleProps={listeners} textHeader={pathName} />
      <div className="column-container relative z-2 flex-1 pt-6 border-b border-l border-r shadow  bg-primary-foreground">
        {children}
      </div>
    </div>
  );
};

export default Column;
