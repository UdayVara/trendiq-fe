"use client";
import { product } from "@/types/product";
import React, { useEffect, useRef } from "react";
import Filters from "./Filters";
import { getProducts } from "@/api/product.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import PageContainer from "@/components/Layout/PageContainer";
import ProductCard from "./ProductItem";
import { getCookie } from "@/lib/cookie";

function ProductsContainer({ data }: { data: product[]; wishlist: any[] }) {
  const queryClient = useQueryClient();
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
      getProducts(1, form.getValues("search"),getCookie("gender") || "male",form.getValues("category")),
    initialData: { success: true, message: "", data: data, wishlist: [] },
    staleTime:60 * 1000 ,
    
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["products", form.getValues("search"), getCookie("gender") || "male", form.getValues("category")] }); // Invalidate the query with the new search value.search, gender, current.category] });
    }, 300); // 300ms debounce
  };

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("category")){
      form.setValue("category",urlParams.get("category") || "all")
    }
  },[])

  return (
    <PageContainer>
      <Filters handleFilter={handleFilter} form={form} />
      {!response.isLoading || !response.isFetching || !response.isRefetching ||  response?.data?.data?.length != 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-3 w-full">
          {response?.data?.data?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
    </PageContainer>
  );
}

export default ProductsContainer;
