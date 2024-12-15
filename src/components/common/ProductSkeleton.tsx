import Skeleton from "./Skeleton";

const ProductSkeleton = () => {
  return (
    <div className="py-4 pt-6 col-span-1 md:col-span-3 lg:col-span-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between">
      <div className="h-[400px] w-full">
        <Skeleton className="h-[340px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="h-[400px] w-full">
        <Skeleton className="h-[340px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="h-[400px] w-full">
        <Skeleton className="h-[340px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="h-[400px] w-full">
        <Skeleton className="h-[340px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
