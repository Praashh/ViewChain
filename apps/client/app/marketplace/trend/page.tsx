"use client"
import { getTrendAssets } from '@/actions/getTrendAssets'
import { Eye, Loader2, Share2,  TrendingUpIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link"
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
interface TrendAsset {
  symbol: string;
  id: string;
  name: string;
  description: string;
  imageurl: string;
  assetUrl: string;
  assetType: string;
  metadata: string;
  analytics: any;
  collectionId: string;
  assetsCollection: {
    id: string;
    name: string;
    imageurl: string;
    underdogProjectId: number;
  }
}
const page = () => {
  const [trendAssets, setTrendAssets] = useState<TrendAsset[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTrendAssets = async () => {
      setLoading(true)
      const response = await getTrendAssets()
      if (response.success && response.assets) {
        setTrendAssets(response.assets.map(asset => ({
          ...asset,
          assetsCollection: {
            id: asset.AssetsCollection.id,
            name: asset.AssetsCollection.name,
            imageurl: asset.AssetsCollection.collectionImageUrl || '',
            underdogProjectId: asset.AssetsCollection.underdogProjectId
          }
        })))
      } else {
        console.error(response.error)
      }
      setLoading(false)
    }
    fetchTrendAssets()
  }, [])

  const handleShare = (asset: TrendAsset) => {
    const url = `${window.location.origin}/marketplace/create-collection/${asset.collectionId}?projectId=${asset.assetsCollection.underdogProjectId}`
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard')
  }
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-r from-blue-500 to-blue-200 bg-clip-text px-4">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className='flex items-center gap-2'>
          <TrendingUpIcon className="size-4" />
          <h1 className="text-2xl font-bold">Trending Assets</h1>
        </div>
          {
            !loading ?           <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trendAssets?.map((asset) => (
              <Card key={asset.id}>
  <CardHeader>
    <Image
      src={asset.imageurl}
      alt={asset.name}
      width={100}
      height={100}
      className="rounded-md object-cover w-full h-full"
    />
    <CardTitle className="text-lg font-bold mt-2">{asset.name}</CardTitle>
    <CardDescription>{asset.description}</CardDescription>
  </CardHeader>

  <CardContent className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Eye size={18} />
      <p>{asset.analytics.views}</p>
    </div>

    <Button variant="outline" onClick={() => handleShare(asset)}>
      <Share2 size={18} />
      <p>Share</p>
    </Button>
  </CardContent>

  <CardFooter>
    <Link
      href={`/marketplace/create-collection/${asset.collectionId}?projectId=${asset.assetsCollection.underdogProjectId}`}
      target="_blank"
      className="w-full"
    >
      <Button variant="outline" className="w-full">
        View
      </Button>
    </Link>
  </CardFooter>
</Card>

            ))}
         </div> : <div className='flex justify-center items-center'>
          <Loader2 className='size-10 animate-spin' />
         </div>
          }
      </div>
    </div>
  </div>
  )
}

export default page