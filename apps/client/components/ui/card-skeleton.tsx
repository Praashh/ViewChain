import { cn } from "@/lib/utils";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
          className
        )}
      >
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border bg-card"
          >
            {/* Image skeleton */}
            <div className="h-[15rem] w-full bg-muted animate-pulse" />

            {/* Content skeleton */}
            <div className="px-2 py-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  {/* Badge skeleton */}
                  <div className="h-5 w-20 bg-muted rounded-full animate-pulse" />
                  {/* Title skeleton */}
                  <div className="h-6 w-3/4 bg-muted rounded-md animate-pulse" />
                  {/* Description skeleton */}
                  <div className="space-y-1">
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                {/* Menu button skeleton */}
                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
              </div>
            </div>

            {/* Button skeleton */}
            <div className="px-2 pb-2">
              <div className="h-9 w-full bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
