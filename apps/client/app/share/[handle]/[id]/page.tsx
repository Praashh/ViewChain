"use client";
import { queryNft } from "@/actions/NFT/queryNft";
import VideoPlayer from "@/components/ui/video-player";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, Music, Eye, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssetViews } from "@/hooks/useAssetViews";
import { AssetProofButton } from "@/components/ui/AssetProofButton";
import { useSession, signIn } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";

const NFTCard = ({ nft }: { nft: any }) => {
  const { viewCount, isLoading, trackView } = useAssetViews({
    assetId: nft.id,
    autoTrack: false,
  });
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [viewTracked, setViewTracked] = useState(false);
  const isMediaAsset = nft.assetType?.includes("video") || nft.assetType?.includes("audio");

  const displayViewCount = isLoading ? nft.analytics.views : viewCount;

  const handlePlayMedia = async () => {
    if (!viewTracked) {
      const success = await trackView();
      if (success) {
        setViewTracked(true);
        toast.success("View tracked successfully");
      }
    }
  };

  const handleDialogClose = () => {
    setViewTracked(false);
  };

  const handleSignIn = () => {
    signIn();
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
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs">Creator: {nft.analytics.creator}</span>
          <span className="text-xs flex items-center gap-1">
            <Eye size={12} /> Views: {displayViewCount}
          </span>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          {!isLoggedIn ? (
            <Button 
              onClick={handleSignIn} 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              Sign in to interact
            </Button>
          ) : isMediaAsset && nft.assetUrl ? (
            <div className="flex flex-col space-y-2">
              <Dialog onOpenChange={handleDialogClose}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="flex items-center space-x-2 w-full"
                  >
                    {nft.assetType?.includes("video") ? (
                      <Play className="mr-2 h-4 w-4" />
                    ) : (
                      <Music className="mr-2 h-4 w-4" />
                    )}
                    <span>
                      {nft.assetType?.includes("video") ? "Play Video" : "Play Audio"}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  {nft.assetType?.includes("video") ? (
                    <div>
                      <VideoPlayer 
                        src={nft.assetUrl} 
                        onPlay={handlePlayMedia}
                      />
                    </div>
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
                        onPlay={handlePlayMedia}
                      />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <AssetProofButton 
              assetId={nft.id} 
              assetType={nft.assetType}
              assetUrl={nft.assetUrl}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

const Page = () => {
  const path = usePathname();
  const [nfts, setNfts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [handle, id] = path.split("/").slice(-2);
  const isGenericShare = handle === "collection";

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await queryNft(id);
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
          {isGenericShare ? "Shared Collection" : `Collection by @${handle}`}
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
      </div>
    </div>
  );
};

export default Page; 