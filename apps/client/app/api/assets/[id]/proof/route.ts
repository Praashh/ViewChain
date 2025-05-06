"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * GET endpoint to retrieve proofs for an asset
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assetId = id;

    // Fetch the asset and validate it exists
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const proofs = await prisma.viewProof.findMany({
      where: { assetId },
      orderBy: { timestamp: 'desc' },
      take: 10, 
    });

    return NextResponse.json({
      success: true,
      proofs,
    });
  } catch (error) {
    console.error("Error fetching proofs:", error);
    return NextResponse.json(
      { error: "Failed to fetch proofs" },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint to save a new proof for an asset
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const assetId = id;
    
    const session = await getServerSession(authOptions);
    
    // Check if the user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    
    // Get the request body
    const body = await request.json();
    const { viewCount, proof } = body;
    
    if (!viewCount || !proof) {
      return NextResponse.json(
        { error: "Missing required fields: viewCount and proof" },
        { status: 400 }
      );
    }
    
    // Verify the asset exists
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
    });
    
    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }
    
    // Save the proof to the database
    const savedProof = await prisma.viewProof.create({
      data: {
        assetId,
        viewCount,
        proof,
        timestamp: new Date(),
      },
    });
    
    return NextResponse.json({
      success: true,
      proofId: savedProof.id,
    });
  } catch (error) {
    console.error("Error saving proof:", error);
    return NextResponse.json(
      { error: "Failed to save proof" },
      { status: 500 }
    );
  }
} 