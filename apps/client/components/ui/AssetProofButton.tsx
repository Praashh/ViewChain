"use client";

import { Button } from "@/components/ui/button";
import { useAssetViews } from "@/hooks/useAssetViews";
import { CheckCircle, Lock, RefreshCw, ShieldX, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface AssetProofButtonProps {
  assetId: string;
}

export function AssetProofButton({ assetId }: AssetProofButtonProps) {
  const { viewCount, generateProof, proofStatus, hasProof, isLoading } = useAssetViews({
    assetId,
    autoTrack: false,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  // Update the display count whenever viewCount changes
  useEffect(() => {
    setDisplayCount(viewCount);
  }, [viewCount]);

  const handleGenerateProof = async () => {
    const result = await generateProof();
    if (result?.success) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Button
          variant={hasProof ? "outline" : "default"}
          onClick={handleGenerateProof}
          disabled={proofStatus === "generating" || isLoading}
          className="flex items-center space-x-2"
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

        <div className="flex items-center text-gray-500 ml-2">
          <Eye className="mr-1 h-4 w-4" />
          <span className="text-sm font-medium">{displayCount}</span>
        </div>

        {proofStatus === "error" && (
          <div className="flex items-center text-red-500">
            <ShieldX className="mr-1 h-4 w-4" />
            <span className="text-sm">Proof generation failed</span>
          </div>
        )}
      </div>

      {isExpanded && hasProof && (
        <div className="rounded-md bg-secondary p-4 text-sm">
          <h4 className="font-medium mb-2">Verified View Count: {displayCount}</h4>
          <p className="text-xs text-muted-foreground">
            This view count has been cryptographically verified and can be used
            to prove engagement with this digital asset.
          </p>
        </div>
      )}
    </div>
  );
} 