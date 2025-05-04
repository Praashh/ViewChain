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
import { Play, Music, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssetViews } from "@/hooks/useAssetViews";

const NFTCard = ({ nft }: { nft: any }) => {
  // Use our custom hook to track views for this asset
  const { viewCount, isLoading, generateProof } = useAssetViews({
    assetId: nft.id,
    autoTrack: true, // Automatically track a view when the card is rendered
  });

  // Display either the tracked view count or the initial analytics count
  const displayViewCount = isLoading ? nft.analytics.views : viewCount;

  const handleGenerateProof = async () => {
    try {
      await generateProof();
    } catch (error) {
      toast.error("Failed to generate view proof");
    }
  };

  return (
    <Card className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={nft.imageurl}
          alt={nft.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold truncate">{nft.name}</h3>
            <Badge className="text-sm bg-blue-300 mb-2">{nft.symbol}</Badge>
          </div>

          <div className="flex space-x-2">
            {/* View count verification button */}
            <Button
              className="rounded-full p-2"
              size="icon"
              variant="outline"
              onClick={handleGenerateProof}
              title="Generate ZK proof of view count"
            >
              <Shield size={16} />
            </Button>

            {/* Media play button */}
            {(nft.assetType?.includes("video") ||
              nft.assetType?.includes("audio")) && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="rounded-full p-2"
                    size="icon"
                    variant="outline"
                  >
                    {nft.assetType?.includes("video") ? (
                      <Play size={16} />
                    ) : (
                      <Music size={16} />
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  {nft.assetType?.includes("video") ? (
                    <VideoPlayer src={nft.assetUrl} />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="rounded-full bg-gray-200 p-6 mb-4">
                        <Music size={48} className="text-gray-700" />
                      </div>
                      <audio
                        src={nft.assetUrl}
                        controls
                        autoPlay
                        className="w-full"
                      />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs">Creator: {nft.analytics.creator}</span>
          <span className="text-xs flex items-center gap-1">
            <Eye size={12} /> Views: {displayViewCount}
          </span>
        </div>
      </div>
    </Card>
  );
};

const Page = () => {
  const path = usePathname();
  const [nfts, setNfts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const id = path.split("/").pop();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await queryNft(id!);
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setNfts(result.Nfts);
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-r">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent">
          NFT Collection
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"></div>
          </div>
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

        <div className="mt-8">
          <CreateAssetButton />
        </div>
      </div>
    </div>
  );
};

export default Page;
