"use client";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Logo } from "../svgs/logo";
import { Layout, TrendUp, ChartBar, FolderOpen } from "@phosphor-icons/react";

const data = {
  navMain: [
    {
      title: "MarketPlace",
      url: "/marketplace",
      icon: Layout,
    },
    {
      title: "Trend",
      url: "/marketplace/trend",
      icon: TrendUp,
    },
    {
      title: "Analytics",
      url: "/marketplace/analytics",
      icon: ChartBar,
    },
    {
      title: "Collection",
      url: "/marketplace/create-collection",
      icon: FolderOpen,
    },
  ],
};
export interface TSessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useSession();
  const [user, setUser] = useState<TSessionUser>();

  useEffect(() => {
    setUser(userData?.user);
  }, []);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex group-data-[collapsible=icon]:p-1! hover:bg-transparent hover:text-foreground  border-white p-0 items-center ">
              <Link href="#" className="flex items-center gap-2">
                <Logo className="size-6" />
                <span className="text-base font-normal">ViewChain</span>
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
  );
}
