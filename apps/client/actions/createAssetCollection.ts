"use server"

import { TCollectionData } from "@/components/ui/create-collection-button";
import { uploadAssetToCloudinary } from "@/config/cloudinary";
import { prisma } from "@repo/db/client";
import  {Underdog}  from '@repo/underdog'
export async function createAssetCollection(collectionData: TCollectionData, userId: string) {
    console.log(collectionData)
    try {
        const result = uploadAssetToCloudinary(collectionData.coverImage?.name!);
        const error = (await result).message
        if(!result){
            return {
                success: false,
                message: error
            }
        }
        // console.log((await result).message)
        // const UClient = new Underdog(process.env.UNDERDOG_API_KEY as string);
        // console.log("UClient--", UClient)
        // console.log("calling Underdog")
        // await UClient.getAllCollections({ page: 1, limit: 10 })
        // const newUnderdogProject = await UClient.createCollection({
        //     name: collectionData.name,
        //     symbol: collectionData.name.slice(0, 1).toUpperCase(),
        //     description: collectionData.description,
        //     image: 'https://pbs.twimg.com/profile_images/1573323733640826880/478aTnia_400x400.jpg',
        //     semifungible: true,
        //     animationUrl: 'https://cdn.dribbble.com/userupload/23739582/file/original-7bb2ac9fca229bea8c4fe8b757a709c7.gif',
        //     externalUrl: 'https://view-chain.vercel.app/',
        //     attributes: {points: 10, name: collectionData.name},
        //     core: true,
        //     sellerFeeBasisPoints: 100
        //   }
        // );
        // if(!newUnderdogProject.success){
        //     return {
        //         success: false,
        //         message: "Error While Creating a NFT Collection"
        //     }
        // }
        // const newAssetCollection = await prisma.assetsCollection.create({
        //     data: {
        //       name: collectionData.name,
        //       description: collectionData.description,
        //       category: collectionData.category,
        //       userId,
        //       underdogProjectId: newUnderdogProject?.data?.projectId
        //     }
        //   });
      
          

        // if (!newAssetCollection) {
        //     return {
        //         success: false,
        //         message: "Error While Creating Collection"
        //     }
        // } else {
        //     return {
        //         success: true,
        //         collection: newAssetCollection
        //     }
        // }
        return {
                    success: false,
                    message: "Error While Creating Collection"
                }
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message
        }
    }
}