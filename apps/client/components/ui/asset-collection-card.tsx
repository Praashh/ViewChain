"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Folder } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

type AssetsCollectionCategory = "IMAGES" | "VIDEOS" | "AUDIO" | "OTHER"

interface AssetsCollectionProps {
  collection: {
    id: string
    name: string
    description: string
    category: AssetsCollectionCategory
    collectionImageUrl?: string | null
    userId?: string
    user?: {
      name?: string
      image?: string
    }
  }
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export default function AssetsCollectionCard({
  collection,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: AssetsCollectionProps) {
  // Get the first letter of the user's name for the avatar fallback
  const userInitial = collection.user?.name ? collection.user.name.charAt(0).toUpperCase() : "U"

  // Get appropriate icon color based on category
  const getCategoryColor = (category: AssetsCollectionCategory) => {
    switch (category) {
      case "IMAGES":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "VIDEOS":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "AUDIO":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {collection.collectionImageUrl ? (
          <Image 
            src={collection.collectionImageUrl} 
            width={100}
            height={100}
            alt={collection.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400">
            <Folder className="h-16 w-16 text-slate-400" />
          </div>
        )}
      </div>

      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`mb-2 ${getCategoryColor(collection.category)}`}>{collection.category}</Badge>
            <CardTitle className="text-lg line-clamp-1">{collection.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(collection.id)}>View details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(collection.id)}>Edit collection</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(collection.id)} className="text-red-600 focus:text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2 mt-1">{collection.description}</CardDescription>
      </CardHeader>

      <CardFooter className="p-4 pt-0 w-full flex justify-between items-center">
        <Button variant="outline" size="sm" className="w-full" onClick={() => onView(collection.id)}>
          View
        </Button>
      </CardFooter>
    </Card>
  )
}