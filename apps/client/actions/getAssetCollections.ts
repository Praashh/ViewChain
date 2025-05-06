"use server"

import { authOptions } from "@/lib/auth"
import { prisma } from "@repo/db"
import { getServerSession } from "next-auth/next"

export async function getAssetCollections(userid:string) {
    const session = await getServerSession(authOptions)
    
    console.log("userid", session?.user.id)
    try {
        const assteCollections = await prisma.assetsCollection.findMany({
            where:{
                userId:session?.user.id
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