"use client";

import { currencyFormat } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import MultiRangeSlider from "./common/MultiRangeSlider";
import { List } from "lucide-react";

const Filter = ({ categories, tags }: {
  categories: TY_Category[]
  tags: TY_Tags[]
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [toogleFilter, setToogleFilter] = useState<boolean>(false);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleRangeChange = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams);
    if (min > 0) {
      params.set("min", min.toString());
    }
    if (max > 0) {
      params.set("max", max.toString());
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCategoryChange = (id: string) => {
    setCheckedItems(prevItems =>
      prevItems.includes(id)
        ? (prevItems.filter(item => item !== id))
        : [...prevItems, id]
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("cat", checkedItems.join(","));
    replace(`${pathname}?${params.toString()}`);
  }, [checkedItems, pathname, replace, searchParams]);

  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const isInitialRender = useRef(true);

  const handleTagChange = (id: string) => {
    setCheckedTags(prevItems =>
      prevItems.includes(id)
        ? (prevItems.filter(item => item !== id))
        : [...prevItems, id]
    );
  };

  useEffect(() => {
    if (isInitialRender.current) {
      setTimeout(() => {
        isInitialRender.current = false; // Mark initial render as done
      }, 1000);
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.set("tags", checkedTags.join(","));
    replace(`${pathname}?${params.toString()}`);
    console.log("Triggered")
  }, [checkedTags, pathname, replace, searchParams]);

  return (
    <div className="flex flex-row justify-between w-full">

      <div className="w-full">
        <h2 className="text-xl font-semibold px-2 my-2 flex flex-row justify-between text-center">
          <span>Filters</span>
          <List onClick={() => setToogleFilter(!toogleFilter)} className="block md:hidden" />
        </h2>
        <div className={`mb-4 px-2 max-sm:${toogleFilter ? "block" : "hidden"} transition-all duration-300`}>
          <Accordion type="multiple" className="w-full"
          // defaultValue={["item-1", "item-2"]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <ul className="p-1 flex flex-col gap-3">
                  {
                    categories && categories.map((cat, index) => (
                      <li className="items-center flex" key={index}>
                        <input type="checkbox" className="mr-2 rounded-md items-center" onChange={() => handleCategoryChange(cat.slug)} />
                        {cat.title}
                      </li>
                    ))
                  }
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-0">
              <AccordionTrigger>Tags</AccordionTrigger>
              <AccordionContent>
                <ul className="p-1 flex flex-col gap-3">
                  {
                    tags && tags.map((tag, index) => (
                      <li className="items-center flex" key={index}>
                        <input type="checkbox" className="mr-2 rounded-md items-center" onChange={() => handleTagChange(tag.name)} />
                        {tag.name}
                      </li>
                    ))
                  }
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <MultiRangeSlider min={0} max={10000} onChange={handleRangeChange} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent>
                <ul className="p-2">
                  <li><input type="checkbox" id="in_stock" className="mr-2 rounded-md" />In Stock</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

    </div>
  );
};

export default Filter;
