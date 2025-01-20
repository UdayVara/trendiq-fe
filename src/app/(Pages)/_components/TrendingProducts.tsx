
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

const products = [
  {
    id: 1,
    name: "Bold Graphic T-Shirt",
    price: 29.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727708290_1925294.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 2,
    name: "Statement Hoodie",
    price: 49.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1665832747_8175070.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 3,
    name: "Edgy Ripped Jeans",
    price: 59.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691039125_6391875.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 4,
    name: "Leather Biker Jacket",
    price: 89.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1732859746_1094580.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 1,
    name: "Bold Graphic T-Shirt",
    price: 29.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727708290_1925294.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 2,
    name: "Statement Hoodie",
    price: 49.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1665832747_8175070.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 3,
    name: "Edgy Ripped Jeans",
    price: 59.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691039125_6391875.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 4,
    name: "Leather Biker Jacket",
    price: 89.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1732859746_1094580.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 1,
    name: "Bold Graphic T-Shirt",
    price: 29.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727708290_1925294.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 2,
    name: "Statement Hoodie",
    price: 49.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1665832747_8175070.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 3,
    name: "Edgy Ripped Jeans",
    price: 59.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1691039125_6391875.jpg?format=webp&w=480&dpr=1.3",
  },
  {
    id: 4,
    name: "Leather Biker Jacket",
    price: 89.99,
    image:
      "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1732859746_1094580.jpg?format=webp&w=480&dpr=1.3",
  },
];

export default function TrendingProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Trending Fashion
        </h2>
        <div className="w-full md:px-0 px-6">
          <Carousel>
            <CarouselContent>
              {products.map((product,index) => (
                <CarouselItem key={index} className="md:basis-1/3 select-none">
                  <Card>
                    <CardContent className="p-4">
                      <Image
                        width={1000}
                        height={1000}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 max-h-96 object-top object-cover mb-4 rounded-md"
                      />
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">
                        ₹ {product.price.toFixed(2)}
                        </span>
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
