"use client"

import { TableOfContents, X } from "lucide-react";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { usePathname } from "next/navigation";

const MobileMenu = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const pathname = usePathname()

  return (
    <div className="inline-flex items-center p-2 mr-1 text-sm text-gray-500 rounded-lg lg:hidden dark:text-gray-400">
      <Drawer direction="left" open={isDrawerOpen} onOpenChange={setIsDrawerOpen} dismissible>
        <DrawerTrigger><TableOfContents className="rotate-180" /></DrawerTrigger>
        <DrawerContent className="fixed inset-0 z-50 flex flex-col mt-16 bg-white">
          <DrawerHeader>
            <DrawerTitle className="flex flex-col flex-wrap gap-12 mt-5">
              <SignedIn>
                <Link
                  href="/my-orders"
                  className={`${pathname == "/my-orders" ? "text-primary-800" : ""}`}
                  onClick={e => setIsDrawerOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/my-cart"
                  className={`${pathname == "/my-cart" ? "text-primary-800" : ""}`}
                  onClick={e => setIsDrawerOpen(false)}
                >
                  Cart
                </Link>
                <Link
                  href="/my-reviews"
                  className={`${pathname == "/my-reviews" ? "text-primary-800" : ""}`}
                  onClick={e => setIsDrawerOpen(false)}
                >
                  Reviews
                </Link>
              </SignedIn>
              <Link
                href="/about-us"
                className={`${pathname == "/about-us" ? "text-primary-800" : ""}`}
                onClick={e => setIsDrawerOpen(false)}
              >
                About us
              </Link>
              <Link
                href="/contact-us"
                className={`${pathname == "/contact-us" ? "text-primary-800" : ""}`}
                onClick={e => setIsDrawerOpen(false)}
              >
                Contact us
              </Link>
              <Link
                href="/privacy"
                className={`${pathname == "/privacy" ? "text-primary-800" : ""}`}
                onClick={e => setIsDrawerOpen(false)}
              >
                Privacy
              </Link>
              <SignedIn>
                <SignOutButton>Log out</SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton>Login</SignInButton>
              </SignedOut>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <X />
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
