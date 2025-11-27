import { Spinner } from "@/components/ui/shadcn-io/spinner";

const LoadingFetch = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Spinner />
    </div>
  );
};

export default LoadingFetch;
