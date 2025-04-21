/*
  Warnings:

  - Added the required column `collectionImageUrl` to the `AssetsCollection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssetsCollection" ADD COLUMN     "collectionImageUrl" TEXT NOT NULL;
