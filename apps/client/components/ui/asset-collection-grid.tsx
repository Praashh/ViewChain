import AssetsCollectionCard from "./asset-collection-card"

type AssetsCollectionCategory = "IMAGES" | "VIDEOS" | "AUDIO" | "OTHER"

interface Collection {
  id: string;
  name: string;
  description: string;
  category: any;
  userId: string;
  underdogProjectId: number
  collectionImageUrl?:string | null
}[] 

interface AssetsCollectionGridProps {
  collections: Collection[]
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function AssetsCollectionGrid({ collections, onView, onEdit, onDelete }: AssetsCollectionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {collections?.map((collection) => (
        <AssetsCollectionCard
          key={collection.id}
          collection={collection}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
