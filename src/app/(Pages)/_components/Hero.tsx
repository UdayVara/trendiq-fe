"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@/lib/cookie";
import { getTrendingProducts } from "@/api/product.actions";

export default function Hero() {
  const { data,isLoading } = useQuery({
    queryKey: ["trending", getCookie("gender")],
    queryFn: () =>
      getTrendingProducts((getCookie("gender") as "male" | "female") || "male"),
    staleTime: 60 * 1000,
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  // Set API and update active index when slide changes
  React.useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="relative w-full">
      {/* Carousel */}
      <Carousel setApi={setApi} className=" relative w-full h-min">
        <CarouselContent className=" relative w-full ml-0">
          {data?.banner &&
            data?.banner?.length > 0 &&
            data?.banner?.map((src: any, index: any) => (
              <CarouselItem
                key={index}
                className="w-screen h-auto flex justify-center  pl-0 ml-0"
              >
                <picture>
                  {/* For tablets and smaller (max-width: 1024px), use mobileUrl */}
                  <source
                    media="(max-width: 768px)"
                    srcSet={src?.mobileImage}
                  />

                  {/* Fallback/default image for larger screens */}
                  <img
                    src={src?.defaultImage}
                    alt={`Slide ${index + 1}`}
                    className="w-full md:h-full object-cover"
                  />
                </picture>
              </CarouselItem>
            ))}

          {isLoading && [1, 2, 3, 4, ]?.map((_, index) => {
            return <CarouselItem className="relative w-full  bg-gray-300 animate-pulse overflow-hidden h-[65vh]" key={index}>
             
             </CarouselItem >
          })}
        </CarouselContent>
       
      </Carousel>

      {/* Clickable Dots Inside Active Slide */}
      <div className="absolute bottom-20 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4  px-3 py-1 rounded-full">
        {data?.banner?.map((_:any, index:any) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-primary scale-125" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
