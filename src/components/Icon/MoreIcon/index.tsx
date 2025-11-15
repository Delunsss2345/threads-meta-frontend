import React from "react";

interface MoreIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

const MoreIcon: React.FC<MoreIconProps> = ({
  title = "Xem thêm",
  ...props
}) => {
  return (
    <svg
      aria-label={title}
      role="img"
      viewBox="0 0 12 12"
      style={{ width: 12, height: 12, fill: "currentColor" }}
      {...props}
    >
      <title>{title}</title>
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 7.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm4 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm4 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
      />
    </svg>
  );
};

export default MoreIcon;
