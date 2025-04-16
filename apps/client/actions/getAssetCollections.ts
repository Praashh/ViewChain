"use server"

import { prisma } from "@repo/db/client"

export async function getAssetCollections(userid:string) {
    try {
        const assteCollections = await prisma.assetsCollection.findMany({
            where:{
                userId:userid
            }
        })
        console.log("assetCollection--", assteCollections)
        if(!assteCollections){
            console.log("error while gettiting")
            return {
                success: false,
                message: "Error while fetching assetCollections"
            }
        }else{
            console.log("assteCollections  ", assteCollections)
            return {
                success: true,
                assetCollections: assteCollections
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }    
}