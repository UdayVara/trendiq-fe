"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { product } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import Filters from "./Filters";
import { getProducts } from "@/api/product.actions";
import { useRouter } from "next/navigation";

function ProductsContainer({ data }: { data: product[] }) {
  const [products, setProducts] = useState<product[]>(data);
  const [loading, setLoading] = useState(false);
  const handleFilter = async (
    pageNumber: number,
    search: string,
    gender: string,
    category: string
  ) => {
    setLoading(true);
    console.log(pageNumber, search, gender, category);
    const products = await getProducts(pageNumber, search, gender, category);
    console.log("Products",products)
    setProducts(products.data);
    setLoading(false)
  };
  const router = useRouter()

  return (
    <>
      <div>
        <Filters handleFilter={handleFilter} />
        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {products.map((product: any, index: any) => (
              <Card key={index} >
                <CardContent onClick={() => {router.push("/product/"+product.id+"")}} className="p-4 group cursor-pointer">
                  <Image
                    width={1000}
                    height={1000}
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full group-hover:scale-105 overflow-hidden transition-all duration-200 h-72 max-h-96 object-top object-cover mb-4 rounded-md"
                  />
                  <h3 className="font-semibold text-lg mb-2">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                      ₹ {product?.product_inventory[0]?.price.toFixed(2)}
                    </span>
                    {product.isTrending && (
                      <Badge className="bg-red-100 text-red-800">
                        Trending
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-10 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
              <div className="animate-pulse  w-full h-72 mb-28" key={index}>
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
      </div>
    </>
  );
}

export default ProductsContainer;
