import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css"

import Footer from "@/components/shared/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/shared/Navbar";
import { PreNavBar } from "@/components/shared/PreNavBar";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"),
  title: {
    default: "Craft Nepal - Artistry from the Himalayas",
    template: "%s | Craft Nepal - Artistry from the Himalayas"
  },
  description: "Shop for products with artistry from the Himalayas",
  openGraph: {
    title: "Craft Nepal - Artistry from the Himalayas",
    description: "Shop for products with artistry from the Himalayas",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/",
    siteName: "Craft Nepal"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        // baseTheme: dark
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <Toaster />
            <PreNavBar />
            <Navbar />
            <section className="min-h-[calc(100vh-540px)] bg-gray-100">
              {children}
            </section>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
