"use client"

import { currencyFormat } from "@/lib/utils";
import Products from "@/constants/productConstant.js"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const SimilarProducts = ({
  categoryId,
  limit
}: {
  categoryId: number;
  limit?: number
}) => {

  const products: TY_Product_Extended[] = Products

  const [filteredProducts, setFilteredProducts] = useState<TY_Product[]>([])

  const filterProducts = () => {

    let filteredData = products

    if (categoryId && typeof categoryId === 'string' && categoryId != "all") {
      filteredData = filteredData.filter(product => {
        return product.categoryslug === categoryId;
      });
    } else if (categoryId && categoryId != 0 && typeof categoryId === 'number') {
      filteredData = filteredData.filter(product => {
        return parseInt(product.categoryid) === categoryId;
      });
    }

    const LimitProducts = filteredData.slice(0, limit);

    setFilteredProducts(LimitProducts)

  };

  useEffect(() => {
    filterProducts()
  }, [categoryId])

  return (
    <div className={`py-4 pt-6 grid gap-2 grid-cols-1 md:grid-cols-4 justify-between`}>
      {filteredProducts.length > 0 ? filteredProducts.map((product: TY_Product, index: React.Key) => (
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
