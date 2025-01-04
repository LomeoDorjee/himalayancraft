import { Suspense } from "react"
import Slider from "@/components/common/Slider"
import ProductSkeleton from "@/components/common/ProductSkeleton"
import CategorySkeleton from "@/components/common/CategorySkeleton"
import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/product/ProductList"
import Link from "next/link";
import { ArrowRightIcon, ChevronsRight } from "lucide-react"
import { getSliders, getTags } from "@/lib/actions/admin.action"

import Tags from "@/constants/tagsConstant.js"
import Slides from "@/constants/sliderConstant.js"


const HomePage = async () => {

  const sliders: TY_Slider[] = Slides

  const tags: TY_Tags[] = Tags

  return (
    <div className="">

      <div className="pt-4 pb-0 px-4 py-2 lg:px-6 xl:px-32 2xl:px-64 ">
        <div className="flex flex-nowrap gap-2 md:grid md:grid-cols-8 overflow-auto">
          {
            tags && tags.map((tag, index) => {
              if (index < 8)
                return (
                  <Link
                    href={`/list?tags=${tag.name}`}
                    key={index}
                    className="text-sm md:text-lg rounded-lg border-1 border-lg bg-white p-2 md:p-3 text-center hover:font-bold transition-all duration-300">{tag.name}</Link>
                )
            })
          }
        </div>
      </div>

      <Slider slides={sliders} />

      <div className="py-2 md:mt-12">
        <div className="flex justify-between items-center px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64 md:mb-4">
          <h1 className="text-2xl">
            Categories
          </h1>
          <Link href="/category" className="text-lama text-nowrap inline-flex items-center text-xs">
            More<ChevronsRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="py-2 md:mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">
            Featured Products
          </h1>
          <Link
            href={`/list?categoryId=${parseInt(process.env?.FEATURED_PRODUCTS_NAME ? process.env.FEATURED_PRODUCTS_NAME : "featured")}`}
            className="text-lama text-nowrap inline-flex items-center text-xs"
          >
            More<ChevronsRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductList
            categoryId={parseInt(process.env?.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID ? process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID : "1")}
            limit={8}
          />
        </Suspense>
      </div>
      <div className="py-2 md:mt-12 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">
            New Products
          </h1>
          <Link
            href={`/list?sortby=desc updated_at)}`}
            className="text-lama text-nowrap inline-flex items-center text-xs"
          >
            More<ChevronsRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductList
            categoryId={0}
            limit={4}
          />
        </Suspense>
      </div>
    </div >
  )
}

export default HomePage