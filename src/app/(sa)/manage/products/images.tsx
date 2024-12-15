"use client"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CldImage } from 'next-cloudinary';

import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input";
import { getCloudImages, uploadProductImages } from "@/lib/actions/admin.action";
import { useFormStatus } from "react-dom";

type ImageFile = {
    file: File | undefined;
    previewUrl: string;
};

export default function ImageActions({ productId }: { productId: string }) {

    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [savedImages, setSavedImages] = useState<TY_CloudImages[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Submit Form
    async function formSubmit(event: FormData) {

        if (images.length <= 0) {
            toast.error("Please select an image!")
            return
        }

        const response = await uploadProductImages(event)
        if (response?.status != "success") {
            toast.error(response?.status)
            return
        }

        toast.success(response?.status)

        setImages([])
        setPreview([])

        loadImages()

    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(files)

        const urls: string[] = files.map((f) => URL.createObjectURL(f))
        setPreview(urls);

        setError(null);
    };

    // Get Cloud Images
    const loadImages = async () => {
        if (!productId) return
        const { data, status } = await getCloudImages(parseInt(productId), "product")
        if (status != "") {
            toast.error(status)
            return
        }
        setSavedImages(data)
    }

    useEffect(() => {
        loadImages()
    }, [productId, loadImages])


    return (
        <SheetContent side={"right"} className="w-fit md:w-[540px]">
            <SheetHeader>
                <SheetTitle>Upload Images</SheetTitle>
                <SheetDescription>
                    Make changes to product images!
                </SheetDescription>
            </SheetHeader>
            <form
                id="sdf22cx"
                action={formSubmit}
                className="w-full flex flex-nowrap flex-col gap-4 my-4 p-2 rounded-lg border border-gray-200 shadow-md"
            >

                {/* Image Upload Input */}
                <div>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="pb-2 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                </div>

                <SubmitButton />

                <input type="hidden" name="productid" value={productId} />

            </form>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-lg p-2 max-h-svh overflow-auto">
                {preview.map((image, index) => (
                    <div key={index} className="relative ">
                        <CldImage
                            width={200}
                            height={200}
                            src={image}
                            alt="Preview"
                            className="rounded-lg max-h-64 outline outline-offset-2 outline-yellow-300" />
                    </div>
                ))}

                {savedImages.map((image, index) => (
                    <div key={index} className="relative">
                        <CldImage
                            src={image.url}
                            alt="saved"
                            className="rounded-lg max-h-64"
                            width={200}
                            height={200}
                        />
                    </div>
                ))}
            </div>


        </SheetContent>

    )
}

function SubmitButton() {

    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending} className="max-w-fit align-center justify-between hover:bg-green-500 animate">
            {pending ?
                (
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                ) : "Upload"}
        </Button>
    )
}
