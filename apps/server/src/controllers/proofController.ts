import { Request, Response } from "express";
import { generateViewProof } from "../services/proofService";
import { proofStats } from "../models/ProofStats";

/**
 * Handles proof generation requests
 */
export async function generateProof(req: Request, res: Response) {
  try {
    const { assetId, viewCount } = req.body;

    if (!assetId || viewCount === undefined) {
      return res.status(400).json({
        error: "Missing required parameters: assetId and viewCount",
      });
    }

    const result = await generateViewProof(assetId, viewCount);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error generating proof:", error);
    return res.status(500).json({
      error: "Failed to generate proof",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Returns proof generation statistics
 */
export async function getProofStats(req: Request, res: Response) {
  try {
    return res.status(200).json({
      success: true,
      stats: proofStats
    });
  } catch (error) {
    console.error("Error fetching proof stats:", error);
    return res.status(500).json({
      error: "Failed to fetch proof statistics",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
} 