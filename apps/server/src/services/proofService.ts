import { ReclaimClient } from "@reclaimprotocol/zk-fetch";
import { Proof, transformForOnchain, verifyProof } from "@reclaimprotocol/js-sdk";
import fetch from "node-fetch";
import { recordProofAttempt } from "../models/ProofStats";
import { prisma } from "@repo/db/client";

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
    console.log("Direct verification from:", url);
    const response = await fetch(url);
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

  const client_app_url = process.env.CLIENT_APP_URL || "";

  if (!client_app_url) {
    throw new Error("CLIENT_APP_URL is not set");
  }


  const viewCountApiUrl = `${client_app_url}/api/assets/${assetId}/view`;
  console.log("Attempting ZK proof for:", viewCountApiUrl);

  try {
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
      throw new Error("Failed to generate proof");
    }

    const isValid = await verifyProof(proof);
    if (!isValid) {
      recordProofAttempt(assetId, false);
      throw new Error("Proof is invalid");
    }

    const proofData = await transformForOnchain(proof);


    recordProofAttempt(assetId, true);


    await saveProofToDatabase(assetId, viewCount, proof);

    return {
      success: true,
      assetId,
      viewCount,
      transformedProof: proofData,
      proof,
    };
  } catch (zkError) {
    console.error("Error using zkFetch:", zkError);
    recordProofAttempt(assetId, false);
    

    console.log("Falling back to direct verification");
    
    const isValid = await verifyDirectly(viewCountApiUrl, Number(viewCount));
    
    if (isValid) {
      return {
        success: true,
        assetId,
        viewCount,
        simpleVerification: true,
        message: "Verified directly (no ZK proof in development)"
      };
    } else {
      const localUrl = viewCountApiUrl.replace(/http:\/\/[^\/]+/, "http://localhost:3000");
      const isLocalValid = await verifyDirectly(localUrl, Number(viewCount));
      
      if (isLocalValid) {
        return {
          success: true,
          assetId, 
          viewCount,
          simpleVerification: true,
          message: "Verified directly through localhost (no ZK proof in development)"
        };
      } else {
        throw new Error(`View count verification failed on both network and localhost. Expected: ${viewCount}`);
      }
    }
  }
}

/**
 * Saves a generated proof to the database
 */
export async function saveProofToDatabase(assetId: string, viewCount: number, proof: any) {
  try {
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
    console.error("Error saving proof to database:", error);
    throw error;
  }
} 