type MenuIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
};

const MenuIcon = ({
  size = 24,
  color = "currentColor",
  className,
}: MenuIconProps) => {
  return (
    <svg
      aria-label="Xem thêm"
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      className={className}
    >
      <title>Xem thêm</title>
      <rect
        className="w-[21px] h-[2.5px]"
        x="3"
        y="7"
        width="18"
        height="2.5"
        rx="1.25"
      />
      <rect
        className="w-[14px] h-[2.5px]"
        x="3"
        y="15"
        width="18"
        height="2.5"
        rx="1.25"
      />
    </svg>
  );
};

export default MenuIcon;
