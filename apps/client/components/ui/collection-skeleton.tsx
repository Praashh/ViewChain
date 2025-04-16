import { Skeleton } from "@/components/ui/skeleton"

export function AssetsCollectionCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm h-full flex flex-col bg-[#0f0f0f]">
      {/* Folder icon section */}
      <div className="aspect-video bg-gradient-to-b from-blue-500 to-gray-800 flex items-center justify-center">
        <Skeleton className="h-12 w-12 rounded-sm bg-[#1f1f1f]" />
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Tag placeholder */}
        <Skeleton className="h-6 w-20 rounded-full mb-2" />

        {/* Title placeholder */}
        <Skeleton className="h-5 w-1/2 mb-2" />

        {/* Description placeholder */}
        <div className="space-y-2 mb-4 flex-grow">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Button placeholder */}
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  )
}

export function AssetsCollectionGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <AssetsCollectionCardSkeleton key={i} />
      ))}
    </div>
  )
}
