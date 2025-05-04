"use server";

/**
 * Server action to generate and verify a ZK proof for an asset's view count
 * This connects to the Express server to generate the proof
 */
export async function generateViewProof(assetId: string) {
  try {
    // First, get the current view count from our database
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${assetId}/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch view count: ${response.statusText}`);
    }

    const data = await response.json();
    const viewCount = data.views;

    // Now, send this to our Express server to generate a ZK proof
    const proofResponse = await fetch(
      `${process.env.SERVER_URL}/generateProof`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assetId, viewCount }),
      }
    );

    if (!proofResponse.ok) {
      throw new Error(`Failed to generate proof: ${proofResponse.statusText}`);
    }

    const proofData = await proofResponse.json();

    return {
      success: true,
      proof: proofData.transformedProof,
      rawProof: proofData.proof,
      viewCount,
    };
  } catch (error) {
    console.error("Error generating view proof:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
