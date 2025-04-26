"use client"

import { DataTable, schema } from "@/components/ui/data-table"
import { useEffect, useState } from "react"
import { getAllCollections } from "@/actions/getAllCollections"
import { Skeleton } from "@/components/ui/skeleton"
import z from 'zod'

export default function CollectionsPage() {
  const [data, setData] = useState<z.infer<typeof schema>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCollections()
        setData(result.collections || [])
      } catch (error) {
        console.error("Failed to fetch collections:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-r from-blue-500 to-blue-200 bg-clip-text">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <DataTable data={data} />
      </div>
    </div>
  </div>
  )
}