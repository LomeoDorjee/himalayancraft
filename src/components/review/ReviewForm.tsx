"use client"

import { toast } from "@/hooks/use-toast"
import { ReviewValidation } from "@/lib/validation"
import { redirect, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { useFormStatus } from "react-dom"
import { submitReview } from "@/lib/actions/product.actions"
import RatingStar from "./RatingStars"

type MainDataType = TY_Reviews

type FormProps = {
    productid: string
    searchParams: any
}

export default function ReviewForm({
    productid,
    searchParams
}: FormProps) {


    const [mainData, setMainData] = useState<MainDataType>({
        customer_name: "X",
        customer_avatar: "X",
        rating: 1,
        review: "",
        created_at: "X",
        productid: parseInt(productid),
        id: (searchParams?.reviewno > 0) ? parseInt(searchParams.reviewno) : 0
    })

    const formSubmit = async (formData: FormData) => {

        // Validation
        const zod = ReviewValidation.safeParse(mainData)
        if (!zod.success) {

            let errorMessage = "";

            zod.error.issues.forEach((issue) => {
                errorMessage = errorMessage + "[" + issue.path[0] + "]: " + issue.message + "."
            })
            toast({
                title: "Uh oh! Something went wrong.",
                description: <span dangerouslySetInnerHTML={{ __html: errorMessage.replaceAll(".", ".<br />") }} />,
                variant: "destructive",
            })
            return;
        }

        // // serverside function call 
        const response = await submitReview(zod.data)
        if (response?.status != "success") {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "" + response?.status,
                variant: "destructive",
            })
            console.log(response.status)
            return
        } else {

            // redirect to reviews
            toast({
                title: "Review Submitted",
                description: <span dangerouslySetInnerHTML={{ __html: "Your review will appear once the moderators approve it.<br/> Redirecting to <u>My Reviews</u>." }} />,
                className: "bg-green-300"
            })

            redirect('/my-reviews')
        }


    }

    const handleChange = useCallback((type: string, value?: string | boolean | number) => {
        if (value) {
            setMainData(prevState => ({
                ...prevState,
                [type]: value
            }));
        } else {
            setMainData(prevState => ({
                ...prevState,
                [type]: ""
            }));
        }
    }, []);


    return (
        <form action={formSubmit} className="space-y-4">
            <div>
                {productid}
            </div>
            <RatingStar
                rating={mainData.rating}
                onRatingChange={(rating) => handleChange("rating", rating)}
            />
            <textarea
                placeholder="Review"
                value={mainData.review}
                onChange={(e) => handleChange("review", e.target.value)}
                className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10}
            />
            <SubmitButton />
        </form>

    )
}

function SubmitButton() {

    const { pending } = useFormStatus()
    return (
        <button type="submit" color="secondary" disabled={pending}
            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
            {pending ? "..." : "Submit Review"}
        </button>
    )
}