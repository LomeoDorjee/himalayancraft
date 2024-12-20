"use client";

import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SearchBar = ({ categories }: { categories: TY_Category[] }) => {

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name && name.length > 0) {
      const cat = formData.get("cat") as string;
      if (cat && cat.length > 0) {
        router.push(`/list?cat=${cat}&name=${name}`)
      } else {
        router.push(`/list?name=${name}`)
      }

      setIsSearchVisible(false);
    }

  };

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef(null);

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
  };

  return (
    <div className="w-full">

      <div className="hidden md:flex items-center justify-center mx-auto px-4 max-w-3xl">
        <form
          className="flex items-center justify-between gap-0 rounded-lg flex-1 shadow-md px-1"
          onSubmit={handleSearch}
        >

          <Select name="cat">
            <SelectTrigger className="w-1/4 outline-none border-0 focus-visible:ring-0 focus:ring-0 shadow-sm">
              <SelectValue placeholder="All Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.length > 0 && categories.map((cat, index) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>{cat.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="text"
            name="name"
            placeholder="Search"
            className="flex-1 outline-none border-0 focus-visible:ring-0 shadow-sm"
          />
          <Button
            type="submit"
            className="text-gray-500 cursor-pointer p-1.5 pr-2 rounded-br-xs rounded-tr-xs shadow-sm">
            <SearchIcon />
          </Button>
        </form>
      </div>

      <div className="md:hidden flex items-center justify-end">
        <button onClick={() => setIsSearchVisible(true)} className="">
          <SearchIcon className="w-6 h-6 mx-1" />
        </button>
      </div>

      {isSearchVisible && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 flex items-start justify-center z-50">
          <div className="flex w-full justify-start items-center gap-0 m-2">
            <form
              className="flex items-center justify-between gap-0 p-2 rounded-xl flex-1 shadow-xl"
              onSubmit={handleSearch}
            >
              <Input
                type="text"
                name="name"
                placeholder="Search"
                autoFocus
                className="flex-1 rounded-bl-2xl rounded-tl-2xl outline-none border-0 focus-visible:ring-0"
              />
              <button
                type="submit"
                className="cursor-pointer p-2 rounded-br-2xl rounded-tr-2xl bg-transparent">
                <SearchIcon />
              </button>
            </form>
            <button
              onClick={() => setIsSearchVisible(false)}
              className="dark:text-white">
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
