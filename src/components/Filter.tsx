"use client";

import { currencyFormat } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

  const [toogleFilter, setToogleFilter] = useState<boolean>(true);

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
    if (min > 0) {
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
  const handleTagChange = (id: string) => {
    setCheckedTags(prevItems =>
      prevItems.includes(id)
        ? (prevItems.filter(item => item !== id))
        : [...prevItems, id]
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tags", checkedTags.join(","));
    replace(`${pathname}?${params.toString()}`);
  }, [checkedTags, pathname, replace, searchParams]);

  return (
    <div className="flex flex-row justify-between w-full">

      <div className="hidden gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        {/* Filter Categories */}
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value='all'>All Category</option>
          {
            categories && categories.map(cat => (
              <option value={cat.title + '#' + cat.id} key={cat.id}>{cat.title}</option>
            ))
          }
        </select>
        <select
          name=""
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        >
          <option>All Filters</option>
        </select>
      </div>

      <div className="hidden">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option value="none">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc updated_at">Newest</option>
          <option value="desc updated_at">Oldest</option>
        </select>
      </div>

      <div className="w-full">
        <h2 className="text-md font-semibold m-2 flex flex-row justify-between">
          <span>Filters</span>
          <List onClick={() => setToogleFilter(!toogleFilter)} className="block md:hidden" />
        </h2>
        <hr />
        <div className={`mb-4 px-2 max-sm:${toogleFilter ? "block" : "hidden"} transition-all duration-300`}>
          <Accordion type="multiple" className="w-full" defaultValue={["item-1", "item-2"]}>
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
                <MultiRangeSlider min={0} max={100} onChange={handleRangeChange} />
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
