
import Breadcrumbs from "@/components/Breadcrumbs";
import { getReviewsByUser } from "@/lib/actions/product.actions";
import Image from "next/image";
import Link from "next/link";
import { format } from "timeago.js";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "My Reviews"
    },
    description: "View My Reviews",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"),
};

const MyReviews = async () => {

    const data: {
        data: TY_ReviewByUser[],
        status: string
    } = await getReviewsByUser();

    if (data.status) return

    return (
        <>
            <Breadcrumbs />
            <div className="flex flex-col md:flex-row gap-24 md:min-h-[calc(100vh-550px)] items-start max-w-screen-xl mx-auto py-2">
                <div className="w-full">
                    <h1 className="text-2xl">Reviews</h1>
                    <div className="mt-6 flex flex-row gap-4 flex-wrap">
                        {data.data.map((review) => (
                            <Link
                                href={"/my-reviews/" + review.productid + "?reviewno=" + review.id}
                                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                key={review.id}>
                                <Image
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                                    src={review.product_banner ? review.product_banner : "/woman.png"}
                                    alt="Product Image"
                                    height={320}
                                    width={180}
                                />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{review.product_name}</h5>
                                    <div className="flex gap-1 mt-0 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{review.review}</p>
                                    <p className="text-gray-500">{format(review.created_at)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default MyReviews;
