"use server"

import { prisma } from "@repo/db"

export async function queryNft(id:string){
    try {
        const nftAssets = await prisma.asset.findMany({
            where:{
                collectionId: id,
            }
        });

        if(!nftAssets){
            return {
                success: false,
                message: "No Nft Asset found for this collection"
            }
        }

        return {
            success: true,
            message: "Nft Found",
            Nfts: nftAssets
        }
    } catch (error) {
        return {
            success: false,
            message: `Error while finding the assets ${error}`
        }
    }
}