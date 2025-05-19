"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Folder } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type AssetsCollectionCategory = "Youtuber" | "Musician" | "other";

interface AssetsCollectionProps {
  collection: {
    id: string;
    name: string;
    description: string;
    category: AssetsCollectionCategory;
    collectionImageUrl?: string | null;
    underdogProjectId: number;
    userId?: string;
    user?: {
      name?: string;
      image?: string;
    };
  };
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function AssetsCollectionCard({
  collection,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}: AssetsCollectionProps) {
  // Get the first letter of the user's name for the avatar fallback
  const userInitial = collection.user?.name
    ? collection.user.name.charAt(0).toUpperCase()
    : "U";

  // Get appropriate icon color based on category
  const getCategoryColor = (category: AssetsCollectionCategory) => {
    switch (category) {
      case "Musician":
        return "bg-blue-300 text-blue-800 hover:bg-blue-200";
      case "Youtuber":
        return "bg-purple-200 text-purple-800 hover:bg-purple-200";
      case "other":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="overflow-hidden p-0 transition-all hover:shadow-md">
      <div className=" bg-muted relative overflow-hidden">
        {collection.collectionImageUrl ? (
          <div className="h-[15rem] w-full rounded-t-md overflow-hidden">
            <Image
              src={collection.collectionImageUrl}
              width={1000}
              height={1000}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400">
            <Folder className="h-16 w-16 text-slate-400" />
          </div>
        )}
      </div>

      <CardHeader className="px-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`mb-2 ${getCategoryColor(collection.category)}`}>
              {collection.category}
            </Badge>
            <CardTitle className="text-lg line-clamp-1">
              {collection.name}
            </CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="backdrop-blur-sm bg-background/90"
              align="end"
            >
              <DropdownMenuItem onClick={() => onView(collection.id)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(collection.id)}>
                Edit collection
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(collection.id)}
                className="text-red-600 focus:text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2 mt-1">
          {collection.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="pt-0 pb-2 px-2 w-full flex justify-between items-center">
        <Button
          variant="default"
          size="sm"
          className="w-full"
          onClick={() =>
            onView(collection.id + `?projectId=${collection.underdogProjectId}`)
          }
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
