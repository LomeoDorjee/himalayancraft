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
import { upsertFooter } from "@/lib/actions/admin.action"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { FooterValidation } from "../validation"
import toast from "react-hot-toast"


type Props = {
    defaults: TY_Footer | null
    setOpen: Dispatch<SetStateAction<boolean>>
}

type ImageFile = {
    file: File | undefined;
    previewUrl: string;
};


export function InputForm({ defaults, setOpen }: Props) {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FooterValidation>>({
        resolver: zodResolver(FooterValidation),
        defaultValues: {
            id: 0,
            address1: "",
            address2: "",
            supportemail: "",
            phone: "",
            x: "",
            fb: "",
            ig: "",
            yt: "",
        },
    })

    useEffect(() => {
        form.reset({
            id: defaults?.id ?? 0,
            address1: defaults?.address1 ?? "",
            address2: defaults?.address2 ?? "",
            supportemail: defaults?.supportemail ?? "",
            phone: defaults?.phone ?? "",
            x: defaults?.x ?? "",
            fb: defaults?.fb ?? "",
            ig: defaults?.ig ?? "",
            yt: defaults?.yt ?? "",
        });
    }, [form, defaults])

    // Submit Form
    async function onSubmit(values: z.infer<typeof FooterValidation>) {
        setLoading(true)

        const response = await upsertFooter(values)
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
        <DialogContent className="max-w-md md:max-w-7xl">
            <DialogHeader>
                <DialogTitle>Footer</DialogTitle>
                <DialogDescription>
                    Create | Make changes here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-row gap-2 justify-between"
                >

                    <FormField
                        control={form.control}
                        name="address1"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="1st Address" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Address 1
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address2"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="2nd Address" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Address 2
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="supportemail"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Support Email
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Phone" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Phone
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fb"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="FB Link" {...field} />
                                </FormControl>
                                <FormDescription>
                                    FB Link
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ig"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="IG Link" {...field} />
                                </FormControl>
                                <FormDescription>
                                    IG Link
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="yt"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="YT Link" {...field} />
                                </FormControl>
                                <FormDescription>
                                    YT Link
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="x"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="X Link" {...field} />
                                </FormControl>
                                <FormDescription>
                                    X Link
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <input type="hidden" name="id" value={defaults?.id} />

                    <DialogFooter>
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
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}