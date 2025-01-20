"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axios";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function Details({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState(
    product.product_inventory[0].size.id
  );
  const [selectedVariant, setSelectedVariant] = useState(
    product.product_inventory[0]
  );
  const colors = [
    { id: product.color, name: product.color, class: "bg-black" },
  ];

  const sizes = [...product.product_inventory];
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      comment: "Amazing quality and perfect fit! Will definitely buy more.",
      date: "2023-12-15",
    },
    {
      id: 2,
      author: "John D.",
      rating: 4,
      comment: "Great product, shipping was quick.",
      date: "2023-12-10",
    },
  ];

  const addProductToCart = async () => {
    try {
      const response = await axiosInstance.post("/cart", {
        productId: product.id,
        quantity: 1,
        inventoryId: product.product_inventory?.find(
          (item:any) => item.size.id == selectedSize
        ).id,
      });
      if (response.data?.statusCode == 201) {
        toast.success(response.data.message || "Product Added Successfully");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <h3 className="text-lg text-neutral-600">{product.category.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < 4 ? "fill-primary" : "fill-muted stroke-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground">(128 reviews)</span>
        </div>
        <p className="text-2xl font-bold mt-4">₹29.99</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base">Color</Label>
          <RadioGroup
            value={selectedColor}
            onValueChange={setSelectedColor}
            className="flex gap-3 mt-2"
          >
            {colors.map((color) => (
              <Label
                key={color.id}
                htmlFor={`color-${color.id}`}
                className="cursor-pointer"
              >
                <RadioGroupItem
                  id={`color-${color.id}`}
                  value={color.id}
                  className="sr-only"
                />
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full border  ${
                      selectedColor === color.id
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                  />
                  <span className="text-sm">{color.name}</span>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className="text-base">Size</Label>
          <RadioGroup
            value={selectedSize}
            onValueChange={(value) => {
              setSelectedSize(value);
              setSelectedVariant(
                product.product_inventory.find(
                  (item: any) => item.size.id === value
                )
              );
            }}
            className="flex gap-3 mt-2"
          >
            {sizes.map((size) => (
              <Label
                key={size?.size?.id}
                htmlFor={`size-${size?.size?.id}`}
                className={`border rounded-md px-4 py-2 cursor-pointer ${
                  selectedSize === size?.size?.id
                    ? "bg-primary/10 border-primary"
                    : ""
                }`}
              >
                <RadioGroupItem
                  id={`size-${size?.size?.id}`}
                  value={size?.size?.id}
                  className="sr-only"
                />
                {size?.size?.name?.toUpperCase()}
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>

      {}
      {selectedVariant?.stock - 25 <= selectedVariant?.minimum_stock ? (
        <h4 className="text-yellow-600  text-lg font-semibold">
          Hurry Up Stock Running Out
        </h4>
      ) : (
        selectedVariant?.stock > selectedVariant?.minimum_stock && (
          <h4 className="text-green-600  text-lg font-semibold">In Stock</h4>
        )
      )}
      <Button size="lg" className="w-full" onClick={addProductToCart}>
        Add to Cart
      </Button>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <div className="prose prose-sm">
            <p>
              The Bold Graphic T-Shirt features a striking design that makes a
              statement. Crafted from premium cotton blend fabric, this
              oversized fit t-shirt offers both style and comfort.
            </p>
            <ul className="mt-4 space-y-2">
              <li>100% premium cotton blend</li>
              <li>Oversized fit</li>
              <li>Machine washable</li>
              <li>Unique graphic print</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {review.date}
                  </time>
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Details;
