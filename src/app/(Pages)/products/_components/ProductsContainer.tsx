"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { product } from "@/types/product";
import Image from "next/image";
import React, { useRef } from "react";
import Filters from "./Filters";
import { getProducts } from "@/api/product.actions";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createWishlist, deleteWishlist } from "@/api/wishlist.actions";
import { useSession } from "next-auth/react";
import LoginDialog from "@/components/Layout/Dialogs/LoginDialog";
import { toast } from "sonner";
import PageContainer from "@/components/Layout/PageContainer";

function ProductsContainer({ data }: { data: product[] ,wishlist:any[]}) {
  const queryClient = useQueryClient()
  const user = useSession()
  const form = useForm({
      defaultValues: {
        search: "",
        gender: "all",
        category: "all",
      },
    })
  const response = useQuery({
    queryKey: ["products", form.watch("search"),
      form.watch("gender"),
      form.watch("category"),],
    queryFn: async () => getProducts(1,form.getValues("search"),form.getValues("gender"),form.getValues("category")),
    initialData:{success:true,message:"",data:data,wishlist:[]},
    
  })

  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  
    timeoutRef.current = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }, 300); // 300ms debounce
  };
  const router = useRouter()

  const handleAddWishlist = async (productId: string) => {
    try {
     const res = await createWishlist(productId)
      if (res.success) {
        toast.success(res.data.message || "Product Added to wishlist");
        queryClient.invalidateQueries({ queryKey: ["products", form.getValues("search"),
          form.getValues("gender"),
          form.getValues("category")] ,refetchType:"all"});
        response.refetch();
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  const handleRemoveWishlist = async (productId: string) => {
    try {
     const res = await deleteWishlist(productId)
      if (res.success) {
        toast.success(res.data.message || "Product Removed from wishlist");
        queryClient.invalidateQueries({ queryKey: ["products", form.getValues("search"),
          form.getValues("gender"),
          form.getValues("category")],refetchType:"all" });
        
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  return (
    <>
      <div>
        <PageContainer>
        <Filters handleFilter={handleFilter} form={form}/>
        {!response.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {response && response?.data && response?.data?.data?.map((product: any) => (
              <Card key={product.id}  className="hover:border hover:border-primary transition-all ">
                <CardContent onClick={() => {router.push("/product/"+product.id+"")}} className="p-4 group cursor-pointer">
                  <Image
                    width={1000}
                    height={1000}
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full group-hover:scale-105 overflow-hidden transition-all  duration-200 h-72 max-h-96 object-top object-cover mb-4 rounded-md"
                  />
                  <h3 className="font-semibold text-lg mb-2">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center">
                  <span className="text-lg font-medium  pl-0.5">
                        {(product.product_inventory[0].price - (product.product_inventory[0].price * product.product_inventory[0].discount)/100)} <span className="ms-3 text-sm line-through text-neutral-500 font-thin">{product.product_inventory[0].price}</span>
                        </span>
                    {product.isTrending && (
                      <Badge className="bg-red-100 text-red-800">
                        Trending
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {!user.data?.user ? <LoginDialog variant="outline" text="Add to Wishlist"/>: <>{product?.wishlist?.length === 0 ? <Button className="w-full text-primary hover:text-primary" size={"sm"} variant={"outline"} onClick={()=>{
                   handleAddWishlist(product.id)
                  }} >Add to Wishlist</Button> : <Button className="w-full text-primary hover:text-primary" size={"sm"} variant={"outline"} onClick={()=>{
                    handleRemoveWishlist(product?.wishlist?.[0]?.id || "")
                   }} >Remove From Wishlist</Button>}</>}
                  
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-10 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
              <div className="animate-pulse  w-full h-72 mb-28" key={index}>
                <div className="p-4 h-full w-full mb-4 bg-gray-200 rounded-md"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-full bg-gray-200 rounded mt-4"></div>
              </div>
            ))}
          </div>
        )}
        </PageContainer>
      </div>
    </>
  );
}

export default ProductsContainer;
