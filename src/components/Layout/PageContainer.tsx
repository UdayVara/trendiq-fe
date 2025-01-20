import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="xl:px-14 lg:px-10 md:px-8 sm:px-6 px-4">
      <div>{children}</div>
    </div>
  );
}

export default PageContainer;
