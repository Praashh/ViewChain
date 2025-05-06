"use server"

import { prisma } from "@repo/db"

export async function deleteAssetCollection(id:string) {
    try {
        await prisma.assetsCollection.delete({
            where:{
                id
            }
        })

        return {
            success: true,
            message: "Collection Deleted Successfully"
        }
    } catch (error) {
        
        return {
            success: true,
            message: error
        }
    }
}