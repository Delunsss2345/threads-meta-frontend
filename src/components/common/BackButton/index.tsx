import ButtonHeader from "../ButtonHeader";
import BackIcon from "../Icon/BackIcon";

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonHeader  onClick={onClick}>
      <BackIcon />
    </ButtonHeader>
  );
};

export default BackButton;
