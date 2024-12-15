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
import { upsertTag } from "@/lib/actions/admin.action"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { TagValidation } from "../validation"
import toast from "react-hot-toast"


type Props = {
    defaults: TY_Tags | null
    setOpen: Dispatch<SetStateAction<boolean>>
}

type ImageFile = {
    file: File | undefined;
    previewUrl: string;
};


export function InputForm({ defaults, setOpen }: Props) {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof TagValidation>>({
        resolver: zodResolver(TagValidation),
        defaultValues: {
            id: 0,
            name: ""
        },
    })

    useEffect(() => {
        form.reset({
            id: defaults?.id ?? 0,
            name: defaults?.name ?? "",
        });
    }, [form, defaults])

    // Submit Form
    async function onSubmit(values: z.infer<typeof TagValidation>) {
        setLoading(true)

        const response = await upsertTag(values)
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
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Tags</DialogTitle>
                <DialogDescription>
                    Create | Make changes here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                >

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Tag name.
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