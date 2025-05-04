import cron from "node-cron";
import { prisma } from "@repo/db/client";
import { proofStats } from "../models/ProofStats";

/**
 * Saves proof generation statistics to the database
 */
async function saveProofStatsToDB() {
  try {
    console.log("Running scheduled proof stats persistence...");
    
    // Get stats for each asset
    for (const assetId in proofStats.assetStats) {
      const assetStats = proofStats.assetStats[assetId];
      
      // Check if we have any successful proofs for this asset
      if (assetStats.successes > 0) {
        // Get the most recent view count from the database
        const asset = await prisma.asset.findUnique({
          where: { id: assetId },
          select: { 
            analytics: true,
            id: true
          }
        });

        if (asset) {
          const analytics = asset.analytics as any;
          const viewCount = analytics?.views || 0;
          
          // Get last saved proof
          const lastProof = await prisma.viewProof.findFirst({
            where: { assetId },
            orderBy: { timestamp: 'desc' }
          });
          
          // Only save a new proof if the view count has increased since the last proof
          if (!lastProof || lastProof.viewCount < viewCount) {
            console.log(`Saving new proof for asset ${assetId} with view count ${viewCount}`);
            
            // Create a dummy proof object if we don't have a real ZK proof
            // This is just for demonstration purposes
            const dummyProof = {
              type: "simple-verification",
              timestamp: new Date().toISOString(),
              viewCount,
              verified: true
            };
            
            await prisma.viewProof.create({
              data: {
                assetId,
                viewCount,
                proof: dummyProof,
                timestamp: new Date()
              }
            });
            
            console.log(`Created new proof record for asset ${assetId}`);
          }
        }
      }
    }
    
    console.log("Proof stats persistence completed");
  } catch (error) {
    console.error("Error in proof stats cron job:", error);
  }
}

/**
 * Initializes the cron job
 */
export function initProofStatsCron() {
  // Schedule the cron job to run every hour
  // Format: minute hour day-of-month month day-of-week
  // "0 * * * *" = run at the beginning of every hour
  cron.schedule("0 * * * *", saveProofStatsToDB);
  
  console.log("Proof stats cron job scheduled");
} 