import { queryNft } from "@/actions/NFT/queryNft";
import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/ui/nft-card";
import Link from "next/link";

import type { Metadata } from "next";

type PageProps = {
  handle: string;
  id: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PageProps>;
}): Promise<Metadata> {
  const { id } = await params;

  // Fetch data on the server
  const result = await queryNft(id);
  const { collection } = result;
  const imageUrl = collection?.collectionImageUrl as string;

  return {
    title: collection?.name,
    description: collection?.description,
    openGraph: {
      title: collection?.name,
      description: collection?.description,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: collection?.name,
      description: collection?.description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: { params: Promise<PageProps> }) {
  const { handle, id } = await params;
  const isGenericShare = handle === "collection";

  // Fetch data on the server
  const result = await queryNft(id);

  // Handle errors on the server side
  if (!result.success) {
    return (
      <>
        <div className="h-[20rem] flex items-center justify-center gap-4 flex-col w-full">
          <p>Something went wrong</p>
          <Button asChild>
            <Link href={"/marketplace"}>Go to Dashboard</Link>
          </Button>
        </div>
      </>
    );
  }

  const { Nfts: nfts, collection } = result;

  console.log(collection?.collectionImageUrl);

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-r">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent">
          {isGenericShare ? "Shared Collection" : `Collection by @${handle}`}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts && nfts.length > 0 ? (
            nfts?.map((nft: any) => <NFTCard key={nft.id} nft={nft} />)
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No NFTs found in this collection
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
