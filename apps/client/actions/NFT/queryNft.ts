"use server";

import { prisma } from "@repo/db";

export async function queryNft(id: string) {
  try {
    const [nftAssets, collection] = await Promise.all([
      prisma.asset.findMany({
        where: {
          collectionId: id,
        },
      }),
      prisma.assetsCollection.findUnique({
        where: {
          id: id,
        },
        select: {
          collectionImageUrl: true,
          name: true,
          description: true,
        },
      }),
    ]);

    if (!nftAssets) {
      return {
        success: false,
        message: "No Nft Asset found for this collection",
      };
    }

    return {
      success: true,
      message: "Nft Found",
      Nfts: nftAssets,
      collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error while finding the assets ${error}`,
    };
  }
}
