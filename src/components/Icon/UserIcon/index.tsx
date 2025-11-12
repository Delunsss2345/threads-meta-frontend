type UserIconProps = {
  size?: number | string;
  color?: string;
  className?: string;
};

const UserIcon = ({
  size = 24,
  color = "currentColor",
  className,
}: UserIconProps) => {
  return (
    <svg
      aria-label="Trang cá nhân"
      role="img"
      viewBox="0 0 26 26"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      className={className}
    >
      <title>Trang cá nhân</title>
      <circle cx="13" cy="7.25" r="4" strokeWidth="2.5" />
      <path
        d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
        strokeWidth="2.5"
      />
    </svg>
  );
};

export default UserIcon;
