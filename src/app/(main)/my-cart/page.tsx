import Breadcrumbs from '@/components/Breadcrumbs'
import TotalCart from '@/components/cart/TotalCart'
import type { Metadata } from "next";
import SimilarProducts from '@/components/product/SimilarProducts'
import CartItems from '@/components/cart/CartItems'

export const metadata: Metadata = {
    title: {
        absolute: "My Cart"
    },
    description: "View all the items added to your cart.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/"),
};

export default async function Mycart() {

    return (
        <section className="bg-white antialiased dark:bg-gray-900 px-4 py-2 lg:px-6 xl:px-32 2xl:px-64 ">
            <Breadcrumbs />
            <div className="">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <CartItems />

                        {/* Similar Products */}
                        <div className="hidden xl:mt-8 xl:block pt-8">
                            <div className="w-full">
                                <h1 className="text-2xl">
                                    <span className="border-b-4 rounded-l-lg border-lama">
                                        People also Bou
                                    </span>
                                    ght
                                </h1>
                                <SimilarProducts
                                    categoryId={parseInt(process.env.FEATURED_PRODUCTS_FEATURED_CATEGORY_ID ?? "1")} limit={5}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <TotalCart />

                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <form className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                                    <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                </div>
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
