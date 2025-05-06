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
    // Use the new API endpoint (/api/generateProof)
    const serverUrl = process.env.SERVER_URL || 'http://localhost:3001';
    const proofResponse = await fetch(
      `${serverUrl}/api/generateProof`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assetId, viewCount }),
        cache: 'no-store',
      }
    );

    if (!proofResponse.ok) {
      const errorData = await proofResponse.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.details || proofResponse.statusText;
      throw new Error(`Failed to generate proof: ${errorMessage}`);
    }

    const proofData = await proofResponse.json();

    // Also save the proof to our database for future reference
    try {
      await saveProofToDatabase(assetId, viewCount, proofData);
    } catch (saveError) {
      console.error("Error saving proof to database:", saveError);
      // Continue even if saving fails - we still have the proof
    }

    return {
      success: true,
      proof: proofData.transformedProof,
      rawProof: proofData.proof,
      simpleVerification: proofData.simpleVerification,
      alreadyExists: proofData.alreadyExists,
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

/**
 * Helper function to save the proof to our database
 */
async function saveProofToDatabase(assetId: string, viewCount: number, proofData: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/assets/${assetId}/proof`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assetId,
        viewCount,
        proof: proofData
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to save proof: ${response.statusText}`);
  }

  return await response.json();
}
