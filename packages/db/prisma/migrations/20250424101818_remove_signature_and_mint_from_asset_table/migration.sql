/*
  Warnings:

  - You are about to drop the column `mint` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `Asset` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Asset_mint_key";

-- DropIndex
DROP INDEX "Asset_signature_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "mint",
DROP COLUMN "signature";
