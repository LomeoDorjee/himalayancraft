
import Breadcrumbs from "@/components/Breadcrumbs";
import { getOrderByUser } from "@/lib/actions/product.actions";
import Link from "next/link";
import { format } from "timeago.js";
import type { Metadata } from "next";
import { currencyFormat } from "@/lib/utils";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import RequestButton from "@/components/RequestButton";


export const metadata: Metadata = {
    title: {
        absolute: "My Orders"
    },
    description: "View all Orders",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"),
};


const MyOrders = async () => {

    const data: {
        data: TY_OrderDetails[],
        status: string
    } = await getOrderByUser();

    if (data.status) console.log(data.status)

    return (
        <div className="px-4 py-2 lg:px-6 xl:px-32 2xl:px-64">
            <Breadcrumbs />
            <div className="w-full">
                <h1 className="text-2xl">My Orders</h1>
                <div className="my-5 flex flex-col bg-white p-2 rounded-lg">
                    <Table>
                        <TableCaption>A list of your recent orders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead className="max-sm:hidden">Receiver</TableHead>
                                <TableHead className="max-sm:hidden">Time</TableHead>
                                <TableHead className="max-sm:hidden">Address</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.length > 0 ? data.data.map((order, index) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/my-orders/${order.id}`}>
                                            {index + 1}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-medium flex-col max-sm:hidden">
                                        <Link href={`/my-orders/${order.id}`}>
                                            <h2>{order.customer_name}</h2>
                                            <span className="text-xs text-slate-400">{order.customer_email} | {order.customer_phone}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="max-sm:hidden">
                                        {order.date_time && (
                                            <span>{format(order.date_time)}</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-sm:hidden">
                                        <span>{order.shipping_address}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/my-orders/${order.id}`}>
                                            <span className="rounded-full bg-green-600 px-3 py-1">{order.status}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {currencyFormat(order.total_amount)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <RequestButton orderid={order.id} />
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell className="font-medium" colSpan={7}>
                                        <div className="flex flex-col gap-4 items-center text-center h-32 w-full">
                                            <h1>No Orders Yet!</h1>
                                            <Link href={'/'} className="bg-lama rounded hover:bg-white p-2">Continue Shopping</Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        {/* <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter> */}
                    </Table>

                </div>
            </div>
        </div>
    );
};

export default MyOrders;
