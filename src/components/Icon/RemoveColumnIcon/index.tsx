import React from "react";

interface RemoveColumnIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

const RemoveColumnIcon: React.FC<RemoveColumnIconProps> = ({
  title = "Gỡ cột",
  ...props
}) => {
  return (
    <svg
      aria-label={title}
      role="img"
      viewBox="0 0 20 20"
      style={{ width: 20, height: 20, fill: "currentColor" }}
      {...props}
    >
      <title>{title}</title>
      <circle
        cx="10"
        cy="10"
        r="8.25"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M13.5985 9.82813H6.39855"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RemoveColumnIcon;
