import React, { useEffect, useState } from "react";
import { SidebarMenuButton } from "./sidebar";
import { PlusCircleIcon } from "lucide-react";
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
  name: string,
  description: string,
  category: AssetsCollectionCategory
}

const CreateCollectionButton = () => {
  const [collectionData, setCollectionData] = useState<TCollectionData>({
    category: AssetsCollectionCategory.other,
    description: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();

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
    
    try {
      const result = await createAssetCollection(collectionData, user.user?.id!);

      if (!result.success) {
        toast.error(result.message || "Failed to create collection");
      } else {
        toast.success("Collection created successfully");
        setCollectionData({
          category: AssetsCollectionCategory.other,
          description: "",
          name: "",
        });
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
            <Label htmlFor="username" className="text-right">
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
                  <SelectItem value={AssetsCollectionCategory.other}>other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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