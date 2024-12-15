import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react"
import { LogoIcon } from "@/components/shared/Icons";
import { SidebarTrigger } from "@/components/ui/sidebar";


const AdminNavbar = async () => {

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky inset-0 top-0 z-40 py-2 max-h-20">
      <nav className="px-4 mx-2 md:ml-1 py-2 md:py-3 dark:bg-gray-800 shadow-md rounded-lg border border-gray-200">

        <div className="flex flex-wrap justify-between items-center mx-auto">
          <div className="flex gap-1 justify-start">

            <SidebarTrigger className="block md:hidden mr-2" />

            <Link href="/" className="flex items-center">
              <LogoIcon />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </Link>
          </div>


          <div className="flex flex-grow items-center justify-end md:gap-4 gap-2">

            <div className="flex md:gap-4 gap-2">

              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <LogInIcon className="cursor-pointer hover:scale-105 ease-in-out duration-500 " />
                </SignInButton>
              </SignedOut>

            </div>

          </div>

        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
