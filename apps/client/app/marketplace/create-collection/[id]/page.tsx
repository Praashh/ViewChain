"use client";
import { queryNft } from "@/actions/NFT/queryNft";
import AssetsCollection from "@/components/landing/asset-collection";
import CreateAssetButton from "@/components/ui/create-asset-button";
import VideoPlayer from "@/components/ui/video-player";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, Music, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssetViews } from "@/hooks/useAssetViews";
import { AssetProofButton } from "@/components/ui/AssetProofButton";
import { useSession } from "next-auth/react";
import { User } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/ui/card-skeleton";

const NFTCard = ({ nft }: { nft: any }) => {
  // Use our custom hook to track views for this asset
  const { viewCount, isLoading } = useAssetViews({
    assetId: nft.id,
    autoTrack: false,
  });

  // Display either the tracked view count or the initial analytics count
  const displayViewCount = isLoading ? nft.analytics.views : viewCount;

  return (
    <Card className="rounded-lg p-0 px-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={nft.imageurl}
          alt={nft.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="text-sm bg-blue-300 mb-2">{nft.symbol}</Badge>
            <h3 className="text-lg font-semibold truncate">{nft.name}</h3>
          </div>
        </div>
        <div className="flex mt-3 items-center gap-2">
          <Badge
            variant="secondary"
            className="text-xs bg-accent flex items-center gap-1"
          >
            <Eye className="size-4" /> {displayViewCount}
          </Badge>
          <Badge
            asChild
            className="bg-accent flex items-center justify-between"
          >
            <span className="text-xs">
              <User className="size-3" weight="bold" />
              {nft.analytics.creator}
            </span>
          </Badge>
        </div>
        {/* Add the proof generation button */}
        <div className="mt-4 pt-4">
          <AssetProofButton
            assetId={nft.id}
            assetType={nft.assetType}
            assetUrl={nft.assetUrl}
          />
        </div>
      </div>
    </Card>
  );
};

const Page = () => {
  const path = usePathname();
  const [nfts, setNfts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [collectionData, setCollectionData] = useState<any>(null);
  const id = path.split("/").pop();
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await queryNft(id!);
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setNfts(result.Nfts);
      setCollectionData(result.collection);
      setLoading(false);
    })();
  }, [id]);

  const handleShare = () => {
    // Try to get the creator's handle from the collection data
    const creatorHandle =
      collectionData?.userId === session?.user?.id
        ? session?.user?.socialHandle
        : collectionData?.creatorHandle;

    if (creatorHandle) {
      const shareUrl = `${window.location.origin}/share/${creatorHandle}/${id}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied to clipboard!");
    } else {
      // Fallback to a generic share URL if no handle is available
      const shareUrl = `${window.location.origin}/share/collection/${id}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-r">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-medium`>NFT Collection</h1">
            NFT Collection
          </h1>

          <div className="flex items-center gap-2">
            <CreateAssetButton />
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Share2 size={16} />
              Share Collection
            </Button>
          </div>
        </div>

        {loading ? (
          <CardSkeleton className="h-fit w-full" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nfts.length > 0 ? (
              nfts.map((nft: any) => <NFTCard key={nft.id} nft={nft} />)
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No NFTs found in this collection
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
