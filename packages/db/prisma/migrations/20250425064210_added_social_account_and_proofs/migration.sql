/*
  Warnings:

  - Added the required column `proof` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialAccount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "proof" JSONB NOT NULL,
ADD COLUMN     "socialAccount" TEXT NOT NULL;
