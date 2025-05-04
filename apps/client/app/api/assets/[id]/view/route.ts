"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * GET endpoint to retrieve the current view count for an asset
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Await the params to satisfy Next.js requirement
    const { id } = await Promise.resolve(params);
    const assetId = id;

    // Fetch the asset and its current view count
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Parse current analytics to get view count
    const analytics = (asset.analytics as any) || { views: 0 };

    return NextResponse.json({
      success: true,
      views: analytics.views || 0,
    });
  } catch (error) {
    console.error("Error fetching view count:", error);
    return NextResponse.json(
      { error: "Failed to fetch view count" },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint to increment and record a view for an asset
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const assetId = id;

    const session = await getServerSession(authOptions);
    const viewerId = session?.user?.id;


    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }


    const currentAnalytics = (asset.analytics as any) || { views: 0 };


    const updatedViews = (currentAnalytics.views || 0) + 1;


    const updatedAsset = await prisma.asset.update({
      where: { id: assetId },
      data: {
        analytics: {
          ...currentAnalytics,
          views: updatedViews,
        },
      },
    });

    if (viewerId) {
      await prisma.assetView.create({
        data: {
          assetId,
          userId: viewerId,
          timestamp: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      views: updatedViews,
    });
  } catch (error) {
    console.error("Error recording view:", error);
    return NextResponse.json(
      { error: "Failed to record view" },
      { status: 500 }
    );
  }
}
