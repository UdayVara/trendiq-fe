
import ProductsContainer from "./_components/ProductsContainer";
import axiosInstance from "@/lib/axios";
import React from "react";


const PageContainer = React.lazy(() => import("@/components/Layout/PageContainer"));

export default async function ProductListing() {
  const data = await axiosInstance.get("/product?page=1&size=50");
  return (
    <div className="min-h-screen bg-background">
      <PageContainer>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Trending Fashion
          </h1>

         
              <ProductsContainer data={data.data?.data || []} />
        </div>
      </PageContainer>
    </div>
  );
}
