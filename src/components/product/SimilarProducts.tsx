

import { filterProducts } from "@/lib/actions/product.actions";
import { currencyFormat } from "@/lib/utils";
import ProductCard from "./ProductCard";

const PRODUCT_PER_PAGE = 3;

const SimilarProducts = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: number;
  limit?: number;
  searchParams?: any;
}) => {

  const data: {
    data: TY_Product[]
    status: string
    hasPrev: boolean
    hasNext: boolean,
    totalCount: number,
    page: number
  } = await filterProducts(searchParams, limit ? limit : PRODUCT_PER_PAGE, categoryId);

  if (data.status) console.log(data.status)

  return (
    <div className={`py-4 pt-6 grid gap-2 grid-cols-1 md:grid-cols-${limit} justify-between`}>
      {data.data.length > 0 ? data.data.map((product: TY_Product, index: React.Key) => (
        <ProductCard
          name={product.name}
          id={product.id}
          banner={product.banner}
          price={currencyFormat(product.price.toString())}
          key={index}
          slug={product.slug}
        />
      ))
        : (
          <p></p>
        )}
    </div>
  );
};

export default SimilarProducts;
