"use client"

import { Input } from "@/components/ui/input"
import { ChangeEvent, useEffect, useState } from "react"
import { changeOrderStatus, getOrderDetails, updateTrackingNo } from "@/lib/actions/admin.action"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import toast from "react-hot-toast"
import Link from "next/link"
import Image from "next/image"
import { currencyFormat } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    orderId: number
    refresh: boolean
}

export function InputForm({ orderId, refresh }: Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<TY_OrderAllDetails[]>([]);

    const [inputValue, setInputValue] = useState(""); // Input field value
    const [debouncedValue, setDebouncedValue] = useState(""); // Value after debounce

    useEffect(() => {
        if (orderId == 0) return
        getOrderDetail()
    }, [orderId, refresh])


    async function getOrderDetail() {

        const { data } = await getOrderDetails(orderId)

        setDetails(data)

        setOpen(true)

        return

    }


    // Update Tracking
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedValue != "") updateTracking(debouncedValue)
    }, [debouncedValue, updateTracking])

    async function updateTracking(no: string) {
        setLoading(true)

        const response: {
            status: string
        } = await updateTrackingNo(orderId, no)

        if (response.status != "") {
            toast.error(response.status)
            setLoading(false)
        }

        toast.success("")
        setLoading(false)
    }


    const handleTrackingChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleStatusChange = async (status: string) => {
        setLoading(true)

        const response: {
            status: string
        } = await changeOrderStatus(orderId, status)

        if (response.status != "") {
            toast.error(response.status)
            setLoading(false)
        }

        toast.success("Status Updated")
        setLoading(false)

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-lg md:max-w-4xl bg-white/90 min-h-full md:min-h-fit">
                <DialogHeader>
                    <DialogTitle>Update Order</DialogTitle>
                    <DialogDescription>
                        Create | Make changes to the order here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-between">
                    <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] p-4 rounded-lg bg-white">
                        <h1 className="text-lg pb-2">Order Details</h1>
                        <hr />
                        <div className="mt-4 flex flex-col gap-4 w-full justify-between ">

                            <div className="">
                                <span className="font-medium text-md text-gray-500 block text-xs">Receiver Name: </span>
                                <span>
                                    {details[0]?.customer_name}
                                </span>
                            </div>
                            <div className="">
                                <span className="font-medium text-md text-gray-500 block text-xs">Contact: </span>
                                <Link href={`mailto:${details[0]?.customer_email ? "mailto:" + details[0].customer_email : ""}`} className="block text-blue-600">{details[0]?.customer_email}</Link>
                                <Link href={details[0]?.customer_phone ? "tel:" + details[0].customer_phone : ""} className="block text-yellow-600">{details[0]?.customer_phone}</Link>
                            </div>
                            <div className="">
                                <span className="font-medium text-md text-gray-500 block text-xs">Price: </span>
                                <span>{currencyFormat(details[0]?.total_amount)}</span>
                            </div>
                            <div className="">
                                <span className="font-medium text-md text-gray-500 block text-xs">Payment Status: </span>
                                <div>
                                    {
                                        details[0]?.status && details[0].status in ["PAYMENT_COMPLETED", "OUT_FOR_DELIVERY", "DELIVERED"] ? "COMPLETED" : "PENDING"
                                    }
                                </div>
                            </div>
                            <div className="">
                                <span className="font-medium text-md text-gray-500 block text-xs">Order Status: </span>
                                <div>
                                    <Select onValueChange={(e) => handleStatusChange(e)} disabled={loading}>
                                        <SelectTrigger className="full">
                                            <SelectValue placeholder={details[0]?.status?.replaceAll("_", "")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Change Status</SelectLabel>
                                                <SelectItem value="ORDER_PLACED">ORDER PLACED</SelectItem>
                                                <SelectItem value="CANCELLED">ORDER CANCELLED</SelectItem>
                                                <SelectItem value="CONFIRMED">ORDER RECEIVED</SelectItem>
                                                <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                                                <SelectItem value="PAYMENT_PENDING">PAYMENT PENDING</SelectItem>
                                                <SelectItem value="PAYMENT_COMPLETED">PAYMENT COMPLETED</SelectItem>
                                                <SelectItem value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</SelectItem>
                                                <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                                <SelectItem value="BLOCKED">ORDER BLOCKED</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="">
                                <span className="font-medium text-md text-gray-500 block text-xs">Tracking: </span>
                                <Input
                                    type="text"
                                    placeholder={details[0]?.tracking_no ? details[0].tracking_no : undefined}
                                    onChange={handleTrackingChange}
                                    value={inputValue}
                                />
                            </div>
                            <div className="">
                                <span className="font-medium text-md text-gray-500 block text-xs">Shipping Address: </span>
                                <span>
                                    {details[0]?.shipping_address + " "}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg rounded-lg p-4 md:col-span-2 bg-white">
                        <h3 className="text-lg pb-2">Products</h3>
                        <hr />
                        <div className="flex flex-wrap gap-4 py-4">
                            {
                                details.map((item, index) => (
                                    <Link href={`/product/${item.productslug}`} target="_blank" className="flex gap-4 border border-gray-300 px-3 py-4 w-full rounded-lg shadow-md" key={index}>
                                        {item.productbanner && (
                                            <Image
                                                src={item.productbanner}
                                                alt=""
                                                width={50}
                                                height={50}
                                                className="object-cover rounded-md"
                                            />
                                        )}
                                        <div className="flex flex-col justify-start w-full gap-3">

                                            {/* TOP */}
                                            <div className="">

                                                {/* TITLE */}
                                                <div className="flex items-start justify-start gap-8">
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
            </DialogContent>
        </Dialog>

    )
}