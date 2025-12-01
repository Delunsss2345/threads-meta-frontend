interface ImageAttachProps {
  className?: string;
  onClick?: () => void;
}

const ImageAttach = ({ className, onClick }: ImageAttachProps) => {
  return (
    <svg
      aria-label="Đính kèm văn bản"
      role="img"
      viewBox="0 0 24 24"
      className={
        className ||
        "x1lliihq x2lah0s x1n2onr6 x19zyb68 x16ye13r x5lhr3w x1gaogpn"
      }
      style={{ fill: "currentColor", height: "20px", width: "20px" }}
      onClick={onClick}
    >
      <title>Đính kèm văn bản</title>
      <rect
        fill="none"
        height="20.5"
        rx="4.25"
        stroke="currentColor"
        stroke-width="1.5"
        width="16.5"
        x="3.75"
        y="1.75"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        rx="0.75"
        width="10"
        x="7"
        y="7"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        rx="0.75"
        width="10"
        x="7"
        y="10"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        rx="0.75"
        width="10"
        x="7"
        y="13"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        rx="0.75"
        width="6"
        x="7"
        y="16"
      ></rect>
    </svg>
  );
};

export default ImageAttach;
