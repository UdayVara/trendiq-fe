"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTrendingProducts } from "@/api/product.actions";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";



export default function TrendingProducts() {

  const {data} = useQuery({
    queryKey:["trending"],
    queryFn:getTrendingProducts,
    staleTime:60*1000,
  })
 console.log("data : ",data)
const router = useRouter()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Trending Fashion
        </h2>
        <div className="w-full md:px-0 px-2">
         <Carousel>
            <CarouselContent>
              {!data?.data || data?.data?.length == 0 ? [1,2,3,4,5].map((item)=>
               <CarouselItem key={item} className="lg:basis-1/4 select-none"><div className="animate-pulse " key={item}>
                <div className="h-96 bg-gray-300 rounded-md mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-10 bg-gray-300 rounded mt-4"></div>
              </div></CarouselItem>
              ) :data?.data?.map((product:any,index:any) => (
                <CarouselItem key={index} className="lg:basis-1/4 select-none md:basis:1/3 sm:basis-1/2">
                  <Card className="" onClick={()=>{
router.push("/product/"+product.id+"")
                  }}>
                    <CardContent className="md:p-4 p-2 group">
                      <Image
                        width={1000}
                        height={1000}
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full group-hover:scale-105 duration-300 cursor-pointer h-96 max-h-96 object-top object-cover mb-4 rounded-md"
                      />
                      <h3 className="font-semibold text-lg mb-1">
                        {product.title}
                      </h3>
                      <div className="flex flex-col justify-start">
                        <Badge className="bg-red-100 w-max text-red-800">
                          {product?.category?.name}
                        </Badge>
                        <span className="text-lg font-medium  mt-2 pl-0.5">
                        {(product.product_inventory[0].price - (product.product_inventory[0].price * product.product_inventory[0].discount)/100)} <span className="ms-3 text-sm line-through text-neutral-500 font-thin">{product.product_inventory[0].price}</span>
                        </span>
                        
                      </div>
                    </CardContent>
                   
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
