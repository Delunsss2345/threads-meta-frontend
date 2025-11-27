import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <Avatar className={`size-${size} shrink-1`}>
        <AvatarImage className="object-cover" src={url} />
        <AvatarFallback className={classNameFallback}>
          {fallBack}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarGroup;
