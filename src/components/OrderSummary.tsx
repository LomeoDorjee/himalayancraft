"use client"
import { useCart } from "@/context/CartContext";
import { currencyFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function OrderSummary() {

    const { state } = useCart();

    const calculateTotal = (items: TY_CartItem[]): number => {
        return items.reduce((total, item) => total + ((parseFloat(item.price) - parseFloat(item.discount)) * item.quantity), 0);
    };

    const calculateDiscount = (items: TY_CartItem[]): number => {
        return items.reduce((total_discount, item) => total_discount + (parseFloat(item.discount) * item.quantity), 0);
    };

    const total = calculateTotal(state.items);

    const discount = calculateDiscount(state.items);

    return (
        <div className="">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                    {state.items.map((product) => (
                        <li key={product.productid} className="flex py-6 px-4 sm:px-6">
                            <div className="flex-shrink-0">
                                <Image
                                    src={product.banner}
                                    alt={"2" + product.productid}
                                    className="w-20 rounded-md"
                                    height={100}
                                    width={100}
                                />
                            </div>

                            <div className="ml-6 flex-1 flex flex-col">
                                <div className="flex">
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm">
                                            <Link href={`/product/${product.slug}`} className="font-medium text-gray-700 hover:text-gray-800 text-xl line-clamp-2">
                                                {product.name}
                                            </Link>
                                        </h4>
                                    </div>

                                </div>

                                <div className="flex-1 pt-2 flex items-end justify-between">
                                    <p className="mt-1 text-sm font-medium text-gray-900">{currencyFormat(product.price)}</p>

                                    <div className="ml-4">
                                        <label className="quantity text-sm text-gray-500" >
                                            QTY
                                        </label>
                                        &nbsp; * &nbsp;
                                        <label
                                            className="rounded-full shadow-xl font-medium text-gray-700 text-left border-lama p-2 text-lg"
                                        >
                                            {product.quantity}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">{currencyFormat(total * 0.87)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Discount</dt>
                        <dd className="text-sm font-medium text-gray-900">{currencyFormat(discount)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Shipping</dt>
                        <dd className="text-sm font-medium text-gray-900">TBD</dd>
                    </div>
                    <div className="flex items-center justify-between">
                        <dt className="text-sm">Taxes</dt>
                        <dd className="text-sm font-medium text-gray-900">{currencyFormat(total * 0.13)}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">{currencyFormat(total)}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}