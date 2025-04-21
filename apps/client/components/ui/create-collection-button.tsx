import React, { useEffect, useState } from "react";
import { SidebarMenuButton } from "./sidebar";
import { PlusCircleIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectContent,
  SelectGroup,
} from "./select";
import { useAuth } from "@/hooks/useAuth";
import { createAssetCollection } from "@/actions/createAssetCollection";
import { toast } from "sonner";

export enum AssetsCollectionCategory {
  Youtuber = "Youtuber",
  Musician = "Musician",
  other = "other"
}

export interface TCollectionData {
  name: string;
  description: string;
  category: AssetsCollectionCategory;
  coverImage?: File | null;
  coverImageUrl?: string;
}

const CreateCollectionButton = () => {
  const [collectionData, setCollectionData] = useState<TCollectionData>({
    category: AssetsCollectionCategory.other,
    description: "",
    name: "",
    coverImage: null,
    coverImageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const user = useAuth();

  // Generate preview URL when image is selected
  useEffect(() => {
    if (collectionData.coverImage) {
      const objectUrl = URL.createObjectURL(collectionData.coverImage);
      setPreviewUrl(objectUrl);
      
      // Clean up the URL when component unmounts or when image changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [collectionData.coverImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file ---", e.target.files)
    const file = e.target.files?.[0] || null;
    setCollectionData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleSubmit = async () => {
    if (!user.isLoggedIn) {
      toast.error("You need to be logged in to create a collection");
      return;
    }

    if (!collectionData.name.trim()) {
      toast.error("Collection name is required");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    if (collectionData.coverImage) {
      formData.append('coverImage', collectionData.coverImage);
    }
    try {
      const result = await createAssetCollection(collectionData, formData, user.user?.id!);

      if (!result.success) {
        toast.error(result.message || "Failed to create collection");
      } else {
        toast.success("Collection created successfully");
        setCollectionData({
          category: AssetsCollectionCategory.other,
          description: "",
          name: "",
          coverImage: null,
          coverImageUrl: "",
        });
        setPreviewUrl(null);
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip="Quick Create"
          className="min-w-5 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <PlusCircleIcon />
          <span>Create Collection</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#222]">
        <DialogHeader>
          <DialogTitle>Create Assets Collection</DialogTitle>
          <DialogDescription>Create a new asset collection.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input 
              id="name" 
              className="col-span-3" 
              value={collectionData.name}
              onChange={(e) => setCollectionData((prev) => ({...prev, name: e.target.value}))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input 
              id="description" 
              className="col-span-3" 
              value={collectionData.description}
              onChange={(e) => setCollectionData((prev) => ({...prev, description: e.target.value}))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select 
              value={collectionData.category}
              onValueChange={(value: AssetsCollectionCategory) => setCollectionData((prev) => ({...prev, category: value}))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value={AssetsCollectionCategory.Youtuber}>Youtuber</SelectItem>
                  <SelectItem value={AssetsCollectionCategory.Musician}>Musician</SelectItem>
                  <SelectItem value={AssetsCollectionCategory.other}>Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coverImage" className="text-right">
              Cover Image
            </Label>
            <div className="col-span-3">
              <div className="flex items-center gap-4">
                <Input 
                  id="coverImage" 
                  type="file"
                  accept="image/*"
                  className="flex-1" 
                  onChange={handleImageChange}
                />
                {previewUrl && (
                  <div className="relative w-12 h-12 rounded overflow-hidden">
                    <img 
                      src={previewUrl} 
                      alt="Cover preview" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                {!previewUrl && (
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">Upload a cover image for your collection (optional)</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Collection"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionButton;