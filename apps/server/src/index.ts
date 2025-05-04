import express, { Request, Response } from "express";
import { ReclaimClient } from "@reclaimprotocol/zk-fetch";
import { transformForOnchain, verifyProof } from "@reclaimprotocol/js-sdk";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
dotenv.config();

// Log environment variables for debugging
console.log("CLIENT_APP_URL:", process.env.CLIENT_APP_URL);
console.log("PORT:", process.env.PORT);

const reclaimClient = new ReclaimClient(
  process.env.APP_ID!,
  process.env.APP_SECRET!
);
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send("gm gm! api is running");
});

/**
 * Attempts direct verification of asset view count
 * This is a fallback when ZK proof generation fails
 */
async function verifyDirectly(url: string, expectedCount: number): Promise<boolean> {
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
 * POST endpoint to generate ZK proof for asset view counts
 * Receives assetId and viewCount from the client
 */
app.post("/generateProof", async (req: Request, res: Response) => {
  try {
    const { assetId, viewCount } = req.body;

    if (!assetId || viewCount === undefined) {
      return res.status(400).json({
        error: "Missing required parameters: assetId and viewCount",
      });
    }

    const client_app_url = process.env.CLIENT_APP_URL || "";

    if (!client_app_url) {
      return res.status(500).json({ error: "CLIENT_APP_URL is not set" });
    }

    // Create the API URL that will fetch the view count from the client app
    const viewCountApiUrl = `${client_app_url}/api/assets/${assetId}/view`;
    console.log("Attempting ZK proof for:", viewCountApiUrl);

    // Try ZK Proof generation first
    try {
      // Generate a ZK proof for the view count
      const proof = await reclaimClient.zkFetch(
        viewCountApiUrl,
        {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        },
        {
          // Define how to extract the view count from the response
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
        throw new Error("Failed to generate proof");
      }

      // Verify the proof
      const isValid = await verifyProof(proof);
      if (!isValid) {
        throw new Error("Proof is invalid");
      }

      // Transform the proof data to be used on-chain (for the contract)
      const proofData = await transformForOnchain(proof);

      return res.status(200).json({
        success: true,
        assetId,
        viewCount,
        transformedProof: proofData,
        proof,
      });
    } catch (zkError) {
      console.error("Error using zkFetch:", zkError);
      
      // Fallback to direct verification
      console.log("Falling back to direct verification");
      
      // Try verification on the provided URL
      const isValid = await verifyDirectly(viewCountApiUrl, Number(viewCount));
      
      if (isValid) {
        return res.status(200).json({
          success: true,
          assetId,
          viewCount,
          simpleVerification: true,
          message: "Verified directly (no ZK proof in development)"
        });
      } else {
        // If network URL verification fails, try localhost as a fallback
        const localUrl = viewCountApiUrl.replace(/http:\/\/[^\/]+/, "http://localhost:3000");
        const isLocalValid = await verifyDirectly(localUrl, Number(viewCount));
        
        if (isLocalValid) {
          return res.status(200).json({
            success: true,
            assetId, 
            viewCount,
            simpleVerification: true,
            message: "Verified directly through localhost (no ZK proof in development)"
          });
        } else {
          return res.status(400).json({ 
            error: "View count verification failed on both network and localhost", 
            expectedCount: viewCount
          });
        }
      }
    }
  } catch (error) {
    console.error("Error generating proof:", error);
    return res.status(500).json({
      error: "Failed to generate proof",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
