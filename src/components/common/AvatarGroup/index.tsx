import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarGroupProps = {
  size: number;
  classNameFallback?: string;
  url: string;
  fallBack?: string;
  className?: string;
};
const AvatarGroup = ({
  size,
  url,
  fallBack = "AN",
  classNameFallback,
  className,
}: AvatarGroupProps) => {
  return (
    <>
      <Avatar className={`size-${size} shrink-1 ${className}`}>
        <AvatarImage className="object-cover" src={url} />
        <AvatarFallback className={classNameFallback}>
          {fallBack}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default AvatarGroup;
