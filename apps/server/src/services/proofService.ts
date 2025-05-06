import { ReclaimClient } from "@reclaimprotocol/zk-fetch";
import { Proof, transformForOnchain, verifyProof } from "@reclaimprotocol/js-sdk";
import fetch from "node-fetch";
import { recordProofAttempt } from "../models/ProofStats";
import { prisma } from "@repo/db";

/**
 * Type definition for the proof response
 */
export interface ProofResult {
  success: boolean;
  assetId: string;
  viewCount: number;
  transformedProof?: any;
  proof?: any;
  simpleVerification?: boolean;
  message?: string;
}

// Initialize Reclaim client
const reclaimClient = new ReclaimClient(
  process.env.APP_ID!,
  process.env.APP_SECRET!
);

/**
 * Attempts direct verification of asset view count
 * This is a fallback when ZK proof generation fails
 */
export async function verifyDirectly(url: string, expectedCount: number): Promise<boolean> {
  try {
    console.log(`Direct verification from: ${url}, expecting count: ${expectedCount}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Direct verification failed: API returned ${response.status} ${response.statusText}`);
      return false;
    }
    
    const data = await response.json() as { views: number };
    console.log(`Expected view count: ${expectedCount}, Actual: ${data.views}`);
    
    // Views can increase while verifying, so we check if actual is >= expected
    return data.views >= expectedCount;
  } catch (error) {
    console.error("Direct verification failed:", error);
    return false;
  }
}

/**
 * Generates ZK proof for asset view count
 */
export async function generateViewProof(assetId: string, viewCount: number): Promise<ProofResult> {
  if (!assetId || viewCount === undefined) {
    throw new Error("Missing required parameters: assetId and viewCount");
  }

  // Check if a proof already exists for this asset and view count
  try {
    const existingProof = await prisma.viewProof.findFirst({
      where: {
        assetId,
        viewCount
      }
    });

    if (existingProof) {
      console.log(`Proof already exists for asset ${assetId} with view count ${viewCount}`);
      return {
        success: true,
        assetId,
        viewCount,
        proof: existingProof.proof,
        message: "Proof already exists for this view count"
      };
    }
  } catch (error) {
    console.error(`Error checking for existing proof: ${error}`);
    // Continue with proof generation even if check fails
  }

  const client_app_url = process.env.CLIENT_APP_URL || "";

  if (!client_app_url) {
    throw new Error("CLIENT_APP_URL is not set");
  }

  const viewCountApiUrl = `${client_app_url}/api/assets/${assetId}/view`;
  console.log(`Attempting ZK proof for asset ${assetId} with view count ${viewCount}`);
  console.log(`API URL: ${viewCountApiUrl}`);

  try {
    // Attempt to generate a ZK proof using Reclaim protocol
    const proof = await reclaimClient.zkFetch(
      viewCountApiUrl,
      {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      },
      {
        responseMatches: [
          {
            type: "regex",
            value: '"views":(<view>\\d+)',
          },
        ],
        responseRedactions: [
          {
            regex: '"views":(<view>\\d+)',
          },
        ],
      }
    );

    if (!proof) {
      recordProofAttempt(assetId, false);
      throw new Error("Failed to generate ZK proof - no proof returned");
    }

    // Verify the generated proof
    const isValid = await verifyProof(proof);
    if (!isValid) {
      recordProofAttempt(assetId, false);
      throw new Error("ZK proof is invalid - verification failed");
    }

    // Transform the proof for on-chain use
    const proofData = await transformForOnchain(proof);
    console.log(`ZK proof successfully generated and verified for asset ${assetId}`);
    
    // Record successful proof attempt
    recordProofAttempt(assetId, true);

    // Save the proof to the database
    await saveProofToDatabase(assetId, viewCount, proof);

    return {
      success: true,
      assetId,
      viewCount,
      transformedProof: proofData,
      proof,
      message: "ZK proof successfully generated"
    };
  } catch (zkError) {
    console.error(`Error generating ZK proof for asset ${assetId}:`, zkError);
    recordProofAttempt(assetId, false);
    
    // Fall back to direct verification
    console.log(`Falling back to direct verification for asset ${assetId}`);
    
    try {
      // First try the original URL
      const isValid = await verifyDirectly(viewCountApiUrl, Number(viewCount));
      
      if (isValid) {
        console.log(`Direct verification successful for asset ${assetId}`);
        return {
          success: true,
          assetId,
          viewCount,
          simpleVerification: true,
          message: "Verified directly (no ZK proof in development)"
        };
      } 
      
      // If that fails, try with localhost
      const localUrl = viewCountApiUrl.replace(/http:\/\/[^\/]+/, "http://localhost:3000");
      console.log(`Trying localhost fallback: ${localUrl}`);
      
      const isLocalValid = await verifyDirectly(localUrl, Number(viewCount));
      
      if (isLocalValid) {
        console.log(`Local verification successful for asset ${assetId}`);
        return {
          success: true,
          assetId, 
          viewCount,
          simpleVerification: true,
          message: "Verified directly through localhost (no ZK proof in development)"
        };
      }
      
      // If all verification methods fail
      throw new Error(`View count verification failed on both network and localhost. Expected: ${viewCount}`);
    } catch (directError) {
      console.error(`All verification methods failed for asset ${assetId}:`, directError);
      throw new Error(`Failed to verify view count: ${directError instanceof Error ? directError.message : 'Unknown error'}`);
    }
  }
}

/**
 * Saves a generated proof to the database
 */
export async function saveProofToDatabase(assetId: string, viewCount: number, proof: any) {
  try {
    // Check if we already have a proof for this exact view count
    const existingProof = await prisma.viewProof.findFirst({
      where: {
        assetId,
        viewCount
      }
    });
    
    if (existingProof) {
      console.log(`Proof for asset ${assetId} with view count ${viewCount} already exists (ID: ${existingProof.id})`);
      return existingProof;
    }
    
    // Create a new proof record
    const result = await prisma.viewProof.create({
      data: {
        assetId,
        viewCount,
        proof,
        timestamp: new Date()
      }
    });
    
    console.log(`Proof saved to database with ID: ${result.id}`);
    return result;
  } catch (error) {
    console.error(`Error saving proof to database for asset ${assetId}:`, error);
    throw error;
  }
} 