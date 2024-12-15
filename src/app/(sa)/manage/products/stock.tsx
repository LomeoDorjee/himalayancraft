"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { upsertInventory } from "@/lib/actions/admin.action"
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

import toast from "react-hot-toast"
import { InventoryValidation } from "../validation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


type Props = {
    selected: TY_Inventory | null
    setOpen: Dispatch<SetStateAction<boolean>>
    products: TY_Product[]
}

export function InventoryForm({ selected, setOpen, products }: Props) {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof InventoryValidation>>({
        resolver: zodResolver(InventoryValidation),
        defaultValues: {
            stock: "0",
            productid: "0",
            sku: "",
        },
    })

    useEffect(() => {
        form.reset({
            stock: selected?.stock ? selected?.stock.toString() : "0",
            productid: selected?.productid ? selected?.productid.toString() : "0",
            sku: selected?.sku ?? "",
        });
    }, [form, selected])

    // Submit Form
    async function onSubmit(values: z.infer<typeof InventoryValidation>) {
        setLoading(true)

        const response = await upsertInventory(values)
        if (response?.status != "success") {
            toast.error(response?.status)
            setLoading(false)
            return
        }

        toast.success(response?.status)
        setLoading(false)
        setOpen(false)

    }

    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle className="text-center">Stock | Inventory</DrawerTitle>
                <DrawerDescription className="text-center">Manage the stock and Inventory of Products</DrawerDescription>
            </DrawerHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-xl mx-auto px-4"
                >
                    <div className="gap-2 grid grid-cols-1 md:grid-cols-2 py-3">
                        <FormField
                            control={form.control}
                            name="productid"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value + ""}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">Default</SelectItem>
                                            {
                                                (products.length > 0) ? products.map((product) => (
                                                    <SelectItem value={product.id + ""} key={product.id}>{product.name}</SelectItem>
                                                )) : (<></>)
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        This is the Product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="number" placeholder="Stock" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the product&apos;s Stock!
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="SKU" {...field} defaultValue={`SKU`} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the SKU of the product
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <DrawerFooter>
                        <Button type="submit" disabled={loading} >
                            {loading ?
                                (
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                    </span>
                                ) : ""}
                            Submit
                        </Button>
                    </DrawerFooter>
                </form>
            </Form>
        </DrawerContent>
    )
}