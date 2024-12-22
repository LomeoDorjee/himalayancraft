import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css"
import NextTopLoader from 'nextjs-toploader';

import Footer from "@/components/shared/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/shared/Navbar";
import { PreNavBar } from "@/components/shared/PreNavBar";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/"),
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
    url: process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/",
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
            <NextTopLoader
              color="#76660c"
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
