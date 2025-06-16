"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, PlusIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import FullPageLoader from "@/components/Layout/Loader/FullPageLoader";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";

export default function CartItem({ item }: any) {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [removedialog, setRemovedialog] = useState(false);
  const queryClient = useQueryClient()
  const handleDeleteCartItem = async () => {
    setBtnLoading(true);
    try {
      const res = await axiosInstance.delete(`/cart/${item.id}`);
      if (res.data?.statusCode == 201) {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        await queryClient.invalidateQueries({
          queryKey: ["user-cart-count"],
        })
        toast.success(`Item removed successfully`);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
    setBtnLoading(false);
  };
  const addRemoveQuantity = async (type: string) => {
    try {
      if (type == "sub" && item.quantity == 1) {
        setRemovedialog(true);
        return;
      }
      setLoading(true);
      const res = await axiosInstance.patch("/cart", {
        cartId: item.id,
        productId: item?.product?.id,
        inventoryId: item?.product_inventory?.id,
        quantity: type == "add" ? item.quantity + 1 : item.quantity - 1,
      });

      if (res.data?.statusCode == 201) {
        await queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success(`Item quantity updated successfully`);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <li className={`border shadow-sm rounded-lg ${item?.product_inventory?.stock < item?.product_inventory?.minimum_stock ? "opacity-50" : ""}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Image
              src={item?.product?.imageUrl}
              alt={item?.product?.title}
              width={120}
              height={120}
              className="object-cover lg:h-auto max-h-56 object-center rounded-md"
            />
          </div>
          <div className="ml-4 flex-grow">
           
            <div className=" flex flex-row justify-between items-start pr-4 pt-2">
              <div className="sm:pr-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  <a href="#" className={`hover:text-gray-800 ${item?.product_inventory?.stock < item?.product_inventory?.minimum_stock  ? "text-gray-600 : " : ""} flex flex-row items-center`}>
                    {item?.product?.title}  <Button size={"sm"} onClick={()=>{
                      setRemovedialog(true)
                    }} variant={"ghost"} className='ml-auto text-primary block'><Trash2  size={18}/></Button>
                  </a>
                </h3>
                <p className="text-xs text-grey-600 mb-2">
                  Size : {item?.product_inventory?.size?.name}{" "}
                  <span className="ml-4">Color : {item?.product?.color} </span>
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {item?.product?.description}
                </p>
                {item?.product_inventory?.stock < item?.product_inventory?.minimum_stock && <p className="mt-1 text-sm text-red-500">Out of Stock</p>}
              </div>

              <div className="mt-4 sm:mt-0 flex items-center justify-between ">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-3 pt-1">
                    
                      <Minus className="w-6 h-6 p-1 rounded-full border-primary border text-primary cursor-pointer hover:bg-neutral-100 transition-all duration-100" onClick={()=>{addRemoveQuantity("sub")}} />
                    {item?.quantity}
                    
                      <PlusIcon className="w-6 h-6 p-1 rounded-full border-primary border text-primary cursor-pointer hover:bg-neutral-100 transition-all duration-100" onClick={()=>{addRemoveQuantity("add")}} />
                    
                  </div>
                  <p className="text-base font-medium text-gray-900 mt-4">
                    ₹{" "}
                    {(item?.product_inventory?.price * item.quantity).toFixed(
                      2
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <AlertDialog open={removedialog} onOpenChange={setRemovedialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove this item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={btnLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteCartItem();
              }}
            >
              Continue 
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
