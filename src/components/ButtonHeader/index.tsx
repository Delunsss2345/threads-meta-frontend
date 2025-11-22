const ButtonHeader = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center
        size-6
        rounded-full
        bg-primary-foreground
        shadow-sm
        border
        hover:bg-neutral-100
        active:scale-95
        transition
        cursor-pointer
      "
    >
      {children}
    </button>
  );
};

export default ButtonHeader;
