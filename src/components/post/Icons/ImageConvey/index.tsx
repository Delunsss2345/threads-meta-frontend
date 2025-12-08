interface ImageConveyProps {
  className?: string;
  onClick?: () => void;
}

const ImageConvey = ({ className, onClick }: ImageConveyProps) => {
  return (
    <svg
      aria-label="Thêm cuộc thăm dò ý kiến"
      role="img"
      viewBox="0 0 24 24"
      className={
        className ||
        "x1lliihq x2lah0s x1n2onr6 x19zyb68 x16ye13r x5lhr3w x1gaogpn"
      }
      style={{ fill: "currentColor", height: "20px", width: "20px" }}
      onClick={onClick}
    >
      <title>Thêm cuộc thăm dò ý kiến</title>
      <rect
        fill="currentColor"
        height="1.5"
        rx="0.75"
        width="8"
        x="4"
        y="5.5"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        rx="0.75"
        width="16"
        x="4"
        y="11.25"
      ></rect>
      <rect
        fill="currentColor"
        height="1.5"
        rx="0.75"
        width="11"
        x="4"
        y="17"
      ></rect>
    </svg>
  );
};

export default ImageConvey;
