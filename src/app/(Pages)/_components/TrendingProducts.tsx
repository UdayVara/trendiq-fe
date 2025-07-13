"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTrendingProducts } from "@/api/product.actions";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "@/lib/cookie";



export default function TrendingProducts() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const {data} = useQuery({
    queryKey:["trending",getCookie("gender")],
    queryFn:() => getTrendingProducts(getCookie("gender") as "male" | "female"),
    staleTime:60*1000,
  })
const router = useRouter()

useEffect(() => {
  if (!api) {
    return
  }

  setCurrent(api.selectedScrollSnap() + 1)

  api.on("select", () => {
    setCurrent(api.selectedScrollSnap() + 1)
  })
}, [api])

  return (
    <section className="lg:py-16 py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Trending Fashion
        </h2>
        <div className="w-full md:px-0 px-2 ">
         {(!data?.data || data?.data?.length == 0 ) &&<Carousel >
            <CarouselContent>
              {[1,2,3,4,5].map((item)=>
               <CarouselItem key={item} className="lg:basis-1/4 select-none"><div className="animate-pulse " key={item}>
                <div className="h-96 bg-gray-300 rounded-md mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-10 bg-gray-300 rounded mt-4"></div>
              </div></CarouselItem>
              ) }
            </CarouselContent>
            <CarouselPrevious className="md:inline-flex hidden"/>
            <CarouselNext className="md:inline-flex hidden"/>
          </Carousel>}
        {data?.data &&  data?.data?.length > 0 && <Carousel  setApi={setApi}>
            <CarouselContent>
              {data?.data?.map((product:any,index:any) => (
                <CarouselItem key={index} className="lg:basis-1/4 select-none md:basis-1/3  sm:basis-1/2">
                  <Link href={`/product/${product.id}`} ><Card className="" onClick={()=>{
router.push("/product/"+product.id+"")
                  }}>
                    <CardContent className="md:p-4 p-2 group">
                      <Image
                        width={1000}
                        height={1000}
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full group-hover:scale-105 duration-300 cursor-pointer h-96 lg:max-h-96 max-h-80 object-top object-cover mb-4 rounded-md"
                      />
                      <h3 className="font-semibold text-lg mb-1">
                        {product.title}
                      </h3>
                      <div className="flex flex-col justify-start">
                        <Badge className="bg-red-100 w-max text-red-800">
                          {product?.category?.name}
                        </Badge>
                        <span className="text-lg font-medium  mt-2 pl-0.5">
                        ₹ {Math.floor(product.product_inventory[0].price - (product.product_inventory[0].price * product.product_inventory[0].discount)/100)} <span className="ms-3 text-sm line-through text-neutral-500 font-thin">{product.product_inventory[0].price}</span>
                        </span>
                        
                      </div>
                    </CardContent>
                   
                  </Card></Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="md:inline-flex hidden"/>
            <CarouselNext className="md:inline-flex hidden"/>
          </Carousel>}
          {
            data?.data && data?.data?.length > 1 && (
              <div className="flex md:hidden  items-center justify-center mt-4 gap-4">
                {Array.from({ length: data?.data?.length > 5 ? 5 : data?.data?.length }).map((_, index) => (
                    <span onClick={() => {api?.scrollTo(index)}} key={index} className={`w-3 cursor-pointer shrink-0 h-3 rounded-full  ${current == index +1 ? "bg-gray-500" : "bg-gray-200"} `}></span>
                ))}
              </div>)
          }
        </div>
      </div>
    </section>
  );
}
