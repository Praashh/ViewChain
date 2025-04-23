/*
  Warnings:

  - A unique constraint covering the columns `[mint]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[signature]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `analytics` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetUrl` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadata` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mint` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "analytics" JSONB NOT NULL,
ADD COLUMN     "assetUrl" TEXT NOT NULL,
ADD COLUMN     "metadata" TEXT NOT NULL,
ADD COLUMN     "mint" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_mint_key" ON "Asset"("mint");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_signature_key" ON "Asset"("signature");
