import { v2 as cloudinary } from "cloudinary";

console.log("Keys", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECREY)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECREY,
});

export async function uploadAssetToCloudinary(file: File | Blob | Buffer | string) {
    try {
      let uploadResult;
      if (typeof file === "string") {
        // Case 1: Direct URL upload
        uploadResult = await cloudinary.uploader.upload(file);
      } else {
        // Case 2: File/Blob -> Buffer -> Base64
        const buffer = Buffer.from(await (file as Blob).arrayBuffer());
        const base64String = buffer.toString("base64");
        uploadResult = await cloudinary.uploader.upload(
          `data:image/jpeg;base64,${base64String}`
        );
      }
  
      if (!uploadResult?.secure_url) {
        throw new Error("No URL returned from Cloudinary");
      }
  
      return {
        success: true,
        result: uploadResult,
        message: "Upload successful",
      };
    } catch (error) {
      console.error("Cloudinary error:", error);
      return {
        success: false,
        message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }