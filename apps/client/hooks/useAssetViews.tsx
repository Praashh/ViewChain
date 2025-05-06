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
  hasProof: boolean;
  proofStatus: 'none' | 'generating' | 'success' | 'error';
  fetchProofs: () => Promise<any[]>;
}

/**
 * Hook for tracking and displaying asset views
 * @param assetId ID of the asset to track views for
 * @param autoTrack Whether to automatically track views on mount (default: false)
 */
export function useAssetViews({
  assetId,
  autoTrack = false, 
}: UseAssetViewsProps): UseAssetViewsReturn {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasProof, setHasProof] = useState<boolean>(false);
  const [proofStatus, setProofStatus] = useState<'none' | 'generating' | 'success' | 'error'>('none');

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

  // Function to fetch existing proofs
  const fetchProofs = async () => {
    try {
      const response = await fetch(`/api/assets/${assetId}/proof`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch proofs: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.proofs && data.proofs.length > 0) {
        setHasProof(true);
      } else {
        setHasProof(false);
      }
      
      return data.proofs || [];
    } catch (error) {
      console.error("Error fetching proofs:", error);
      return [];
    }
  };

  // Function to generate a ZK proof of view count
  const generateProof = async () => {
    try {
      setIsLoading(true);
      setProofStatus('generating');
      
      // Automatically track a view first when generating proof
      await trackView();
      
      // Use the server action to generate a proof
      const { generateViewProof } = await import("@/actions/generateViewProof");
      const result = await generateViewProof(assetId);

      if (!result.success) {
        setProofStatus('error');
        throw new Error(result.error || "Failed to generate proof");
      }

      setProofStatus('success');
      setHasProof(true);
      
      // Refresh the view count after successful proof generation
      await fetchViewCount();
      
      // Check if a proof already existed
      if (result.alreadyExists) {
        toast.info("Proof already exists for this view count");
      }
      // If it's a simple verification (non-ZK), show different message
      else if (result.simpleVerification) {
        toast.success("View count verified successfully (development mode)");
      } else {
        toast.success("View count proof generated successfully");
      }
      
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate proof";
      setError(errorMessage);
      setProofStatus('error');
      toast.error(`Error generating proof: ${errorMessage}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch view count and proofs on mount, don't track automatically
  useEffect(() => {
    fetchViewCount();
    fetchProofs();

    // Only track a view if explicitly requested
    if (autoTrack) {
      trackView();
    }
  }, [assetId]);

  return {
    viewCount,
    isLoading,
    error,
    trackView,
    generateProof,
    hasProof,
    proofStatus,
    fetchProofs
  };
}
