import Breadcrumbs from "@/components/Breadcrumbs";
import Add from "@/components/cart/Add";
import ProductSkeleton from "@/components/common/ProductSkeleton";
import ProductImages from "@/components/product/ProductImages";
import Reviews from "@/components/review/Reviews";
import { getProductBySlug, getProductImagesBySlug } from "@/lib/actions/product.actions";
import { currencyFormat } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import SimilarProducts from "@/components/product/SimilarProducts";
import LongDescription from "@/components/product/LongDescription";
import { CircleDollarSign, Layers, ListOrdered, Ruler, Sailboat } from "lucide-react";


export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {

  if (!params.slug) return {}

  const data: {
    data: TY_Product[]
    status: string
  } = await getProductBySlug(params.slug)

  const product = data.data[0]

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"),
    title: product.name,
    openGraph: {
      images: [
        {
          url: product.banner
        }
      ],
      title: product.name,
      description: product.description,
      type: "website",
      locale: "en_US",
      url: `https://nepalcraft.com.np/${params.slug}`,
      siteName: "Craft Nepal"
    },
  }
}


const SinglePage = async ({ params }: { params: { slug: string } }) => {

  if (!params.slug) return

  const data: {
    data: TY_ProductDetail[]
    status: string
  } = await getProductBySlug(params.slug)

  if (data.status || !data.data[0]) {
    return notFound();
  }
  const product = data.data[0]

  const images: {
    data: TY_CloudImages[]
    status: string
  } = await getProductImagesBySlug(params.slug)

  return (
    <div className="px-1 md:px-4 py-2 lg:px-6 xl:px-32 2xl:px-64 ">
      <Breadcrumbs />
      <div className="flex flex-col lg:flex-row gap-6 p-2">

        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 lg:h-max">
          <ProductImages items={images.data ?? []} />
        </div>

        {/* TEXTS */}
        <div className="w-full lg:w-1/2 rounded-md flex gap-3 flex-col">

          <div className="bg-white  p-4 md:p-8">

            <h1 className="text-4xl font-medium">{product.name} <span className="bg-lama border text-sm rounded-full px-4 align-middle py-1 items-center">{product.ribbon}</span></h1>

            <span className="inline-flex gap-1 py-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z"></path>
                </svg>
              ))}
            </span>

            <span className="max-w-fit border-lama border text-sm rounded-xl px-4 py-1 block my-4">{product.category}</span>

            <div className="text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description.replaceAll("\n", "<br>"))
              }}
            ></div>

            <div className="h-[2px] bg-gray-100 my-4" />

            {/* Size */}
            {
              product.size &&
              <div className="text-sm flex flex-nowrap items-center justify-start gap-6 my-2" >
                <p className="inline-flex items-center"><Ruler className="pr-1 mr-1" /> Size:</p> <span className="border border-gray-300 text-md p-2 px-6 bg-white-100 rounded-sm">{product.size}</span>
              </div>
            }


            {/* Stock */}
            {
              product.stock &&
              <div className="text-sm flex flex-nowrap items-center justify-start gap-6 py-4">
                <p className="inline-flex items-center"><Layers className="pr-1 mr-1" /> Stock:</p>
                <div>
                  <span className={`h-3 w-3 inline-flex rounded-full ${product.stock > 1 ? 'bg-green-500' : 'bg-green-500'}  opacity-100`}></span>
                  <p className={`${product.stock > 1 ? 'text-green-500' : 'text-green-500'} inline-flex ml-3 text-md`}>
                    {product.stock > 1 ? 'Available' : 'Out of stock!'}
                  </p>
                </div>

              </div>
            }

            <div className="flex items-center justify-start">
              <div className="text-sm pr-4 inline-flex items-center"><CircleDollarSign className="pr-1 mr-1" /> Price: </div>
              {product.discount > 0 && !isNaN(product.discount) ? (
                <div className="flex items-center gap-4 p-2 ">
                  <h2 className="font-medium text-2xl text-lama tracking-wider">
                    {currencyFormat((product.price.toFixed(2) - product.discount.toFixed(2)))}
                  </h2>
                  <h3 className="text-md text-gray-500 line-through tracking-wide">
                    {currencyFormat(product.price.toFixed(2))}
                  </h3>
                  <h5 className="text-xs text-green-600 font-semibold">
                    -{((product.discount * 100) / product.price).toFixed(2)}% off
                  </h5>
                </div>
              ) : (
                <h2 className="font-medium text-4xl text-lama tracking-wider">{currencyFormat(product.price.toString())}<span className="text-sm font-light">Best Price</span></h2>
              )}

            </div>

            <div className="h-[2px] bg-gray-100 my-4" />


            <Add
              productId={parseInt(product.id.toString())}
              stockNumber={product.stock}
              productName={product.name}
              productBanner={product.banner}
              productCategories={product.category}
              price={product.price.toString()}
              discount={product.discount.toString()}
              slug={product.slug}
            />


            <div className="h-[2px] bg-gray-100 my-4 " />


            <div className="text-sm flex flex-nowrap items-center justify-start gap-6">
              <p className="inline-flex items-center"><ListOrdered className="pr-1 mr-1" /> SKU:</p>
              <div className="text-md p-2 uppercase">
                {product.sku}
              </div>
            </div>

            <div className="text-sm flex flex-nowrap items-center justify-start gap-6">
              <p className="inline-flex items-center"><Sailboat className="mr-1 pr-1" /> Ship:</p>
              <div className="text-md p-2 uppercase">
                {product.shippinginfo}
              </div>
            </div>

          </div>

          <div className="bg-white p-4 md:p-8">
            <div className="flex items-start justify-start flex-col  ">
              <div className="text-sm pr-4 font-semibold">Description</div>
              <LongDescription description={product.adddescription} />
            </div>
          </div>

        </div>

      </div>

      <div className="flex flex-col my-10 px-2 gap-4">

        {/* REVIEWS */}
        <div className="w-full">
          <h1 className="text-2xl">
            <span className="border-b-4 rounded-l-lg border-lama">
              Similar
            </span>
            &nbsp;Products
          </h1>
          <SimilarProducts
            categoryId={parseInt(product.categoryid)} limit={5}
          />
        </div>

        <div className="w-full">
          {/* REVIEWS */}
          <h1 className="text-2xl">
            <span className="border-b-4 rounded-l-lg border-lama">User</span>
            &nbsp;Reviews</h1>
          <Suspense fallback={<ProductSkeleton />}>
            <Reviews productId={product.id} />
          </Suspense>
        </div>
      </div>
    </div>

  );
};

export default SinglePage;
