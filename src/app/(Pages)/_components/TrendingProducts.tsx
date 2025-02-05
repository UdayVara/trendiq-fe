"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { getTrendingProducts } from "@/api/product.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function TrendingProducts() {
  const [products,setProducts] = useState<any[]>([])

  const fetchTrendingProducts = async () => {
    const res = await getTrendingProducts()
console.log("res",res)
    if(res.success){
      setProducts(res.data)
    }else{
      toast.error(res.message)
    }
  }
const router = useRouter()
  useEffect(()=>{
fetchTrendingProducts()
  },[])
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Trending Fashion
        </h2>
        <div className="w-full md:px-0 px-6">
         <Carousel>
            <CarouselContent>
              {!products || products?.length == 0 ? [1,2,3].map((item)=>
               <CarouselItem key={item} className="md:basis-1/3 select-none"><div className="animate-pulse " key={item}>
                <div className="h-96 bg-gray-300 rounded-md mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-10 bg-gray-300 rounded mt-4"></div>
              </div></CarouselItem>
              ) :products?.map((product,index) => (
                <CarouselItem key={index} className="md:basis-1/3 select-none">
                  <Card className="" onClick={()=>{
router.push("/product/"+product.id+"")
                  }}>
                    <CardContent className="p-4 group">
                      <Image
                        width={1000}
                        height={1000}
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full group-hover:scale-105 duration-300 cursor-pointer h-96 max-h-96 object-top object-cover mb-4 rounded-md"
                      />
                      <h3 className="font-semibold text-lg mb-2">
                        {product.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        {/* <span className="text-xl font-bold">
                        ₹ {product.product_inventory[0].price.toFixed(2)}
                        </span> */}
                        <Badge className="bg-red-100 text-red-800">
                          Trending
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
