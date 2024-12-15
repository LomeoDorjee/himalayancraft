"use client"

import { useCart, useCartActions } from "@/context/CartContext";
import { currencyFormat } from "@/lib/utils";
import { useState } from "react";

type EditCartProps = {
    productid: number;
    name: string;
    banner: string;
    categories: string;
    item_quantity: number;
    price: string;
    discount: string;
    stock?: number;
    slug: string
}

export default function EditCart({
    productid,
    name,
    banner,
    categories,
    item_quantity,
    price,
    stock,
    discount,
    slug
}: EditCartProps) {

    const item: TY_CartItem = {
        productid: productid,
        name: name,
        banner: banner,
        categories: categories,
        quantity: item_quantity,
        price: parseFloat(price),
        stock: stock,
        discount: parseFloat(discount),
        slug: slug
    }

    const [quantity, setQuantity] = useState(item_quantity)

    const { updateItemInCart } = useCartActions()

    const { state } = useCart()

    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
            const mainItem: TY_CartItem = { ...item, quantity: (quantity - 1) }
            updateItemInCart(mainItem)
        }
        if (type === "i" && quantity < (item.stock || 0)) {
            setQuantity((prev) => prev + 1);
            const mainItem: TY_CartItem = { ...item, quantity: (quantity + 1) }
            updateItemInCart(mainItem)
        }
    };

    return (
        <div className="flex items-center justify-between md:order-3 md:justify-end gap-4">
            <div className="flex items-center">
                <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                    <button
                        className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                        onClick={() => handleQuantity("d")}
                        disabled={quantity === 1 || state.isLoading}
                    >
                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>
                    {quantity}
                    <button
                        className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
                        onClick={() => handleQuantity("i")}
                        disabled={quantity === (item.stock || item_quantity) || state.isLoading}
                    >
                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="text-end md:order-4 md:w-32">
                <p className="font-medium text-gray-900 dark:text-white text-xl">
                    <span className="text-xs text-slate-400 line-through">{currencyFormat(quantity * (item.price.toFixed(2)))}</span>
                    &nbsp;{currencyFormat(quantity * (item.price.toFixed(2) - item.discount.toFixed(2)))}
                </p>
            </div>
        </div>
    )
}
