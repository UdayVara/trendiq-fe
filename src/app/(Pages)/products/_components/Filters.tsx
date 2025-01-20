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
  const updateQueryParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (value === "all" || value === "") {
      searchParams.delete(key); // Remove the parameter if its value is default
    } else {
      searchParams.set(key, value); // Set or update the parameter
    }
    // queryClient.invalidateQueries()
    handleFilter(1, searchParams.get("search") || "", searchParams.get("gender") || "", searchParams.get("category") || "")
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}?${searchParams.toString()}`
    );
  };

  const handleChange = (name: string, value: string) => {
    updateQueryParams(name, value);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for fashion items..."
          className="pl-10"
          name="search"
          onChange={(e) => {
            e.preventDefault();
            handleChange("search", e.target.value);
          }}
        />
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <Select
          //   value={filters.gender}
          onValueChange={(value) => {
            handleChange("gender", value);
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
          onValueChange={(value) => {
            handleChange("category", value);
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
            updateQueryParams("search", "");
            updateQueryParams("gender", "all");
            updateQueryParams("category", "all");
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
