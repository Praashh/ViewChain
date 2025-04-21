/*
  Warnings:

  - You are about to drop the column `asseturl` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `description` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageurl` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "asseturl",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageurl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AssetsCollection" ALTER COLUMN "collectionImageUrl" DROP NOT NULL;
