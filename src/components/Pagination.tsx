"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ProductPagination = ({
  hasPrev,
  hasNext,
  currentPage
}: {
  hasPrev: boolean;
  hasNext: boolean;
  currentPage: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    console.log(currentPage)
  }, [currentPage])

  if (currentPage == 0) return

  return (
    <Pagination>
      <PaginationContent className="mt-12 md:mt-6 flex justify-between w-full">
        <PaginationItem>
          {hasPrev && (
            <PaginationPrevious href="#" onClick={() => createPageUrl(currentPage - 1)} />
          )}
        </PaginationItem>
        <div className="flex flex-nowrap gap-2">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink href="#"
                onClick={() => createPageUrl(currentPage - 1)}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage > 0 && hasNext && (
            <PaginationItem>
              <PaginationLink href="#"
                onClick={() => createPageUrl(parseInt(currentPage.toString()) - 1 + 2)}
              >
                {parseInt(currentPage.toString()) - 1 + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
        </div>
        <PaginationItem>
          {hasNext && (
            <PaginationNext href="#"
              onClick={() => createPageUrl(parseInt(currentPage.toString()) - 1 + 2)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination >
  );
};

export default ProductPagination;
