import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css"
import NextTopLoader from 'nextjs-toploader';

import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./shared/Sidebar";
import AdminNavbar from "./shared/AdminNavbar";

import { Toaster } from 'react-hot-toast';

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/"),
    title: {
        default: "Craft Nepal - Manage",
        template: "%s"
    },
    description: "Manage Your Shop",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                // baseTheme: "dark"
            }}
        >
            <html lang="en">
                <body className={`${inter.className} h-screen`}>
                    <NextTopLoader
                        color="#2299DD"
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        showSpinner={true}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                        template='<div class="bar" role="bar"><div class="peg"></div></div> 
                        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                        zIndex={1600}
                        showAtBottom={false}
                    />
                    <Toaster position="bottom-center" />
                    <SidebarProvider>
                        <AdminSidebar />
                        <section className="w-full">
                            <AdminNavbar />
                            <div className="mx-2 py-2 md:ml-1 shadow-sm border rounded-lg border-gray-200 min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-5.3rem)]">
                                {children}
                            </div>
                        </section>
                    </SidebarProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
