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
import { upsertProduct } from "@/lib/actions/admin.action"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ProductValidation } from "../validation"
import toast from "react-hot-toast"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { DollarSign } from "lucide-react"
import MultipleSelector from "@/components/ui/multi-select"
import { CldImage } from "next-cloudinary"


type Props = {
    defaults: TY_Product | null
    setOpen: Dispatch<SetStateAction<boolean>>
    categories: TY_Category[]
    tags: TY_Tags[]
}

type ImageFile = {
    file: File | undefined;
    previewUrl: string;
};

type TY_OPTION = {
    value: string
    label: string
}


export function InputForm({ defaults, setOpen, categories, tags }: Props) {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [images, setImages] = useState<ImageFile[]>([]);

    const [optionTags, setOptionTags] = useState<TY_OPTION[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [defaultTags, setDefaultTags] = useState<TY_OPTION[]>([]);

    const form = useForm<z.infer<typeof ProductValidation>>({
        resolver: zodResolver(ProductValidation),
        defaultValues: {
            name: "",
            description: "",
            slug: "",
            id: 0,
            banner: "",
            ribbon: "",
            onsale: false,
            discount: 0,
            discounttype: "%",
            shippinginfo: "",
            categoryid: "0",
            price: 0,
            size: "",
            adddescription: ""
        },
    })

    useEffect(() => {
        form.reset({
            name: defaults?.name ?? "",
            description: defaults?.description ?? "",
            slug: defaults?.slug ?? "",
            id: defaults?.id ?? 0,
            categoryid: defaults?.categoryid ?? "0",
            banner: defaults?.banner ?? "",
            ribbon: defaults?.ribbon ?? "",
            onsale: !!defaults?.onsale,
            discount: defaults?.discount ?? 0,
            discounttype: defaults?.discounttype ?? "",
            shippinginfo: defaults?.shippinginfo ?? "",
            price: defaults?.price ?? 0,
            size: defaults?.size ?? "",
            adddescription: defaults?.adddescription ?? "",
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

        if (defaults?.tags) {
            const tags: TY_OPTION[] = []
            defaults.tags.split(", ").map((tag) => {
                tags.push({
                    label: tag,
                    value: tag
                })
            })

            setDefaultTags(tags)
        }

    }, [defaults, form])

    // Submit Form
    async function onSubmit(values: z.infer<typeof ProductValidation>) {
        setLoading(true)

        const formData = new FormData();
        if ((images.length && images[0].file) && images[0].file != undefined) {
            formData.append("banner", images[0].file)
        }
        formData.append("tags", JSON.stringify(selectedTags))

        const response = await upsertProduct(values, formData)
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

    const handleTagChange = (e: TY_OPTION[]) => {
        let tags: string[] = []
        Array.isArray(e) && e.map((tag) => {
            tags.push(tag.value)
        })
        setSelectedTags(tags)
    };

    useEffect(() => {
        const options: TY_OPTION[] = []

        tags && tags.forEach((tag) => {
            options.push({
                value: tag.name,
                label: tag.name,
            })
        })
        setOptionTags(options)
    }, [tags])

    return (
        <DialogContent className="min-w-md md:max-w-6xl max-h-lvh overflow-auto">
            <DialogHeader>
                <DialogTitle>Product Form</DialogTitle>
                <DialogDescription>
                    Create | Make changes here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                // action={formSubmit}
                >
                    <div className="gap-3 grid grid-cols-1 md:grid-cols-2 py-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the Product&apos;s name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="gap-2 grid grid-cols-1 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Slug" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            <span className="text-red-600"><sup>*</sup></span>
                                            Link to Product. <span className="text-yellow-600">Must be Unique!</span>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Price" {...field} type="number" />
                                        </FormControl>
                                        <FormDescription>
                                            This is the $ price of Product.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="categoryid"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">Default</SelectItem>
                                            {
                                                (categories.length > 0) ? categories.map((cat) => (
                                                    <SelectItem value={cat.id + ""} key={cat.id}>{cat.title}</SelectItem>
                                                )) : (<></>)
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        This is the Product&apos;s category.
                                        <Link href="/manage/categories" className="text-blue-600 ml-1" target="_blank">List</Link>.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Size" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the Product&apos;s Size.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ribbon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Ribbon" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the Product&apos;s Ribbon.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                    </div>
                    <div className="py-2">
                        <MultipleSelector
                            value={defaultTags}
                            placeholder="Select tags you like..."
                            hidePlaceholderWhenSelected
                            onChange={(e) => {
                                handleTagChange(e)
                            }}
                            options={optionTags}

                        />
                        <FormDescription>
                            These are the Product&apos;s tags.
                            <Link href="/manage/tags" className="text-blue-600 ml-1" target="_blank">List</Link>.
                        </FormDescription>
                    </div>

                    <div className="py-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} rows={4} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the description of Product.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="gap-2 grid grid-cols-1 md:grid-cols-3 py-3">
                        <FormField
                            control={form.control}
                            name="onsale"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label htmlFor="airplane-moda">On Sale?</Label>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Amount" type="number"  {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the Discount Amount.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="shippinginfo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="shippinginfo" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the Product&apos;s Shipping info.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="py-2">
                        <FormField
                            control={form.control}
                            name="adddescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Additional Description" {...field} rows={8} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the additional description.
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
                                    <CldImage
                                        width={200}
                                        height={200}
                                        src={image.previewUrl}
                                        alt="Preview"
                                        className="rounded-lg max-h-32" />
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