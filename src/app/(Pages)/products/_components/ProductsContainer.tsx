"use client";
import { Product } from "@/types/product";
import React, { useEffect, useRef, useState } from "react";
import Filters from "./Filters";
import { getProducts } from "@/api/product.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ProductCard from "./ProductItem";
import { getCookie } from "@/lib/cookie";
import { RefreshCw, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import InfiniteScroll from "react-infinite-scroller";

function ProductsContainer({
  data,
  defaultPageSize,
  totalResults,
}: {
  data: Product[];
  wishlist: any[];
  defaultPageSize: number;
  totalResults: number;
}) {
  const queryClient = useQueryClient();
  const [total, setTotal] = useState(totalResults);
  const [page, setPage] = useState(1);
  const form = useForm({
    defaultValues: {
      search: "",
      category: "all",
    },
  });

  const response = useQuery({
    queryKey: [
      "products",
      form.watch("search"),
      getCookie("gender") || "male",
      form.watch("category"),
    ],
    queryFn: async () =>
      getProducts(
        1,
        defaultPageSize,
        form.getValues("search"),
        getCookie("gender") || "male",
        form.getValues("category")
      ),
    initialData: { success: true, message: "", data: data as Product[], wishlist: [] },
    staleTime: 60 * 1000,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setPage(1);
      setTotal(0);
      queryClient.invalidateQueries({
        queryKey: [
          "products",
          form.getValues("search"),
          getCookie("gender") || "male",
          form.getValues("category"),
        ],
      }); // Invalidate the query with the new search value.search, gender, current.category] });
    }, 300); // 300ms debounce
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("category")) {
      form.setValue("category", urlParams.get("category") || "all");
    }
  }, []);

  //page change here
  const fetchNextPageData = async () => {
    const res = await getProducts(
      page + 1,
      defaultPageSize,
      form.getValues("search"),
      getCookie("gender") || "male",
      form.getValues("category")
    );
    console.log(res.data)
    if (res.data.length > 0) {
      setPage(page + 1);
      queryClient.setQueryData(["products",form.getValues("search"),
          getCookie("gender") || "male",
          form.getValues("category"),], (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          data: [...oldData.data, ...res?.data], // Append new products
        };
      });
    }
  };
  console.log(total > response?.data?.data?.length,'coniditon',total)
  return (
    <>
      <Filters handleFilter={handleFilter} form={form} />
      {!response?.isLoading ||
      !response?.isFetching ||
      !response?.isRefetching ? (
        response?.data?.data?.length <= 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-50 rounded-full p-6 mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No matches found</h3>
            <p className="text-gray-500 text-center mb-8 max-w-md">
              We couldn't find any items matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  const urlParams = new URLSearchParams(window.location.search);
                  if (urlParams.get("category")) {
                    urlParams.delete("category");
                    window.location.search = urlParams.toString();
                  }
                  form.reset();
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Clear Search
              </Button>
            </div>
          </div>
        ) : (
          
            <InfiniteScroll
              pageStart={0}
              threshold={700}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-3 w-full pb-20"
              loadMore={() =>setTimeout(() => fetchNextPageData(),200)}
              hasMore={total > response?.data?.data?.length || false}
              loader={
                <>
               {[...Array(Math.floor(Math.random() * (4 - 2 + 1) + 2))].map((_, index) => (
            <div className="animate-pulse w-full my-5 h-72 mb-28" key={index}>
              <div className="p-4 h-full w-full mb-4 bg-gray-200 rounded-md"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
                </>
              }
            >
              
              {response?.data?.data?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </InfiniteScroll>
          // </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-10 w-full">
          {[...Array(10)].map((_, index) => (
            <div className="animate-pulse w-full h-72 mb-28" key={index}>
              <div className="p-4 h-full w-full mb-4 bg-gray-200 rounded-md"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductsContainer;
