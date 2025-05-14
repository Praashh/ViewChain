"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@repo/db"
import { getServerSession } from "next-auth"

export async function getAssetViews() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "Unauthorized" }
  }

  const views = await prisma.assetView.findMany({
    where: { userId: session.user.id }
  })

  return { totalViews: views.length }
}

export async function getAssetViewsByDate() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "Unauthorized" }
  }

  const views = await prisma.assetView.findMany({
    where: { userId: session.user.id },
    orderBy: { timestamp: "desc" }
  })

  return views
}   