-- AlterTable
ALTER TABLE "User" ALTER COLUMN "proof" DROP NOT NULL,
ALTER COLUMN "socialAccount" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AssetView" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "userId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssetView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewProof" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL,
    "proof" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViewProof_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssetView" ADD CONSTRAINT "AssetView_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetView" ADD CONSTRAINT "AssetView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewProof" ADD CONSTRAINT "ViewProof_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
