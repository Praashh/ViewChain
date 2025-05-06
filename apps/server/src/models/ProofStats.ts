/**
 * Represents statistics for proof generation attempts
 */
export interface ProofGenerationStats {
  attempts: number;
  successes: number;
  failures: number;
  assetStats: Record<string, AssetProofStats>;
  lastUpdated: Date;
}

/**
 * Represents proof statistics for a specific asset
 */
export interface AssetProofStats {
  assetId: string;
  attempts: number;
  successes: number;
  failures: number;
  lastSuccessful: Date | null;
}

// In-memory proof generation stats (will be persisted periodically)
export const proofStats: ProofGenerationStats = {
  attempts: 0,
  successes: 0,
  failures: 0,
  assetStats: {},
  lastUpdated: new Date()
};

/**
 * Records a proof generation attempt
 */
export function recordProofAttempt(assetId: string, success: boolean): void {
  // Update global stats
  proofStats.attempts++;
  if (success) {
    proofStats.successes++;
  } else {
    proofStats.failures++;
  }
  
  // Update asset-specific stats
  if (!proofStats.assetStats[assetId]) {
    proofStats.assetStats[assetId] = {
      assetId,
      attempts: 0,
      successes: 0,
      failures: 0,
      lastSuccessful: null
    };
  }
  
  const assetStats = proofStats.assetStats[assetId];
  assetStats.attempts++;
  
  if (success) {
    assetStats.successes++;
    assetStats.lastSuccessful = new Date();
  } else {
    assetStats.failures++;
  }
  
  proofStats.lastUpdated = new Date();
} 
