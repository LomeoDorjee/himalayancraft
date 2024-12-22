"use client";

import { useState } from "react";
import { useCart, useCartActions } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { LogIn } from "lucide-react";

interface AddToCartProps {
  productId: number,
  productName: string,
  productBanner: string,
  productCategories: string,
  // variant: string
  stockNumber: number
  price: string
  discount: string
  slug: string
}

const Add = ({
  productId,
  productName,
  productBanner,
  productCategories,
  // variant,
  stockNumber,
  price,
  discount,
  slug
}: AddToCartProps) => {

  const [quantity, setQuantity] = useState(1)

  const { user } = useUser()

  const { addItemToCart, updateItemInCart } = useCartActions()

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const { state } = useCart();

  const mainItem: TY_CartItem = {
    productid: productId,
    name: productName,
    banner: productBanner,
    categories: productCategories,
    quantity: quantity,
    price: parseFloat(price),
    discount: parseFloat(discount),
    slug: slug
  }

  const addToCart = () => {
    if (!user?.id) {
      toast({
        title: "Error: Not Signed-In!",
        description: "Please Login to Continue.",
        variant: "destructive",
        action: <Link href={`/sign-in`} className="bg-blue-600 cursor-pointer p-2 rounded-lg text-nowrap flex flex-row gap-2"><LogIn />Sign-In</Link>
      })
      return
    }

    const existingProduct = state.items.find(item => item.productid === mainItem.productid);
    if (existingProduct?.quantity) {
      const newItem: TY_CartItem = { ...mainItem, quantity: (mainItem.quantity + existingProduct?.quantity) }
      updateItemInCart(newItem)
    } else {
      addItemToCart(mainItem)
    }

    toast({
      title: "Item Add to Cart!",
      action: <Link href={`/my-cart`} className="bg-lama cursor-pointer p-2 rounded-lg text-nowrap flex flex-row gap-2">Go to Cart</Link>
    })
  }


  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-1 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              {
                stockNumber > 10 ? (
                  <div>
                    <span className="text-green-500">{stockNumber} items</span>{" "}
                    available
                  </div>
                ) : (
                  <div>
                    Only <span className="text-orange-500">{stockNumber} items</span>{" "}
                    left!
                    <br /> {"Don't"} miss it
                  </div>
                )
              }

            </div>
          )}
        </div>
        <button
          onClick={() => addToCart()}
          disabled={state.isLoading}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
