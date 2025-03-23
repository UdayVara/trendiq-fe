"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ImageGallery({ images }: { images: { imageUrl: string }[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Initial sync
    setCurrent(api.selectedScrollSnap());

    // Listen for slide changes
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    api?.scrollTo(index);
  };

  return (
    <div className="space-y-4 lg:col-span-5 col-span-12">
      <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="relative aspect-square">
                <Image
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover  object-top rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10" />
        </div>
      </Carousel>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-20 aspect-square flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              current === index ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
