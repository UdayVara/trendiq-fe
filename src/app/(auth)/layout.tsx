import Header from "@/components/Layout/Header/Header";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header key={"auth-header"} hideOptions={true}/>
      <div>{children}</div>
      
    </>
  );
}

export default layout;
