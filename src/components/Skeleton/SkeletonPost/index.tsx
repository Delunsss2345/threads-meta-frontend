import { Skeleton } from "@/components/Skeleton";

const SkeletonPost = () => {
  return (
    <div className="flex gap-4 p-4 w-full bg-primary-foreground shadow-sm">
      <Skeleton variant="circular" className="w-12 h-12" />

      <div className="flex-1 space-y-2 py-1">
        <Skeleton variant="text" className="w-[30%]" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className={`w-[40%]`} />
      </div>
    </div>
  );
};

export default SkeletonPost;
