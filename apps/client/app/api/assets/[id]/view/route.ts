"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Define time limits for repeated views
const VIEW_COOLDOWN_PERIOD_MS = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

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
 * Helper function to get a fingerprint for the client
 * Uses user ID if logged in, IP address otherwise
 */
async function getClientFingerprint(req: NextRequest): Promise<string> {
  const session = await getServerSession(authOptions);
  
  // Use user ID if available
  if (session?.user?.id) {
    return `user_${session.user.id}`;
  }
  
  // Otherwise use IP address 
  const ip = (req as any).ip || req.headers.get('x-forwarded-for') || 'unknown';
  return `ip_${ip}`;
}

/**
 * POST endpoint to increment and record a view for an asset
 * Implements view deduplication and rate limiting
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const assetId = id;
    
    // Get user ID or IP for identification
    const clientFingerprint = await getClientFingerprint(req);
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // Find the asset
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Check if this client has viewed this asset recently
    const recentView = await prisma.assetView.findFirst({
      where: {
        assetId,
        fingerprint: clientFingerprint,
        timestamp: {
          // Only look for views within the cooldown period
          gte: new Date(Date.now() - VIEW_COOLDOWN_PERIOD_MS)
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    // Get current analytics
    const currentAnalytics = (asset.analytics as any) || { views: 0 };
    let updatedViews = currentAnalytics.views || 0;
    let viewRecorded = false;

    // Only increment the view count if this is a new view (not a duplicate)
    if (!recentView) {
      // Increment the view count
      updatedViews += 1;
      viewRecorded = true;

      // Update the asset's analytics
      await prisma.asset.update({
        where: { id: assetId },
        data: {
          analytics: {
            ...currentAnalytics,
            views: updatedViews,
          },
        },
      });

      // Create a record of this view
      await prisma.assetView.create({
        data: {
          assetId,
          userId,
          fingerprint: clientFingerprint,
          timestamp: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      views: updatedViews,
      viewRecorded, // Indicate if the view was actually counted or deduplicated
    });
  } catch (error) {
    console.error("Error recording view:", error);
    return NextResponse.json(
      { error: "Failed to record view" },
      { status: 500 }
    );
  }
}
