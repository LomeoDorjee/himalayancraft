import Skeleton from "./Skeleton";

const CategorySkeleton = () => {
  return (
    <div className="flex md:gap-4 lg:gap-8 gap-2">
      <div className="h-[350px] w-[350px]">
        <Skeleton className="h-[240px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="h-[350px] w-[350px]">
        <Skeleton className="h-[240px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="h-[350px] w-[350px]">
        <Skeleton className="h-[240px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="h-[350px] w-[350px]">
        <Skeleton className="h-[240px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="h-[350px] w-[350px]">
        <Skeleton className="h-[240px] w-full rounded-lg" />

        <div className="py-2 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
