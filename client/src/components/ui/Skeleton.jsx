const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-border rounded-lg ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="card overflow-hidden">
    <Skeleton className="h-52 rounded-b-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-1">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-8 w-14 rounded-full" />)}
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  </div>
);

export default Skeleton;
