"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface UseAssetViewsProps {
  assetId: string;
  autoTrack?: boolean; // Whether to automatically track views on mount
}

interface UseAssetViewsReturn {
  viewCount: number;
  isLoading: boolean;
  error: string | null;
  trackView: () => Promise<boolean>;
  generateProof: () => Promise<any>;
}

/**
 * Hook for tracking and displaying asset views
 * @param assetId ID of the asset to track views for
 * @param autoTrack Whether to automatically track views on mount (default: true)
 */
export function useAssetViews({
  assetId,
  autoTrack = true,
}: UseAssetViewsProps): UseAssetViewsReturn {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get the current view count
  const fetchViewCount = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/assets/${assetId}/view`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch view count: ${response.statusText}`);
      }

      const data = await response.json();
      setViewCount(data.views);
      return data.views;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch view count";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to track a new view
  const trackView = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/assets/${assetId}/view`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to track view: ${response.statusText}`);
      }

      const data = await response.json();
      setViewCount(data.views);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to track view";
      setError(errorMessage);
      toast.error(`Error tracking view: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate a ZK proof of view count
  const generateProof = async () => {
    try {
      setIsLoading(true);
      // Use the server action to generate a proof
      const { generateViewProof } = await import("@/actions/generateViewProof");
      const result = await generateViewProof(assetId);

      if (!result.success) {
        throw new Error(result.error || "Failed to generate proof");
      }

      toast.success("View count proof generated successfully");
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate proof";
      setError(errorMessage);
      toast.error(`Error generating proof: ${errorMessage}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-track views on mount if enabled
  useEffect(() => {
    fetchViewCount();

    if (autoTrack) {
      trackView();
    }
  }, [assetId, autoTrack]);

  return {
    viewCount,
    isLoading,
    error,
    trackView,
    generateProof,
  };
}
