import { NextResponse } from 'next/server';
import { Underdog } from '@repo/underdog';
import { uploadAssetToCloudinary } from '@/config/cloudinary';
import { prisma } from '@repo/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const collectionData = JSON.parse(formData.get('collectionData') as string);
    const file = formData.get('coverImage') as File | null;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const UClient = new Underdog(process.env.UNDERDOG_API_KEY as string);
    
    const uploadPromise = uploadAssetToCloudinary(file);
    
    const symbol = collectionData.name.slice(0, 1).toUpperCase();
    
    const uploadResult = await uploadPromise;
    if (!uploadResult.success || !uploadResult.result) {
      return NextResponse.json(
        { success: false, message: uploadResult.message },
        { status: 400 }
      );
    }
    
    const [underdogResult] = await Promise.all([
      UClient.createCollection({
        name: collectionData.name,
        symbol: symbol,
        description: collectionData.description,
        image: uploadResult.result.secure_url,
        semifungible: true,
        animationUrl: 'https://cdn.dribbble.com/userupload/23739582/file/original-7bb2ac9fca229bea8c4fe8b757a709c7.gif',
        externalUrl: 'https://view-chain.vercel.app/',
        attributes: { points: 10, name: collectionData.name },
        core: true,
        sellerFeeBasisPoints: 100
      })
    ]);

    if (!underdogResult.success) {
      return NextResponse.json(
        { success: false, message: "Error While Creating a NFT Collection" },
        { status: 400 }
      );
    }
    
    const newAssetCollection = await prisma.assetsCollection.create({
      data: {
        name: collectionData.name,
        description: collectionData.description,
        category: collectionData.category,
        userId,
        collectionImageUrl: uploadResult.result.secure_url,
        underdogProjectId: underdogResult.data?.projectId
      }
    });
    
    return NextResponse.json(
      { success: true, collection: newAssetCollection },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}