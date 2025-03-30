"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Hero() {
  const images = [
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_2_copy_lgnEmET.jpg?format=webp&w=1500&dpr=1.3",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/nomad_homepage.jpg?format=webp&w=1500&dpr=1.3",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_5_copy_bvSeJSl.jpg?format=webp&w=1500&dpr=1.3",
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-restocked_2.jpg?format=webp&w=1500&dpr=1.3",
  ];

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
      <Carousel setApi={setApi} className="w-full h-min">
        <CarouselContent className="h-min relative">
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={1500}
                height={500}
                className="w-full max-w-full rounded-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

       
      </Carousel>

      {/* Clickable Dots Inside Active Slide */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4  px-3 py-1 rounded-full">
        {images.map((_, index) => (
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
