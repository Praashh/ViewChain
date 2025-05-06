"use server"
import { TNftData } from "@/components/ui/create-asset-button"
import { uploadAssetToCloudinary } from "@/config/cloudinary";
import { prisma } from "@repo/db"
import { Underdog, uploadMediaOnIrys, uploadMetada } from '@repo/underdog';

export async function createNft(params : TNftData, imageData: FormData, projectId: number, user:any, collectionId: string ){
    try {
        const file = imageData.get("coverImage") as File | null;
        if (!file) return { success: false, message: "No file provided" };
        
        const assetFile = imageData.get("asset") as File | null;
        if (!assetFile) return { success: false, message: "No asset file provided" };

        // Initialize the Underdog client early so it can be ready while we upload
        const UClient = new Underdog(process.env.UNDERDOG_API_KEY as string);
        
        // Start Cloudinary upload and don't await it yet
        const coverImageUploadPromise = uploadAssetToCloudinary(file);
        // const assetUploadPromise = uploadAssetToCloudinary(assetFile);

        const {name, description, attributeName, category, coverImageUrl, coverImage, symbol, extraAttributes} = params;

        const [coverImageUploadResult] = await Promise.all([
            coverImageUploadPromise,
            // assetUploadPromise
          ]);
        console.log("coverImageUploadResult", coverImageUploadResult?.result?.secure_url)
        if (!coverImageUploadResult.success || !coverImageUploadResult.result) {
            return { success: false, message: coverImageUploadResult.message || "Failed to upload cover image" };
          }
        const imageAsset = await uploadMediaOnIrys(imageData);
        console.log("imageAsset", imageAsset)

        const metadata = await uploadMetada({
            name,
            description,
            symbol,
            image: coverImageUploadResult?.result?.secure_url,
            attributes: [{
                views: 0,
                asset_url: imageAsset,
                category
            }],
            properties: {
                files: [{
                    type: assetFile.type,
                    uri: imageAsset
                }
                ]
            },
            creators: [
                {
                    address:  user.user.publicKey,
                    creator: user.user.socialHandle
                }
            ]
        });

        console.log("metadata--", metadata)
        if(!metadata){
            return;
        }

        const newNft = await prisma.asset.create({
            data:{
                name,
                description, 
                imageurl: coverImageUploadResult?.result?.secure_url,
                assetUrl: imageAsset!,
                metadata: metadata[0],
                symbol,
                assetType: assetFile.type,
                collectionId,
                analytics: {
                    views: 0,
                    creator: user.user.socialHandle,
                    publicKey: user.user.publicKey
                }

            }
        })

        if(!newNft){
            return { success: false, message: "Error while creating a new NFt" };

        }
          return { success: true, message: "NFT created successfully", newNft };

    } catch (error) {
        console.error("Error creating NFT:", error);
        return { success: false, message: "An unexpected error occurred" };
      }
}