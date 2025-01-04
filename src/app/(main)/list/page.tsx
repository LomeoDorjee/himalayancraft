import type { Metadata } from "next";
import Filter from "@/components/Filter";
import ProductSkeleton from "@/components/common/ProductSkeleton";
import ProductList from "@/components/product/ProductList";
import { getAllCategories } from "@/lib/actions/product.actions";
import Image from "next/image";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getTags } from "@/lib/actions/admin.action";

import Categories from "@/constants/categoriesConstant.js"
import Tags from "@/constants/tagsConstant.js"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all the available products in our site",
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/"),
};

const ListPage = async ({ searchParams }: { searchParams: any }) => {

  const catiD = searchParams.cat ? searchParams.cat.split("#")[1] : 0

  const categories: TY_Category[] = Categories

  const tags: TY_Tags[] = Tags

  return (
    <div className="px-4 lg:px-6 xl:px-32 2xl:px-64 py-2.5">

      <Breadcrumbs />
      {/* CAMPAIGN */}
      {/* <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div> */}

      <div className="flex md:flex-col flex-col items-start justify-start gap-3">

        {/* FILTER */}
        <div className="w-full bg-white p-2 rounded shadow py-2">
          <Filter categories={categories} tags={tags} />
        </div>

        {/* PRODUCTS */}
        <div className="w-full py-2 bg-white p-2 rounded">

          <Suspense fallback={<ProductSkeleton />}>
            <ProductList
              categoryId={catiD}
              searchParams={searchParams}
            />
          </Suspense>
        </div>
      </div>

    </div>
  );
};

export default ListPage;
