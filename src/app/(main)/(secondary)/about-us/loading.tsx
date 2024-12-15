import Skeleton from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-screen-xl mx-auto justify-start">

      {/* { Breadcrumb} */}
      <div className="space-y-4 py-4">
        <Skeleton className="w-1/3 h-6" />
      </div>


      <div className="space-y-4 py-2">
        <Skeleton className="w-2/3 h-12" />
        <Skeleton className="w-1/3 h-12" />
      </div>


    </div>
  );
}