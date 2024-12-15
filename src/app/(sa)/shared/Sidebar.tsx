import { Barcode, ChevronDown, ChevronUp, FanIcon, Flower, GalleryHorizontal, GalleryVertical, Hammer, Home, HomeIcon, Layout, List, Mountain, Tag, User2 } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Product",
        url: "/manage/products",
        icon: Barcode,
    },
    {
        title: "Category",
        url: "/manage/categories",
        icon: Layout,
    },
    {
        title: "Tags",
        url: "/manage/tags",
        icon: Tag,
    },
    {
        title: "Orders",
        url: "/manage/orders",
        icon: Hammer,
    },
    {
        title: "Slider",
        url: "/manage/sliders",
        icon: GalleryVertical,
    },
]

export async function AdminSidebar() {

    const user = await currentUser()

    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Mountain /> {process.env.NEXT_PUBLIC_APP_NAME}
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                    <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Manage</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 />
                                    <SignedIn>
                                        {user?.fullName}
                                    </SignedIn>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    {user?.firstName} <UserButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <SignOutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />

        </Sidebar>
    )
}
