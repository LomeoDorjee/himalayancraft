"use client";

import CartModal from "@/components/cart/CartModal";
import { useCart } from "@/context/CartContext";
import { BagIcon } from "./Icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const NavIcons = ({ isLoggedIn }: {
  isLoggedIn: boolean
}) => {

  const { state } = useCart()

  if (!isLoggedIn) return

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Popover>
        <PopoverTrigger className="relative">
          <BagIcon />
          {
            state.items.length > 0 &&
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary-700 rounded-full text-white text-sm flex items-center justify-center">
              {state.items.length}
            </div>
          }
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <CartModal />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavIcons;
