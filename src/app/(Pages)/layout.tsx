import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header/Header";
import PageContainer from "@/components/Layout/PageContainer";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Header />
        <PageContainer>
          <div>{children}</div>
        </PageContainer>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default layout;
