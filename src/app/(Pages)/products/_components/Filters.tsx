"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

function Filters({
  handleFilter,
}: {
  handleFilter: (
    pageNumber: number,
    search: string,
    gender: string,
    category: string
  ) => Promise<void>;
}) {
  
  const {register,setValue,getValues,reset} = useForm({
    defaultValues: {
      search: "",
      gender: "all",
      category: "all",
    },

  })
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for fashion items..."
          className="pl-10"
          {...register("search")}
          onChange={(e) => {
            handleFilter(1, e.target.value, "all", "all");
          }}
        />
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <Select
        {...register("gender")}
          //   value={filters.gender}
          onValueChange={(value) => {
            setValue("gender", value);
            handleFilter(1, getValues().search, value, getValues().category);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Men</SelectItem>
            <SelectItem value="female">Women</SelectItem>
            <SelectItem value="unisex">Unisex</SelectItem>
          </SelectContent>
        </Select>
        <Select
          //   value={filters.category}
          {...register("category")}
          onValueChange={(value) => {
            setValue("category", value);
            handleFilter(1, getValues().search, getValues().gender , value);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="T-Shirts">T-Shirts</SelectItem>
            <SelectItem value="Hoodies">Hoodies</SelectItem>
            <SelectItem value="Jeans">Jeans</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            reset()
            handleFilter(1, "", "all", "all");
          }}
          className="bg-white text-red-600 border-red-600 hover:bg-red-50"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

export default Filters;
