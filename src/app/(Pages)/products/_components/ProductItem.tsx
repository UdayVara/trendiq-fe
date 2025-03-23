import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWishlist, deleteWishlist } from "@/api/wishlist.actions";
import { useSession } from "next-auth/react";
import LoginDialog from "@/components/Layout/Dialogs/LoginDialog";
import { toast } from "sonner";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useSession();
  // Add to Wishlist Mutation
  const addWishlistMutation = useMutation({
    mutationFn: createWishlist,
    onSuccess: async(res) => {
        await queryClient.invalidateQueries({ queryKey: ["products"] });
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
        await queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(res.data.message || "Product Removed from wishlist");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return (
    <Card key={product.id} className={` transition-all relative ${product.isTrending ? "md:pt-5 pt-3" : "pt-2"}  pb-0 `}>
      {product.isTrending && <Badge className="bg-red-100 text-red-800 top-1 right-1 w-min absolute">Trending</Badge>}
      <CardContent
        onClick={() => router.push("/product/" + product.id)}
        className="p-4 md:px-auto px-2 group cursor-pointer "
      >
        
        <Image
          width={1000}
          height={1000}
          src={product.imageUrl}
          alt={product.title}
          className="w-full group-hover:md:scale-105 overflow-hidden transition-all duration-200 h-72 md:max-h-96 max-h-44 object-top object-cover md:mb-4 mb-2 rounded-md"
        />
        <h3 className="font-semibold md:text-lg text-base md:mb-2 mb-0">{product.title}</h3>
        <div className="flex justify-between items-center">
          <span className="md:text-lg text-sm font-medium pl-0.5">
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
      <CardFooter className="w-full md:p-2 p-1 pb-3">
        {!user.data?.user ? (
          <LoginDialog variant="outline" text="Add to Wishlist" />
        ) : (
          <>
            {product?.wishlist?.length === 0 ? (
              <Button
                className="w-full text-sm text-primary hover:text-primary"
                size="sm"
                variant="outline"
                onClick={() => addWishlistMutation.mutate(product.id)}
                disabled={addWishlistMutation.isPending}
              >
                {addWishlistMutation.isPending ? 
                    <div className="flex text-sm flex-row items-center gap-2">Add to Wishlist  <div
                    className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-primary mx-auto"
                  ></div></div>
 : "Add to Wishlist"}
              </Button>
            ) : (
              <Button
                className="w-full text-primary hover:text-primary"
                size="sm"
                variant="outline"
                onClick={() => removeWishlistMutation.mutate(product?.wishlist?.[0]?.id || "")}
                disabled={removeWishlistMutation.isPending}
              >
                {removeWishlistMutation.isPending ? <div className="flex flex-row items-center gap-2">Remove From Wishlist
  <div
    className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-primary mx-auto"
  ></div>
 
</div>: "Remove From Wishlist"}
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
