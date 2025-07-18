"use client";
import { getSingleProudct } from "@/api/product.actions";
import LoginDialog from "@/components/Layout/Dialogs/LoginDialog";
import DotButtonLoader from "@/components/Layout/Loader/DotButtonLoader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axiosInstance from "@/lib/axios";
import { ProductInventory } from "@/types/cart";
import { SingleProduct } from "@/types/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function Details(data: { product: SingleProduct }) {
  const {id} = useParams()
  const initialProductData = data.product
  const user = useSession()
    const QueryData = useQuery({
    queryKey: ["product",id],
    queryFn: () => getSingleProudct(id as string,user?.data?.user?.email  as string || null),
    initialData:{success:true,data:initialProductData,message:"Product Fetched Successfully"},
  })

  const product = QueryData?.data?.data as SingleProduct
  const [selectedSize, setSelectedSize] = useState(
    product.product_inventory[0].size.id
  );

  const [btnLoading,setBtnLoading] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductInventory>(
    product.product_inventory[0]
  );
  const [selectedCart,setSelectedCart] = useState(
    product?.cart?.find((item : any) => item?.product_inventoryId == product?.product_inventory[0]) ?  product?.cart?.find((item : any) => item?.product_inventoryId == product?.product_inventory[0]) : product?.cart?.[0]
  )
  const colors = product?.availableColors || [];

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
    setBtnLoading(true)
    try {
      const response = await axiosInstance.post("/cart", {
        productId: product.id,
        quantity: 1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        inventoryId: product?.product_inventory?.find(
          (item:any) => item.size.id == selectedSize
        ).id,
      });
      if (response.data?.statusCode == 201) {
        setSelectedCart(response?.data?.data)
        toast.success(response.data.message || "Product Added Successfully");
        await queryClient.refetchQueries({ queryKey: ["product", id] });
        await queryClient.invalidateQueries({
          queryKey: ["user-cart-count"],
        })
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
    setBtnLoading(false)
  };

  const queryClient = useQueryClient();
  const handleDeleteCartItem = async (id:string) => {
    setBtnLoading(true);
    try {
      const res = await axiosInstance.delete(`/cart/${id}`);
      if (res.data?.statusCode == 201) {
        setSelectedCart(undefined)
        toast.success(`Item removed successfully`);
        await queryClient.refetchQueries({ queryKey: ["product", id] });
        await queryClient.invalidateQueries({
          queryKey: ["user-cart-count"],
        })
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }setBtnLoading(false)
  };
  const router = useRouter()
  console.log("Product", product);
  return (
    <div className="space-y-6 lg:col-span-6 col-span-12 md:px-0 px-2">
      <div>
        <h1 className="text-3xl font-bold">{product.title} <span className="capitalize">{product.color}</span></h1>
        <h3 className="text-lg text-neutral-600">{product.category.name}</h3>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex gap-x-0.5">
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
        <p className="text-2xl font-medium mt-4">₹ {Math.floor(selectedVariant?.price - (selectedVariant?.price * selectedVariant?.discount/100))?.toFixed(2)} <span className="text-muted-foreground text-xl font-regular line-through">{selectedVariant?.price?.toFixed(2)}</span><span className="text-xl text-green-600"> ({selectedVariant?.discount}%)</span></p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base">Color</Label>
          <RadioGroup
            onValueChange={(val)=>{router.push("/product/"+val+"")}}
            className="flex gap-3 mt-2"
          >
            {colors.map((color:any) => (
              <Label
                key={color.id}
                htmlFor={`color-${color.id}`}
                className="cursor-pointer max-w-[70px] text-center"
              >
                <RadioGroupItem
                  id={`color-${color.id}`}
                  value={color.id}
                  className="sr-only"
                />
                <div className="flex flex-col items-center gap-1">
                  <Image width={1000} height={1000} src={color?.imageUrl} alt={color.color}
                    className={`w-8 h-8 object-contain rounded-full border  ${
                      product.id === color.id
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                  />
                  <span className="text-sm capitalize">{color.color}</span>
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
              const product_inventory_variant = product.product_inventory.find(
                  (item: any) => item.size.id === value
                ) as ProductInventory
              setSelectedVariant(
                product_inventory_variant
              );

              setSelectedCart(
                product.cart.find(
                  (item: any) => item.product_inventoryId === product_inventory_variant?.id
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
      {selectedVariant?.stock <= selectedVariant?.minimum_stock ? <h4 className="text-red-600  text-lg font-semibold">
          Out of Stock
        </h4> :selectedVariant?.stock - 25 <= selectedVariant?.minimum_stock ? (
        <h4 className="text-yellow-600  text-lg font-semibold">
          Hurry Up Stock Running Out
        </h4>
      ) : (
        selectedVariant?.stock > selectedVariant?.minimum_stock && (
          <h4 className="text-green-600  text-lg font-semibold">In Stock</h4>
        )
      )}
      {user?.data?.user?.email != null || user?.data?.user?.email != undefined  ? selectedCart?.product_inventoryId == selectedVariant?.id ? <Button size="lg" variant={'outline'} className="w-full text-primary" disabled={selectedVariant?.stock  <= selectedVariant?.minimum_stock} onClick={()=>{
        handleDeleteCartItem(selectedCart?.id)
      }}>
        {!btnLoading ? "Remove From Cart" : <DotButtonLoader  isPrimary={true}/>}
      </Button> : <Button size="lg" variant={'outline'} className="w-full text-primary" disabled={selectedVariant?.stock  <= selectedVariant?.minimum_stock} onClick={addProductToCart}>
        {!btnLoading ? "Add to Cart" : <DotButtonLoader isPrimary={true} />}
      </Button> : <LoginDialog variant="outline" text="Add to Cart"/>}

      <Tabs defaultValue="description" className="w-full">
        <TabsList  className="grid w-full p-0 grid-cols-2 highlighted-list">
          <TabsTrigger value="description" className="my-0 duration-500 data-[state=active]:bg-primary data-[state=active]:text-white">Description</TabsTrigger>
          <TabsTrigger value="reviews" className="my-0 data-[state=active]:bg-primary data-[state=active]:text-white duration-500 ">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4 duration-500 transition-all">
          <div className="prose prose-sm">
            {product.description}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4 duration-500 transition-all">
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
