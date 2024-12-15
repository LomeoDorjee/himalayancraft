"use client"

import { useCart } from "@/context/CartContext";
import { currencyFormat } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TotalCart() {

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
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

            <div className="space-y-4">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">${(total * 0.87).toFixed(2)}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                        <dd className="text-base font-medium text-green-600">-{currencyFormat(discount)}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax (13%)</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">${(total * 0.13).toFixed(2)}</dd>
                    </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-semibold text-gray-900 dark:text-white">Total</dt>
                    <dd className="font-semibold text-xl text-gray-900 dark:text-white">{currencyFormat(parseFloat(total.toFixed(2)))}</dd>
                </dl>
            </div>

            <Link href="/order-confirm" className={`flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${state.items.length == 0 && 'pointer-events-none'}`}>Proceed</Link>

            <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}
