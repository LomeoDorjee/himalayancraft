
import { getOrderById } from "@/lib/actions/product.actions";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { currencyFormat } from "@/lib/utils";

export const metadata: Metadata = {
    title: {
        absolute: "My Orders"
    },
    description: "View My Orders",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"),
};


const OrderPage = async ({ params }: { params: { id: string } }) => {

    const id = params.id;
    if (!id) return

    const data: {
        data: TY_OrderAllDetails[],
        status: string
    } = await getOrderById(parseInt(id));

    if (data.status) return

    const order = data.data[0]

    return (
        <div className="px-4 py-2 lg:px-6 xl:px-32 2xl:px-64 ">
            <Breadcrumbs />
            <h1 className="text-xl widgettitle">Order Details</h1>
            <div className="flex flex-col items-start justify-start gap-4">

                <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] p-5 w-full rounded-lg">
                    <div className="mt-4 flex flex-col md:flex-row gap-6 w-full justify-between ">
                        {/* <div className="">
                            <span className="font-medium">Order Id: </span>
                            <span>{order.id}</span>
                        </div> */}
                        <div className="">
                            <span className="font-medium text-md text-gray-500 block">Receiver Name: </span>
                            <span>
                                {order?.customer_name}
                            </span>
                        </div>
                        <div className="">
                            <span className="font-medium text-md text-gray-500 block">Receiver Email: </span>
                            <span>{order?.customer_email}</span>
                        </div>
                        <div className="">
                            <span className="font-medium text-md text-gray-500 block">Price: </span>
                            <span>{currencyFormat(order?.total_amount)}</span>
                        </div>
                        <div className="">
                            <span className="font-medium text-md text-gray-500 block">Payment Status: </span>
                            <span>{"PENDING"}</span>
                        </div>
                        <div className="">
                            <span className="font-medium text-md text-gray-500 block">Order Status: </span>
                            <span>{order?.status}</span>
                        </div>
                        <div className="">
                            <span className="font-medium text-md text-gray-500 block">Shipping Address: </span>
                            <span>
                                {order?.shipping_address + " "}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] p-5 w-full rounded-lg">
                    <h3 className="text-lg">Products</h3>
                    <div className="flex flex-wrap gap-4">
                        {
                            data.data.map((item, index) => (
                                <Link href={`/product/${item.productslug}`} className="flex gap-4 border-b-2 border-gray-300 p-2 py-4 w-fit" key={index}>
                                    {item.productbanner && (
                                        <Image
                                            src={item.productbanner}
                                            alt=""
                                            width={50}
                                            height={50}
                                            className="object-cover rounded-md"
                                        />
                                    )}
                                    <div className="flex flex-col justify-end w-full gap-3">

                                        {/* TOP */}
                                        <div className="">

                                            {/* TITLE */}
                                            <div className="flex items-end justify-end gap-8">
                                                <h3 className="font-semibold">
                                                    {item.productname}
                                                </h3>
                                                <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                                                    {item.quantity && item.quantity > 1 && (
                                                        <div className="text-xs text-green-500">
                                                            {item.quantity} x{" "}
                                                        </div>
                                                    )}

                                                </div>
                                            </div>

                                        </div>

                                        {/* BOTTOM */}
                                        <div className="flex justify-between text-sm items-center">
                                            <span className="text-gray-500">Qty. {item.quantity}</span>
                                            <span className="text-lg font-semibold">{currencyFormat(item.price)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-2 gap-5 justify-between items-center">
                <Link href="/my-orders" className="p-2 m-2 border-b-2 border-gray-400">
                    Back to Orders
                </Link>
                <Link href="/" className="p-2 m-2 border-b-2 border-gray-400">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderPage;
