"use client"
import { deleteWishlist, getWishlist } from "@/api/wishlist.actions"
import FullPageLoader from "@/components/Layout/Loader/FullPageLoader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { toast } from "sonner"

export default function Wishlist() {
 const queryClient = useQueryClient()
  const {data,isLoading} = useQuery({
    queryKey:["wishlist"],
    queryFn: () => getWishlist(),
    refetchOnMount: true
  })
  
  const removeWishlist = async (wishlistId: string) => {
try {
  const res = await deleteWishlist(wishlistId)

  if(res.success){
    toast.success(res.message || "Product Removed to wishlist");
    queryClient.invalidateQueries({
      queryKey:["wishlist"]
    })
  }else{
    toast.error(res?.message || "Something went wrong");
  }
} catch (error:any) {
  toast.error(error?.message || "Something went wrong");
}
  } 
  return (
    <>
    {isLoading && <FullPageLoader />}
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data && data?.data && data?.data?.length > 0 ? data?.data?.map((item:any) => (
        <Card key={item.id} className="pt-4">
         
          <CardContent className="mb-0 pb-5">
            <Image
              src={item?.product?.imageUrl || "/placeholder.svg"}
              alt={item.name}
              width={1000}
              height={1000}
              className="mx-auto max-w-full h-auto object-contain w-full"
            />
            <h6 className="mt-2 text-lg">{item.product?.title}</h6>
          </CardContent>
          <CardFooter className="flex justify-between w-full">
            <Button onClick={()=>{
              removeWishlist(item.id)
            }} variant="outline" className="w-full text-primary hover:text-primary hover:bg-red-50">Remove</Button>
            
          </CardFooter>
        </Card>
      )):<div className="w-full col-span-12"><h4 className="text-center w-full my-10">No items in wishlist</h4></div>}
    </div>
      </>
  )
}

