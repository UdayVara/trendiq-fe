"use client";
import React from "react";
import CartItem from "./CartItem";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/api/cart.actions";
import OrderSummary from "./OrderSummary";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function CartContainer({
  data,
}: {
  data: {
    success: boolean;
    data: any;
    message: any;
    addresses:any;
    cartSummary:any
  };
}) {
  const cartRes = useQuery({
    queryKey: [`cart`],
    queryFn: async () => getCart(),
    initialData: data,
    placeholderData:(prevData)=>prevData,
    staleTime:0
  });
  const router = useRouter();
  console.log("result",cartRes?.data?.data?.some(
      (item: any) =>
        item.product_inventory?.stock < item.product_inventory?.minimum_stock))
  return (
    <>
      {cartRes.data.data?.length == 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-xl font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Looks like you haven&lsquo;t added any items to your cart yet.
          </p>
          <div className="mt-8">
            <Button onClick={() => router.push("/products")} size="lg" className="text-base font-medium">
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section aria-labelledby="cart-heading" className="lg:col-span-2">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="flex flex-col gap-y-6">
              {cartRes?.data.data?.map((item: any) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </section>
          <OrderSummary  isOutOfStock={
    cartRes?.data?.data?.some(
      (item: any) =>
        item.product_inventory?.stock < item.product_inventory?.minimum_stock
    ) || false
  } cartItems={cartRes?.data?.data} addresses={cartRes?.data?.addresses} cartSummary={cartRes?.data?.cartSummary}/>
        </div>
      )}
    </>
  );
}

export default CartContainer;
