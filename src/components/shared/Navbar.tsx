import Link from "next/link";
import SearchBar from "@/components/shared/SearchBar";
import { auth } from "@clerk/nextjs/server";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import MobileMenu from "./MobileMenu";

import { LogInIcon } from "lucide-react"
import { LogoIcon } from "./Icons";
import { getAllCategories } from "@/lib/actions/product.actions";
import NavIcons from "./NavIcons";

import Categories from "../../constants/categoriesConstant.js"

const Navbar = async () => {

  const { userId } = await auth();

  const categories: TY_Category[] = Categories

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-lg sticky inset-0 -top-1 z-40">
      <nav className="px-4 lg:px-6 xl:px-32 2xl:px-64 py-3 top-0 dark:bg-gray-800 shadow-md rounded-lg">

        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <div className="flex gap-1 justify-start">
            <MobileMenu />

            <Link href="/" className="flex items-center">
              <LogoIcon />
              <span className="ml-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </Link>
          </div>


          <div className="flex flex-grow items-center justify-end md:gap-4 gap-2">

            <SearchBar categories={categories} />

            <div className="flex md:gap-4 gap-2">

              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <LogInIcon className="cursor-pointer hover:scale-105 ease-in-out duration-500 " />
                </SignInButton>
              </SignedOut>

              <NavIcons isLoggedIn={(userId == null) ? false : true} />

            </div>

          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
