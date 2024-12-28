"use client"

import ProductPagination from "@/components/Pagination";
import { currencyFormat } from "@/lib/utils";
import ProductCard from "./ProductCard";
import Perpage from "./Perpage";

import Products from "@/constants/productConstant.js"
import { useEffect, useState } from "react";
import ProductSkeleton from "../common/ProductSkeleton";

const PRODUCT_PER_PAGE = 12;

const ProductList = ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: number | string;
  limit?: number;
  searchParams?: any;
}) => {

  // const data: {
  //   data: TY_Product[]
  //   status: string
  //   hasPrev: boolean
  //   hasNext: boolean,
  //   totalCount: number,
  //   page: number
  // } = await filterProducts(searchParams, limit ? limit : PRODUCT_PER_PAGE, categoryId);

  // if (data.status) console.log(data.status)

  const products: TY_Product_Extended[] = Products

  const [hasPrev, setHasPrev] = useState<boolean>(false)
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [filteredProducts, setFilteredProducts] = useState<TY_Product[]>([])

  const filterProducts = () => {

    let filteredData = products

    if (searchParams?.cat && searchParams?.cat != 'all') {
      const categoriesArray: string[] = searchParams.cat.split(',').map((cat: string) => cat.trim().toLowerCase());
      filteredData = products.filter(product => {
        // return product.categoryslug.toLowerCase() === searchParams.cat.toLowerCase();
        return categoriesArray.some((category) => category === product.categoryslug.toLowerCase());
      });
    }

    if (searchParams?.tags && searchParams?.tags != 'all') {
      const tagsArray: string[] = searchParams.tags.split(',').map((tag: string) => tag.trim().toLowerCase());
      filteredData = filteredData.filter(product => {
        // return product.tags?.toLowerCase().includes(searchParams.tags.toLowerCase());
        return product.tags?.toLowerCase().split(',').some(productTag =>
          tagsArray.some(searchTag => productTag.trim().toLowerCase().includes(searchTag))
        );
      });
    }

    if (searchParams?.min) {
      filteredData = filteredData.filter(product => {
        return parseFloat(product.price) >= searchParams?.min;
      });
    }

    if (searchParams?.max) {
      filteredData = filteredData.filter(product => {
        return parseFloat(product.price) <= searchParams?.max;
      });
    }

    if (searchParams?.name && searchParams?.name.length > 0) {
      filteredData = filteredData.filter(product => {
        return product.name.toLowerCase().includes(searchParams.name.toLowerCase())
          || product.description.toLowerCase().includes(searchParams.name.toLowerCase())
          || product.adddescription.toLowerCase().includes(searchParams.name.toLowerCase())
      });
    }

    if (categoryId && typeof categoryId === 'string' && categoryId != "all") {
      filteredData = filteredData.filter(product => {
        return product.categoryslug.toLowerCase() === categoryId.toLowerCase();
      });
    } else if (categoryId && categoryId != 0 && typeof categoryId === 'number') {
      filteredData = filteredData.filter(product => {
        return parseInt(product.categoryid) === categoryId;
      });
    }

    // // Total Record //
    // const totalCount: TY_Product[] = await prisma.$queryRaw(Prisma.raw(sql))

    if (searchParams?.sort && searchParams?.sort != 'none') {
      switch (searchParams.sort) {
        case "asc price":
          filteredData = filteredData.sort((a, b) => {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
          });
          break;
        case "desc price":
          filteredData = filteredData.sort((a, b) => {
            if (a.price < b.price) return 1;
            if (a.price > b.price) return -1;
            return 0;
          });
          break;
        case "asc updated_at":
          filteredData = filteredData.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          break;
        case "desc updated_at":
          filteredData = filteredData.sort((a, b) => {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
          });
          break;
        default: return
      }
      filteredData = filteredData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

    }

    const mainLimit = searchParams?.limit ? searchParams.limit : (limit ?? PRODUCT_PER_PAGE)
    const mainPage = searchParams?.page ? searchParams.page : page

    const startIndex = (mainPage - 1) * mainLimit;
    const endIndex = startIndex + mainLimit;

    const paginatedProducts = filteredData.slice(startIndex, endIndex);

    setFilteredProducts(paginatedProducts)


    // Calculate totalCount 
    const totalCount = filteredData.length;

    const totalPages = Math.ceil(totalCount / mainLimit);

    // Calculate hasPrev and hasNext 
    setHasPrev(mainPage > 1);
    setHasNext(mainPage < totalPages);

    setPage(mainPage)

  };

  useEffect(() => {
    filterProducts()
  }, [searchParams, categoryId])


  return (
    <div className="px-2">
      {
        !limit && (
          <>
            <div className="my-2 flex flex-nowrap items-center justify-between">
              <h1 className="font-semibold text-2xl md:flex hidden">
                Results {searchParams?.name ? `for "${searchParams.name}"` : `Result`}
              </h1>
              <h1 className="font-semibold text-lg md:hidden">
                Results {searchParams?.name ? `for "${(searchParams.name.length > 16) ? searchParams.name.slice(0, 14) + ".." : searchParams.name}"` : `Result`}
              </h1>
              <div className="text-sm font-light flex flex-nowrap gap-2 items-center justify-between">
                <label className="hidden md:flex">Per Page:</label>
                <Perpage />
              </div>
            </div>
            <hr />
          </>
        )
      }
      <div className="py-2 pt-4 grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between">
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
            <ProductSkeleton />
          )}


      </div>

      {
        !limit && (

          <ProductPagination
            currentPage={page}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        )
      }
    </div>
  );
};

export default ProductList;
