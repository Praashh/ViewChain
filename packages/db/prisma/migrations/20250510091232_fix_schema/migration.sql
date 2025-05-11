-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "AssetView" DROP CONSTRAINT "AssetView_assetId_fkey";

-- DropForeignKey
ALTER TABLE "AssetView" DROP CONSTRAINT "AssetView_userId_fkey";

-- DropForeignKey
ALTER TABLE "AssetsCollection" DROP CONSTRAINT "AssetsCollection_userId_fkey";

-- DropForeignKey
ALTER TABLE "ViewProof" DROP CONSTRAINT "ViewProof_assetId_fkey";

-- AddForeignKey
ALTER TABLE "AssetsCollection" ADD CONSTRAINT "AssetsCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "AssetsCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetView" ADD CONSTRAINT "AssetView_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetView" ADD CONSTRAINT "AssetView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewProof" ADD CONSTRAINT "ViewProof_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
