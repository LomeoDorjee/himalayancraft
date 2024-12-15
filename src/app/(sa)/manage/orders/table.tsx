"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { currencyFormat } from "@/lib/utils"
import { format } from "timeago.js"

const PRODUCT_PER_PAGE = 10

type TableProps = {
    searchParams: any
    data: TY_OrderDetails[]
}

export function DataTable({ searchParams, data }: TableProps) {
    const orderId = searchParams?.orderId ? searchParams.orderId : 0
    const refresh = searchParams?.refresh ? searchParams.refresh : false

    return (
        <div className="flex flex-col md:flex-row gap-3 rounded-sm my-4">
            {data.length > 0 ? data.map((order, index) => (
                <Link
                    className="flex md:w-fit rounded-sm p-4 border flex-col gap-4 showdow-md hover:shadow-xl"
                    key={index}
                    href={`/manage/orders?orderId=${order.id}${order.id == orderId ? "&refresh=" + (refresh ? true : false) : ""}`}
                >
                    <div className="flex justify-between items-start flex-row gap-4">
                        <div className="flex flex-col">
                            <h1>{order.customer_name}</h1>
                            <span className="text-xs text-slate-400">
                                {order.customer_email} | {order.customer_phone}
                            </span>
                        </div>
                        <span className="p-1 rounded-sm border-b-2 border-lama">{order.id}</span>
                    </div>
                    <hr />
                    <span className="text-lg">
                        <span className="text-xs text-gray-500">
                            Amount: &nbsp;
                        </span>
                        <span className="text-2xl">
                            {currencyFormat(order.total_amount)}
                        </span>
                    </span>

                    {order.date_time && (
                        <span className="text-lg">
                            <span className="text-xs text-gray-500">
                                Ordered: &nbsp;
                            </span>
                            {format(order.date_time)}
                        </span>
                    )}
                    <span className="text-lg">
                        <span className="text-xs text-gray-500">
                            Address: &nbsp;
                        </span>
                        {order.shipping_address}
                    </span>

                    <span className="rounded-full border text-center border-lama px-3 p-1">{order.status}</span>
                </Link>
            )) : (
                <>
                    <div className="flex flex-col gap-4 items-center text-center h-32 w-full">
                        <h1>No Orders Yet!</h1>
                    </div>
                </>
            )}

        </div>
    )
}
