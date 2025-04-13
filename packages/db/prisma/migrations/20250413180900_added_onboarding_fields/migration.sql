/*
  Warnings:

  - A unique constraint covering the columns `[socialHandle]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CreatorType" AS ENUM ('Youtuber', 'Musician', 'other');

-- CreateEnum
CREATE TYPE "ExperienceWithDigitalAssets" AS ENUM ('Beginner', 'Intermediate', 'Advance');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "experience" "ExperienceWithDigitalAssets" DEFAULT 'Beginner',
ADD COLUMN     "socialHandle" TEXT,
ADD COLUMN     "type" "CreatorType" DEFAULT 'Youtuber';

-- CreateIndex
CREATE UNIQUE INDEX "User_socialHandle_key" ON "User"("socialHandle");
