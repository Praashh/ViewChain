// File: app/api/nft/create/route.ts
import { NextResponse } from "next/server";
import { uploadAssetToCloudinary } from "@/config/cloudinary";
import { prisma } from "@repo/db";
import { Underdog, uploadMediaOnIrys, uploadMetada } from '@repo/underdog';

interface TNftData {
    name: string;
    description: string;
    attributeName?: string;
    category: string;
    coverImageUrl?: string;
    coverImage?: string;
    symbol: string;
    extraAttributes?: any;
}
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        console.log(formData)

        const file = formData.get("coverImage") as File | null;
        if (!file) return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
        
        const assetFile = formData.get("asset") as File | null;
        if (!assetFile) return NextResponse.json({ success: false, message: "No asset file provided" }, { status: 400 });

        const paramsString = formData.get("params") as string | null;
        if (!paramsString) return NextResponse.json({ success: false, message: "No params provided" }, { status: 400 });
        
        const params: TNftData = JSON.parse(paramsString);
        const projectId = formData.get("projectId") as string;
        const userString = formData.get("user") as string | null;
        const collectionId = formData.get("collectionId") as string | null;
        if (!userString || !collectionId) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }
        
        const user = JSON.parse(userString);
        const publicKey = user.publicKey;
        const socialHandle = user.socialHandle;

        const UClient = new Underdog(process.env.UNDERDOG_API_KEY as string);
        
        const coverImageUploadResult = await uploadAssetToCloudinary(file);
        
        if (!coverImageUploadResult.success || !coverImageUploadResult.result) {
            return NextResponse.json(
                { success: false, message: coverImageUploadResult.message || "Failed to upload cover image" },
                { status: 500 }
            );
        }

        const imageAsset = await uploadMediaOnIrys(formData);
        if (!imageAsset) {
            return NextResponse.json(
                { success: false, message: "Failed to upload asset to Irys" },
                { status: 500 }
            );
        }

        const metadata = await uploadMetada({
            name: params.name,
            description: params.description,
            symbol: params.symbol,
            image: coverImageUploadResult.result.secure_url,
            attributes: [{
                views: 0,
                asset_url: imageAsset,
                category: params.category
            }],
            properties: {
                files: [{
                    type: assetFile.type,
                    uri: imageAsset
                }]
            },
            creators: [{
                address: publicKey,
                creator: socialHandle
            }]
        });

        if (!metadata) {
            return NextResponse.json(
                { success: false, message: "Failed to upload metadata" },
                { status: 500 }
            );
        }

        const newNft = await prisma.asset.create({
            data: {
                name: params.name,
                description: params.description, 
                imageurl: coverImageUploadResult.result.secure_url,
                assetUrl: imageAsset,
                metadata: metadata[0],
                symbol: params.symbol,
                assetType: assetFile.type,
                collectionId,
                analytics: {
                    views: 0,
                    creator: socialHandle,
                    publicKey: publicKey
                }
            }
        });

        if (!newNft) {
            return NextResponse.json(
                { success: false, message: "Error while creating a new NFT" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "NFT created successfully", newNft },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating NFT:", error);
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
