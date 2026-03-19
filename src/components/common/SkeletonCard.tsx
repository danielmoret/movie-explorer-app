import { Skeleton } from "./Skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-card">
      <Skeleton className="aspect-2/3 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 10 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

interface SkeletonListProps {
  count?: number;
}

export function SkeletonList({ count = 10 }: SkeletonListProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex overflow-hidden rounded-xl bg-card">
          <Skeleton className="aspect-2/3 w-24 shrink-0 rounded-none sm:w-28" />
          <div className="flex flex-1 flex-col justify-center gap-2 p-3">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-3 w-24 self-end" />
          </div>
        </div>
      ))}
    </div>
  );
}
