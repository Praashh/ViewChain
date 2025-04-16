"use client"
import {
  BarChartIcon,
  FolderIcon,
  LayoutDashboardIcon,
  TrendingUp,
  View,
} from "lucide-react"

import { NavMain } from "@/components/ui/nav-main"
import { NavSecondary } from "@/components/ui/nav-secondary"
import { NavUser } from "@/components/ui/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const data = {
  navMain: [
    {
      title: "MarketPace",
      url: "/marketplace",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Trend",
      url: "/marketplace/trend",
      icon: TrendingUp,
    },
    {
      title: "Analytics",
      url: "/marketplace/analytics",
      icon: BarChartIcon,
    },
    {
      title: "Collection",
      url: "/marketplace/create-collection",
      icon: FolderIcon,
    }
  ],
}
export interface TSessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: userData}  =  useSession();
  const [user, setUser] = useState<TSessionUser>();

  useEffect(()=>{
    setUser(userData?.user)
  }, [])
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <View className="h-5 w-5" />
                <span className="text-base font-semibold">ViewChain</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as TSessionUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
