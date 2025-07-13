"use client";
import { getCategories } from "@/api/category.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCookie } from "@/lib/cookie";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

function Filters({
  handleFilter,
  form: { register, setValue, reset },
}: {
  handleFilter: () => void;
  form: UseFormReturn<
    {
      search: string;
      category: string;
    },
    any,
    undefined
  >;
}) {
  const gender = getCookie("gender") || "male";
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(gender),
    staleTime: 2 * 60 * 60 * 1000,
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for fashion items..."
          className="pl-10"
          {...register("search")}
          onChange={(e) => {
            setValue("search", e.target.value);
            handleFilter();
          }}
        />
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <Select
          //   value={filters.category}
          {...register("category")}
          onValueChange={(value) => {
            setValue("category", value);
            handleFilter();
          }}
        >
          <SelectTrigger className="w-full grow">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {isLoading ? (
              <SelectItem value="loading">Loading...</SelectItem>
            ) : (
              data?.data &&
              data?.data?.length > 0 &&
              data?.data?.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.delete("category");
            window.history.replaceState({}, "", url.toString());
            reset();
            handleFilter();
          }}
          className="bg-white w-ful grow text-red-600 border-red-600 hover:bg-red-50"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

export default Filters;
