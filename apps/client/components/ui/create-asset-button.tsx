"use client";
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
import { toast } from "sonner";
import { usePathname, useSearchParams } from "next/navigation";
import { createNft } from "@/actions/NFT/createNft";

export enum AssetsCollectionCategory {
  Youtuber = "Youtuber",
  Musician = "Musician",
  other = "other",
}

export interface TNftData {
  name: string;
  description: string;
  category: AssetsCollectionCategory;
  coverImage?: File | null;
  coverImageUrl?: string;
  symbol: string;
  attributeName: string;
  extraAttributes: { key: string; value: string }[];
}

const CreateAssetButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = pathname.split("/").pop();
  const projectId: number = Number(searchParams.get("projectId"));
  const user = useAuth();

  const [nftData, setNftData] = useState<TNftData>({
    category: AssetsCollectionCategory.other,
    description: "",
    name: "",
    coverImage: null,
    coverImageUrl: "",
    symbol: "",
    attributeName: "",
    extraAttributes: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [assetFile, setAssetFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extraAttributeKey, setExtraAttributeKey] = useState("");
  const [extraAttributeValue, setExtraAttributeValue] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (nftData.coverImage) {
      const objectUrl = URL.createObjectURL(nftData.coverImage);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [nftData.coverImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNftData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAssetFile(file);
  };

  const addExtraAttribute = () => {
    if (extraAttributeKey && extraAttributeValue) {
      setNftData((prev) => ({
        ...prev,
        extraAttributes: [
          ...prev.extraAttributes,
          { key: extraAttributeKey, value: extraAttributeValue },
        ],
      }));
      setExtraAttributeKey("");
      setExtraAttributeValue("");
    }
  };

  const removeExtraAttribute = (index: number) => {
    setNftData((prev) => ({
      ...prev,
      extraAttributes: prev.extraAttributes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!user.isLoggedIn) {
      toast.error("You need to be logged in to create a collection");
      return;
    }

    if (!nftData.name.trim()) {
      toast.error("Collection name is required");
      return;
    }

    if (!nftData.symbol.trim()) {
      toast.error("Symbol is required");
      return;
    }

    setIsLoading(true);
    setProgress(0);

    // Start fake progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 500);

    const formData = new FormData();
    if (nftData.coverImage) {
      formData.append("coverImage", nftData.coverImage);
    }
    if (assetFile) {
      formData.append("asset", assetFile);
    }

    try {
      const attributes = {
        name: nftData.attributeName,
        ...nftData.extraAttributes.reduce(
          (acc, attr) => ({
            ...acc,
            [attr.key]: attr.value,
          }),
          {}
        ),
      };

      const result = await createNft(nftData, formData, projectId, user, id!);

      // Complete the progress
      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!result?.success) {
        toast.error(result?.message);
        return;
      }

      toast.success(result.message);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip="Quick Create"
          className="max-w-36 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >
          <PlusCircleIcon />
          <span>Create Asset</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] bg-[#222] max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create NFT Asset</DialogTitle>
          <DialogDescription>
            Create a new NFT asset collection.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={nftData.name}
              onChange={(e) =>
                setNftData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* Symbol */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Symbol *
            </Label>
            <Input
              id="symbol"
              className="col-span-3"
              value={nftData.symbol}
              onChange={(e) =>
                setNftData((prev) => ({
                  ...prev,
                  symbol: e.target.value,
                }))
              }
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description *
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={nftData.description}
              onChange={(e) =>
                setNftData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={nftData.category}
              onValueChange={(value: AssetsCollectionCategory) =>
                setNftData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value={AssetsCollectionCategory.Youtuber}>
                    Youtuber
                  </SelectItem>
                  <SelectItem value={AssetsCollectionCategory.Musician}>
                    Musician
                  </SelectItem>
                  <SelectItem value={AssetsCollectionCategory.other}>
                    Other
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Cover Image */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coverImage" className="text-right mb-6">
              Cover Image *
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
              <p className="text-xs text-gray-400 mt-1">
                Upload a cover image for your NFT
              </p>
            </div>
          </div>

          {/* Asset */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="asset" className="text-right mb-6">
              Asset *
            </Label>
            <div className="col-span-3">
              <div className="flex items-center gap-4">
                <Input
                  id="asset"
                  type="file"
                  accept="image/*,audio/*,video/*"
                  className="flex-1"
                  onChange={handleAssetChange}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Upload your asset eg. videos, audios, images
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>
                {progress <= 88 ? "Creating your assest..." : "Almost there..."}
              </span>
              <span>{progress}%</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="relative"
          >
            {isLoading ? (
              <>
                <span className="invisible">Creating...</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  Creating...
                </span>
              </>
            ) : (
              "Create NFT Asset"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssetButton;
