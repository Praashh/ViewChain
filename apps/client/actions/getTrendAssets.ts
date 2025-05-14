"use server"

import prisma from "@repo/db"

export async function getTrendAssets() {
    try {
        const assets = await prisma.asset.findMany({
            orderBy: {
                assetViews: {
                    _count: "desc"
                }
            },
            include: {
                AssetsCollection: true
            },
            take: 100
        })
        return {success: true, assets}
    } catch (error) {
        console.error(error)
        return { success: false, error: "Failed to fetch trend assets" }
    }
}
