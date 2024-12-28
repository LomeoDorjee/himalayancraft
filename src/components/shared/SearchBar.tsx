"use client";

import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Products from "@/constants/productConstant.js"

const SearchBar = ({ categories }: { categories: TY_Category[] }) => {

  const [query, setQuery] = useState<string>("");
  const [cat, setCat] = useState<string>("");
  const [suggestions, setSuggestions] = useState<TY_Product_Extended[]>([]);

  // Mock data (replace with API or dynamic data)
  const data: TY_Product_Extended[] = Products


  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search function
  const fetchSuggestions = useCallback(
    debounce((value: string) => {
      let filteredSuggestions = []
      if (value.length > 0) {
        filteredSuggestions = data.filter(product => {
          return product.name.toLowerCase().includes(value.toLowerCase())
        });
        filteredSuggestions.slice(0, 50)

        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300),
    [data]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSuggestions([]);
      submitForm()
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    submitForm(suggestion)
  };

  const router = useRouter();

  function submitForm(name?: string) {
    let searchWords = (name && name.length > 0) ? name : query
    if (searchWords && searchWords.length > 0) {
      if (cat && cat.length > 0) {
        router.push(`/list?cat=${cat}&name=${searchWords}`)
      } else {
        router.push(`/list?name=${searchWords}`)
      }
      setIsSearchVisible(false);
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const name = formData.get("name") as string;
    // const cat = formData.get("cat") as string;
    submitForm()

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

          <Select name="cat" onValueChange={e => setCat(e)}>
            <SelectTrigger className="w-1/4 outline-none border-0 focus-visible:ring-0 focus:ring-0 shadow-sm">
              <SelectValue placeholder="All Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.length > 0 && categories.map((cat, index) => (
                <SelectItem key={index} value={cat.title ? cat.title.toLowerCase() : ""}>{cat.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>


          <div className="realtive w-full max-w-md">
            <Command className="bg-transparent">
              <Input
                type="text"
                name="name"
                placeholder="Search..."
                className="flex-1 outline-none border-0 focus-visible:ring-0 shadow-sm  bg-transparent"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {suggestions.length > 0 && (
                <CommandList className="absolute top-full w-full z-10 max-w-md max-h-56 overflow-auto border border-gray-200 rounded-md shadow-md bg-white">
                  {suggestions.map((suggestion, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSuggestionClick(suggestion.name)}
                      className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                    >
                      {suggestion.name}
                    </CommandItem>
                  ))}
                </CommandList>
              )}
            </Command>
          </div>
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
              <div className="realtive w-full max-w-md">
                <Command className="bg-transparent">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Search..."
                    className="flex-1 outline-none border-0 focus-visible:ring-0 shadow-sm bg-transparent"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />
                  {suggestions.length > 0 && (
                    <CommandList className="absolute top-full w-full z-10 max-w-md max-h-56 overflow-auto border border-gray-200 rounded-md shadow-md bg-white">
                      {suggestions.map((suggestion, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleSuggestionClick(suggestion.name)}
                          className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                        >
                          {suggestion.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  )}
                </Command>
              </div>
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
