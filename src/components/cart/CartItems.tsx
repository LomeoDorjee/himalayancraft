"use client"

import RemoveItem from './RemoveItem'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import EditCart from './EditCart'

export default function CartItems() {

    const { state } = useCart()

    return (
        <>
            <div className="space-y-6">
                {
                    state.items.length > 0 ? state.items.map(item => (
                        <div key={item.productid} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-4 md:space-y-0">
                                <Link
                                    href={'/' + item.slug}
                                    className="shrink-0 md:order-1">
                                    <Image
                                        className="h-20 w-20"
                                        src={item.banner}
                                        alt="product-image"
                                        width={200}
                                        height={200}
                                    />
                                </Link>


                                <label className="sr-only">Choose quantity:</label>
                                <EditCart
                                    productid={item.productid}
                                    name={item.name}
                                    banner={item.banner}
                                    categories={item.categories}
                                    item_quantity={item.quantity}
                                    price={item.price.toString()}
                                    discount={item.discount.toString()}
                                    stock={item.stock}
                                    slug={item.slug}
                                />

                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                    <Link
                                        href={'/' + item.slug}
                                        className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                                    >
                                        {item.name}
                                    </Link>

                                    <div className="flex items-end gap-4">
                                        <RemoveItem item={JSON.stringify(item)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (<>Cart Empty</>)
                }
            </div>
        </>
    )
}
