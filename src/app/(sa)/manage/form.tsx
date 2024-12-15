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
import { upsertCategory } from "@/lib/actions/admin.action"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { CategoryValidation } from "./validation"
import toast from "react-hot-toast"
import MultipleSelector, { Option } from '@/components/ui/multi-select';
import { CldImage } from "next-cloudinary"

const OPTIONS: Option[] = [
    { label: 'nextjs', value: 'nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember', disable: true },
    { label: 'Gatsby', value: 'gatsby', disable: true },
    { label: 'Astro', value: 'astro' },
];



type Props = {
    defaults: TY_Category | null
    setOpen: Dispatch<SetStateAction<boolean>>
}

type ImageFile = {
    file: File | undefined;
    previewUrl: string;
};


export function InputForm({ defaults, setOpen }: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<ImageFile[]>([]);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof CategoryValidation>>({
        resolver: zodResolver(CategoryValidation),
        defaultValues: {
            title: "",
            description: "",
            slug: "",
            id: 0,
            banner: ""
        },
    })

    useEffect(() => {
        form.reset({
            title: defaults?.title ?? "",
            description: defaults?.description ?? "",
            slug: defaults?.slug ?? "",
            id: defaults?.id ?? 0,
            banner: defaults?.banner ?? "",
        });

        if (defaults?.banner) {
            const newImages: ImageFile[] = []
            newImages.push({
                previewUrl: defaults.banner,
                file: undefined
            })
            setImages(newImages);
        } else {
            setImages([])
        }
    }, [defaults, form])

    // Submit Form
    async function onSubmit(values: z.infer<typeof CategoryValidation>) {
        setLoading(true)

        const formData = new FormData();
        if ((images.length && images[0].file) && images[0].file != undefined) {
            formData.append("banner", images[0].file)
        }

        const response = await upsertCategory(values, formData)
        if (response?.status != "success") {
            toast.error(response?.status)
            setLoading(false)
            return
        }

        toast.success(response?.status)
        setLoading(false)
        setOpen(false)

    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages: ImageFile[] = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setImages(newImages);
        setError(null);
    };

    return (
        <DialogContent className="min-w-md md:max-w-2xl">
            <DialogHeader>
                <DialogTitle>[Form Name]</DialogTitle>
                <DialogDescription>
                    Create | Make changes here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                >
                    <div className="gap-2 grid grid-cols-1 md:grid-cols-2 py-3">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the main display category name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Slug" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the link to category. Must be Unique!
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="py-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the description of category.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Image Upload Input */}
                    <div>
                        <input
                            type="file"
                            id="banner"
                            accept="image/jpeg, image/png, image/gif"
                            onChange={handleImageChange}
                            className="pt-2 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                        />
                        <FormDescription>
                            <label htmlFor="banner" >Upload your banner</label>
                        </FormDescription>

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <CldImage src={image.previewUrl} alt="Preview"
                                        width={200}
                                        height={200}
                                        className="rounded-lg" />
                                </div>
                            ))}
                        </div>
                    </div>

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