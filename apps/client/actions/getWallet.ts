"use server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { findUp } from "find-up";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECREY,
});
export async function getWalletPrivateKey(AssetId?: string) {
  try {
    const filePath = await findUp("services/underdog/wallet.json", {
      cwd: __dirname,
    });

    if (!filePath) {
      throw new Error("wallet.json not found in any parent directory");
    }

    // If AssetId is not provided, just ensure local file exists and return
    if (!AssetId) {
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      if (fileContent.length > 0) {
        return { success: true };
      }
      return { success: false };
    }

    // Try to fetch from Cloudinary
    try {
      const wallet = await cloudinary.api.resources_by_asset_ids(AssetId);
      const resources = Array.isArray(wallet.resources) ? wallet.resources : [];

      if (resources.length > 0 && resources[0]?.secure_url) {
        const walletJSON = await fetch(resources[0].secure_url);
        if (walletJSON.ok) {
          const jsonContent = await walletJSON.json();
          const fileContent = await fs.promises.readFile(filePath, "utf-8");

          if (fileContent.length <= 0) {
            await fs.promises.writeFile(
              filePath,
              JSON.stringify(jsonContent),
              "utf8",
            );
            console.log("Wrote content from Cloudinary, it was empty");
          }
          return { success: true };
        }
      }
    } catch (cloudinaryError) {
      console.warn(
        "Cloudinary fetch failed, using local wallet.json:",
        cloudinaryError,
      );
    }

    // Fallback: check if local file exists and has content
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    return {
      success: fileContent.length > 0,
    };
  } catch (error) {
    console.warn("Could not access wallet file:", error);
    return {
      success: false,
    };
  }
}
