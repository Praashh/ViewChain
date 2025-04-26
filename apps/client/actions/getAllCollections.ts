"use server"

import { prisma } from "@repo/db/client"

export async function getAllCollections(){
    try {
        const collections = await prisma.assetsCollection.findMany();
        console.log("collections", collections);
        
        return {
            success: true,
            collections
        }
    } catch (error) {
        console.log(error);
        return {
            success: false
        }
    }
}