import Breadcrumbs from '@/components/Breadcrumbs'
import ProductSkeleton from '@/components/common/ProductSkeleton'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/product/ProductCard'
import ProductList from '@/components/product/ProductList'
import { filterProducts } from '@/lib/actions/product.actions'
import { currencyFormat } from '@/lib/utils'
import { Suspense } from 'react'

type Props = {
    params: {
        slug: string
    },
    searchParams: any
}

const PRODUCT_PER_PAGE = 12;


export default async function page({ params, searchParams }: Props) {

    // const data: {
    //     data: TY_Product[]
    //     status: string
    //     totalCount: number
    //     hasPrev: boolean
    //     hasNext: boolean
    //     page: number
    // } = await filterProducts(searchParams, PRODUCT_PER_PAGE, params.slug)

    // if (data.status) console.log(data.status)

    return (
        <div className='px-4 py-2 lg:px-6 xl:px-32 2xl:px-64'>
            <Breadcrumbs />

            <h2 className='text-lg font-bold capitalize py-2'>{params.slug}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* {
                    data.data.length > 0
                        ? data.data.map((product: TY_Product, index: number) => (
                            <ProductCard
                                name={product.name}
                                id={product.id}
                                banner={product.banner}
                                price={currencyFormat(product.price.toString())}
                                key={index}
                                slug={product.slug}
                            />
                        )) : (
                            <>No Product Available</>
                        )
                } */}

            </div>
            <div className="w-full py-2 bg-white p-2 rounded">
                <Suspense fallback={<ProductSkeleton />}>
                    <ProductList
                        categoryId={params.slug}
                        searchParams={searchParams}
                        limit={12}
                    />
                </Suspense>
            </div>

            {/* <Pagination
                currentPage={data.page}
                hasPrev={data.hasPrev}
                hasNext={data.hasNext}
            /> */}
        </div>
    )
}