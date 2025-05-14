
import { auth } from "@/auth";
import ProductsContainer from "./_components/ProductsContainer";
import axiosInstance from "@/lib/axios";
import React from "react";
import { cookies} from "next/headers";


const PageContainer = React.lazy(() => import("@/components/Layout/PageContainer"));


export default async function ProductListing({
  searchParams,
}: {
  searchParams: any
}) {
  const user = await auth()
  const cookieStore = await cookies()
  const params = await searchParams
  const categoryQuery = params.category;
  console.log("Category Query", categoryQuery);
  const data = await axiosInstance.get(`/product?page=1&size=12&userEmail=${user?.user?.email}&gender=${cookieStore.get("gender")?.value || "male"}&categoryId=${categoryQuery || ""}`);
  return (
    <div className="min-h-screen bg-background">
      <PageContainer>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Trending Fashion
          </h1>

         
              <ProductsContainer data={data.data?.data || []} wishlist={data.data?.wishlist || []} />
        </div>
      </PageContainer>
    </div>
  );
}
