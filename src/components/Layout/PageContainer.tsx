import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="xl:px-14 lg:px-10 md:px-8 sm:px-4 px-2 ">
      <div>{children}</div>
    </div>
  );
}

export default PageContainer;
