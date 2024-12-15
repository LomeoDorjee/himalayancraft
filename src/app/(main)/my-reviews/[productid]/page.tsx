
import ReviewForm from "@/components/review/ReviewForm";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "My Reviews"
    },
    description: "View My Reviews",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"),
};

export default async function ReviewPage({ params, searchParams }: {
    params: { productid: string },
    searchParams: any
}) {

    if (!params.productid) return

    const { userId } = await auth()
    if (!userId) return

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Review Product</h2>
            <ReviewForm
                productid={params.productid}
                searchParams={searchParams}
            />
            {/* <div className="mt-6 space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-md bg-white fade-in">
                        <p className="font-semibold text-lg">{review.name} <span className="text-sm text-gray-500">({review.rating}/5)</span></p>
                        <p className="text-gray-700">{review.comment}</p>
                    </div>
                ))}
            </div> */}
        </div>

    )
}
