/*
  Warnings:

  - You are about to drop the column `assetId` on the `AssetsCollection` table. All the data in the column will be lost.
  - Added the required column `collectionId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssetsCollection" DROP CONSTRAINT "AssetsCollection_assetId_fkey";

-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "collectionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AssetsCollection" DROP COLUMN "assetId";

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "AssetsCollection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
