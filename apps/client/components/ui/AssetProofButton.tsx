"use client";

import { Button } from "@/components/ui/button";
import { useAssetViews } from "@/hooks/useAssetViews";
import {
  CheckCircle,
  Lock,
  RefreshCw,
  ShieldX,
  Eye,
  Play,
  Music,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import VideoPlayer, { VideoPlayerProps } from "@/components/ui/video-player";
import { toast } from "sonner";
import { Badge } from "./badge";

interface AssetProofButtonProps {
  assetId: string;
  assetType?: string;
  assetUrl?: string;
}

export function AssetProofButton({
  assetId,
  assetType,
  assetUrl,
}: AssetProofButtonProps) {
  const {
    viewCount,
    generateProof,
    proofStatus,
    hasProof,
    isLoading,
    trackView,
  } = useAssetViews({
    assetId,
    autoTrack: false,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [viewTracked, setViewTracked] = useState(false);
  const isMediaAsset =
    assetType?.includes("video") || assetType?.includes("audio");

  // Update the display count whenever viewCount changes
  useEffect(() => {
    setDisplayCount(viewCount);
  }, [viewCount]);

  const handleGenerateProof = async () => {
    if (!viewTracked) {
      await trackView();
      setViewTracked(true);
    }

    const result = await generateProof();
    if (result?.success) {
      setIsExpanded(true);
    }
  };

  const handlePlayMedia = async () => {
    // Track the view when media is played
    if (!viewTracked) {
      const success = await trackView();
      if (success) {
        setViewTracked(true);
        toast.success("View tracked successfully");
      }
    }
  };

  // Reset the view tracked flag when the dialog closes
  const handleDialogClose = () => {
    setViewTracked(false);
  };

  // If this is a video or audio asset and we have the URL, show a play button instead
  if (isMediaAsset && assetUrl) {
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Dialog onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button variant="default" className="flex items-center space-x-2">
                {assetType?.includes("video") ? (
                  <Play className="mr-2 h-4 w-4" />
                ) : (
                  <Music className="mr-2 h-4 w-4" />
                )}
                <span>
                  {assetType?.includes("video") ? "Play Video" : "Play Audio"}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              {assetType?.includes("video") ? (
                <div>
                  <VideoPlayer src={assetUrl} onPlay={handlePlayMedia} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="rounded-full bg-gray-200 p-6 mb-4">
                    <Music size={48} className="text-gray-700" />
                  </div>
                  <audio
                    src={assetUrl}
                    controls
                    autoPlay
                    className="w-full"
                    onPlay={handlePlayMedia}
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>

          <div className="flex items-center text-gray-500 ml-2">
            <Eye className="mr-1 h-4 w-4" />
            <span className="text-sm font-medium">{displayCount}</span>
          </div>
        </div>
      </div>
    );
  }

  // Standard proof button for non-media assets
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col items-center w-full space-x-2">
        <Button
          variant={hasProof ? "outline" : "default"}
          onClick={handleGenerateProof}
          disabled={proofStatus === "generating" || isLoading}
          className="flex items-center w-full space-x-2"
        >
          {proofStatus === "generating" ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : hasProof ? (
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Lock className="mr-2 h-4 w-4" />
          )}
          <span>
            {proofStatus === "generating"
              ? "Generating Proof..."
              : hasProof
                ? "View Proof"
                : "Generate Proof"}
          </span>
        </Button>

        {proofStatus === "error" && (
          <Badge
            variant={"destructive"}
            className="flex mt-4 items-center text-red-500"
          >
            <ShieldX className="mr-1 h-4 w-4" />
            <span className="text-sm">Proof generation failed</span>
          </Badge>
        )}
      </div>

      {isExpanded && hasProof && (
        <div className="rounded-md bg-secondary p-4 text-sm">
          <h4 className="font-medium mb-2">
            Verified View Count: {displayCount}
          </h4>
          <p className="text-xs text-muted-foreground">
            This view count has been cryptographically verified and can be used
            to prove engagement with this digital asset.
          </p>
        </div>
      )}
    </div>
  );
}
