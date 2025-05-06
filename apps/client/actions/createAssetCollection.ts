"use server"
import { TCollectionData } from "@/components/ui/create-collection-button";
import { uploadAssetToCloudinary } from "@/config/cloudinary";
import { prisma } from "@repo/db";
import { Underdog } from '@repo/underdog';

export async function createAssetCollection(collectionData: TCollectionData, imageData: FormData, userId: string) {
  try {
    const file = imageData.get("coverImage") as File | null;
    if (!file) return { success: false, message: "No file provided" };
    
    // Initialize the Underdog client early so it can be ready while we upload
    const UClient = new Underdog(process.env.UNDERDOG_API_KEY as string);
    
    // Start Cloudinary upload and don't await it yet
    const uploadPromise = uploadAssetToCloudinary(file);
    
    // While the image is uploading, prepare other data
    const symbol = collectionData.name.slice(0, 1).toUpperCase();
    
    // Now await the upload result
    const uploadResult = await uploadPromise;
    if (!uploadResult.success || !uploadResult.result) {
      return { success: false, message: uploadResult.message };
    }
    
    // Create Underdog collection and DB record in parallel
    const [underdogResult] = await Promise.all([
      UClient.createCollection({
        name: collectionData.name,
        symbol: symbol,
        description: collectionData.description,
        image: uploadResult.result.secure_url,
        semifungible: true,
        animationUrl: 'https://cdn.dribbble.com/userupload/23739582/file/original-7bb2ac9fca229bea8c4fe8b757a709c7.gif',
        externalUrl: 'https://view-chain.vercel.app/',
        attributes: {points: 10, name: collectionData.name},
        core: true,
        sellerFeeBasisPoints: 100
      })
    ]);

    if(!underdogResult.success) {
      return { success: false, message: "Error While Creating a NFT Collection" };
    }
    
    // Create DB record after Underdog is successful (this can't be parallelized as it needs the projectId)
    const newAssetCollection = await prisma.assetsCollection.create({
      data: {
        name: collectionData.name,
        description: collectionData.description,
        category: collectionData.category,
        userId,
        collectionImageUrl: uploadResult.result.secure_url,
        underdogProjectId: underdogResult.data?.projectId
      }
    });
    
    return { success: true, collection: newAssetCollection };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}