"use client";

import { PlusCircleIcon, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import CreateCollectionButton from "./create-collection-button";
import { Icon } from "@phosphor-icons/react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <CreateCollectionButton />
          </SidebarMenuItem>
        </SidebarMenu> */}
        <SidebarMenu className="mt-4">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem
                className="hover:bg-accent/70 rounded-md mb-2 hover:text-foreground"
                key={item.title}
                data-active={isActive}
              >
                <Link href={item.url}>
                  <SidebarMenuButton
                    className="group-data-[collapsible=icon]:p-1.5! hover:bg-transparent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:rounded-md hover:text-foreground rounded-xl"
                    tooltip={item.title}
                    data-active={isActive}
                  >
                    <div
                      className="flex items-center gap-2"
                      data-active={isActive}
                    >
                      {item.icon && <item.icon className="size-5" />}
                    </div>
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
