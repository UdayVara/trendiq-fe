"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function ImageGallery({ images }: { images: string[] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <Image
          src={images[currentImageIndex]}
          alt="Product image"
          height={1000}
          width={1000}
          className="object-cover max-w-full object-top h-full rounded-lg"
        />
        <button
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev > 0 ? prev - 1 : images.length - 1
            )
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex((prev) =>
              prev < images.length - 1 ? prev + 1 : 0
            )
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="flex gap-4 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative w-20 aspect-square flex-shrink-0 rounded-lg overflow-hidden border-2 ${
              currentImageIndex === index
                ? "border-primary"
                : "border-transparent"
            }`}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
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
