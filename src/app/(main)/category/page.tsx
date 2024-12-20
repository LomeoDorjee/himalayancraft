import type { Metadata } from "next";
import Filter from "@/components/Filter";
import ProductSkeleton from "@/components/common/ProductSkeleton";
import ProductList from "@/components/product/ProductList";
import { getAllCategories } from "@/lib/actions/product.actions";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Category",
  description: "Browse all the available product according to category",
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/"),
};

const ListPage = async ({ searchParams }: { searchParams: any }) => {

  const categories: {
    data: TY_Category[]
    status: string
  } = await getAllCategories();

  if (categories.status != "") console.log(categories.status)


  return (
    <div className="px-4 py-2 lg:px-6 xl:px-32 2xl:px-64">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-4">
        {
          categories.data.length > 0 ?
            categories.data.map((cat: TY_Category, index: number) => (
              <Link
                className="flex bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:scale-105 hover:underline"
                key={index}
                href={`/category/${cat.slug}`}
              >
                <div className="w-1/3">
                  <Image
                    src={cat.banner || ''}
                    alt="category"
                    width={200}
                    height={300}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <h2 className=" text-2xl font-bold mb-2">{cat.title}</h2>
                  <p className="text-lg">{cat.description}</p>
                </div>
              </Link>
            )
            ) : (<>No Category Available</>)
        }

      </div>
    </div>
  );
};

export default ListPage;
