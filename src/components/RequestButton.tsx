"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
import toast from "react-hot-toast"
import { requestCancel } from "@/lib/actions/product.actions"
import { X } from "lucide-react"

export default function RequestButton({ orderid }: { orderid: number }) {

    const [open, setOpen] = useState<boolean>(false)

    async function cancelOrder() {

        const response = await requestCancel(orderid)

        if (response?.status != "success") {
            toast.error(response?.status)
            return
        }

        toast.success(response?.status)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger><X className="text-red-300" /></PopoverTrigger>
            <PopoverContent>
                <form action={cancelOrder} className="flex gap-2 items-center justify-between">
                    <Label> Confirm Cancel? </Label>
                    <Button type="submit" variant={"outline"} className="bg-red-500 text-white">Yes</Button>
                    <Button type="button" variant={"outline"} className="bg-green-600 text-white" onClick={() => setOpen(false)}>No</Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}
