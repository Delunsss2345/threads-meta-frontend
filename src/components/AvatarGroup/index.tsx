import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type AvatarGroupProps = {
  size: number;
  classNameFallback?: string;
  url: string;
  fallBack?: string;
};
const AvatarGroup = ({
  size,
  url,
  fallBack = "AN",
  classNameFallback,
}: AvatarGroupProps) => {
  return (
    <>
      <Avatar className={`size-${size}`}>
        <AvatarImage src={url} />
        <AvatarFallback className={classNameFallback}>
          {fallBack}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarGroup;
