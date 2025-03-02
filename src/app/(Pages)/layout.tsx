import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header/Header";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Header />
          <div>{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default layout;
