// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createWishlist, deleteWishlist } from "@/api/wishlist.actions";
import { useSession } from "next-auth/react";
import LoginDialog from "@/components/Layout/Dialogs/LoginDialog";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Wishlist } from "@/types/wishlist";

interface ProductCardProps {
  product: any;
  wishListList:Wishlist[]
}

const ProductCard: React.FC<ProductCardProps> = ({ product,wishListList }) => {
  const router = useRouter();
  const user = useSession();
  const [wishlistData,setWishlistData] = useState(wishListList.find((item) => item.productId == product.id) ? true : false);
  // Add to Wishlist Mutation
  console.log("wishlist",product?.wishlist);
  const addWishlistMutation = useMutation({
    mutationFn: createWishlist,
    onSuccess: async(res) => {
        // await queryClient.invalidateQueries({ queryKey: ["products"] });
        setWishlistData(true);
        toast.success(res.data.message || "Product Added to wishlist");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  // Remove from Wishlist Mutation
  const removeWishlistMutation = useMutation({
    mutationFn: deleteWishlist,
    onSuccess: async(res) => {
        // await queryClient.invalidateQueries({ queryKey: ["products"] });
        setWishlistData(false);
        toast.success(res?.data?.message || "Product Removed from wishlist");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  console.log("widhilist ldata",product.id,wishlistData)

  return (
    <Card key={product.id} className={`h-max min-h-full transition-all flex flex-col relative `}>
      
      <CardContent
        onClick={() => router.push("/product/" + product.id)}
        className="p-4 pt-2  md:px-auto px-2 group grow cursor-pointer "
      >
        
        <Image
          width={1000}
          height={1000}
          src={product.imageUrl}
          alt={product.title}
          className="w-full group-hover:md:scale-105 overflow-hidden transition-all duration-200 h-full md:max-h-96 max-h-64 object-top object-cover md:mb-4 mb-2 rounded-md"
        />
        <h3 className="font-semibold md:text-lg capitalize text-sm md:mb-2 mb-0">{product.title}</h3>
        <div className="flex justify-between items-center">
          <span className="md:text-lg text-xs font-medium pl-0.5">
            ₹{" "}
            {Math.floor(
              product.product_inventory[0].price -
                (product.product_inventory[0].price * product.product_inventory[0].discount) / 100
            )}{" "}
            <span className="ms-1 text-sm line-through text-neutral-500 font-thin">
              {product.product_inventory[0].price}
            </span>
          </span>
          
        </div>
      </CardContent>
      <CardFooter className=" md:p-2 p-1 pb-3 absolute md:-top-52 -top-28 right-2  h-full">
        {!user.data?.user ? (
          <LoginDialog variant="outline" text="Add to Wishlist" isCustom={true}/>
        ) : (
          <>
          
            {wishlistData == false ? (
              <div className="w-8 h-8 rounded-full border-dashed border-primary">

              <Button
                className=" opacity-80 text-sm bg-none text-primary hover:text-primary w-7 h-7 border-primary border-spin rounded-full bg-white"
                size="sm"
                variant="ghost"
                onClick={() => addWishlistMutation.mutate(product.id)}
                disabled={addWishlistMutation.isPending}
                >
                
                 <Heart className="w-5 h-5 rounded transition-all"  color="#000000" />
              </Button>
                </div>
            ) : (
              <Button
                className="opacity-80 text-sm bg-none text-primary hover:text-primary w-7 h-7 rounded-full bg-white"
                size="sm"
                variant="ghost"
                onClick={() => removeWishlistMutation.mutate(product?.wishlist?.[0]?.id || "")}
                disabled={removeWishlistMutation.isPending}
              >
                <Heart className="w-5 h-5 rounded transition-all" fill="#D12033"  />
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
