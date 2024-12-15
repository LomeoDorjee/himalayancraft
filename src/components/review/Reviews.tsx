import { getReviewsByProduct } from "@/lib/actions/product.actions";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Reviews = async ({ productId }: { productId: number }) => {

  const reviews: {
    data: TY_Reviews[],
    status: string
  } = await getReviewsByProduct(productId)

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      {
        reviews.data.length > 0 ? reviews.data.map((review: TY_Reviews) => (
          <Card key={review.id} className="min-w-lg max-w-lg">
            <CardHeader>
              <CardTitle>
                {/* USER */}
                <div className="flex items-center gap-4 font-medium">
                  <Image
                    src={review.customer_avatar}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{review.customer_name}</span>
                </div>
              </CardTitle>
              <CardDescription className="flex gap-2">
                {/* STARS */}
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z"></path>
                  </svg>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* DESC */}
              {review.review
                && <p>{review.review}</p>
              }
            </CardContent>
          </Card>
        )) : <>
          <div>No Reviews Yet!</div>
        </>
      }
    </div>
  )

};

export default Reviews;
