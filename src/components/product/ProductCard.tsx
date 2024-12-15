import { enc } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
    id: number
    name: string
    banner: string
    price: string
    slug: string
}

export default function ProductCard({ id, name, banner, price, slug }: CardProps) {
    return (
        <Link
            href={"/product/" + slug}
            className="cursor-pointer transform overflow-hidden bg-white duration-200 hover:shadow-xl hover:scale-[103%] rounded-sm shadow-sm group"
            key={id}
        >
            <div className="relative h-[400px]">

                <div className="absolute inset-0">
                    <CldImage
                        src={banner || "/product.png"}
                        alt=""
                        fill
                        sizes="25vw"
                        className="object-cover rounded-sm "
                    />
                </div>

                <div className="absolute inset-0 flex items-end justify-center text-black">
                    <div className="h-20 w-full group-hover:bg-white/0 p-2 bg-white/90 transition-all duration-300 group-hover:text-white">
                        <h2 className="text-md line-clamp-1 font-medium">{name}</h2>
                        <div className="flex items-center">
                            <p className="mr-2 text-2xl font-semibold ">
                                {price}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
