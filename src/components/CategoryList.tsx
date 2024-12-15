

import { getAllCategories } from "@/lib/actions/product.actions";
import Image from "next/image";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

import Categories from "@/constants/categoriesConstant";

const CategoryList = async () => {

  const data: TY_Category[] = Categories

  return (
    <div className="py-4 md:px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex md:gap-4 lg:gap-8 gap-2">
        {data.map((cat: TY_Category) => (
          <Link
            href={`/category/${cat.slug}`}
            className="flex-shrink-0 w-1/3 md:w-1/4 xl:w-1/6 rounded-md md:rounded-0 overflow-hidden"
            key={cat.id}
          >
            <CategoryCard
              image={cat.banner || ""}
              name={cat.title || ""}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
