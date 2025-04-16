"use server"

import { TCollectionData } from "@/components/ui/create-collection-button";
import { prisma } from "@repo/db/client";

export async function createAssetCollection(collectionData: TCollectionData, userId: string) {
    try {
        const newAssetCollection = await prisma.assetsCollection.create({
            data: {
              name: collectionData.name,
              description: collectionData.description,
              category: collectionData.category,
              userId,
            }
          });
      
          

        if (!newAssetCollection) {
            return {
                success: false,
                message: "Error While Creating Collection"
            }
        } else {
            return {
                success: true,
                collection: newAssetCollection
            }
        }
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message
        }
    }
}