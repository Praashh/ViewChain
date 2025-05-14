'use client'
import { getAssetViews, getAssetViewsByDate } from '@/actions/getAssetViews'
import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive'
import { SectionCards } from '@/components/ui/section-cards'
import React, { useEffect, useState } from 'react'

const page =  () => {
  const [views, setViews] = useState<number>(0)
  const [viewsByDate, setViewsByDate] = useState<{ timestamp: string; views: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const views = await getAssetViews()
      const viewsByDate = await getAssetViewsByDate()
      setViews(views.totalViews!)
      if (!('error' in viewsByDate)) {
        const viewsByDateMap = viewsByDate.reduce((acc, view) => {
          const date = view.timestamp.toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        setViewsByDate(Object.entries(viewsByDateMap).map(([timestamp, views]) => ({
          timestamp,
          views
        })));
      }
    }
    fetchData()
  }, [])
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-r from-blue-500 to-blue-200 bg-clip-text">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards views={views} viewsByDate={viewsByDate} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-white text-2xl font-bold">Coming Soon :{")"}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page