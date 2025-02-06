import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import AddEditAddressDialog from "./_components/AddEditAddressDialog";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Address } from "@/types/profile";
import CustomConfirmDialog from "@/components/Layout/Dialogs/CustomConfirmDialog";

export default function MyAddresses() {
  const [open, setOpen] = useState(false);
  const [addresses, setAddress] = useState<Address[]>([]);
  const [selectedAddress,setSelectedAddress] = useState<Address | null>(null)


  const deleteAddress = async(addressId:string) =>{
    try {
      const res = await axiosInstance.delete(`address/${addressId}`)
      if(res.data?.statusCode == 201){
        toast.success(res?.data?.message || "Address Deleted Successfully");
        fetchAddresses()
      }else{
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error:any) {
      toast.error(error?.message || "Something went wrong");
    }
  }
  const fetchAddresses = async () => {
    const res = await axiosInstance.get("address");

    if (res.data?.statusCode == 200) {
      setAddress(res.data.data);
    } else {
      toast.error(res.data?.message || "Internal Server Error");
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);
  return (
    <>
      <Card className="h-full border-none shadow-lg">
        <CardHeader className="border-b bg-white rounded-t-lg">
          <div className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>My Addresses</CardTitle>
              <CardDescription>Manage your shipping addresses</CardDescription>
            </div>
            <Button
              className="hover:opacity-90"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add New Address
            </Button>
          </div>
        </CardHeader>
        <CardContent className="bg-white rounded-b-lg pt-4">
          <div className={` gap-3 grid  ${addresses && addresses.length > 0 ? "lg:grid-cols-2" : "grid-cols-1"}  `}>
            {addresses && addresses.length > 0 ? addresses.map((address) => (
              <Card key={address.id}>
                <CardHeader className="my-0 py-0 mt-4">
                  <CardTitle className="text-xl">{address.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-1">
                  <p>{address.address}</p>
                  Gujrat, Ahmedabad 380054
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() =>{ setSelectedAddress(address); setOpen(true)}}>Edit</Button>
                  <CustomConfirmDialog title="Delete Address" description="Are you sure you want to delete this address?" btnText="Delete" action={() => deleteAddress(address.id)} />
                </CardFooter>
              </Card>
            )) : <div className="min-h-[200px] text-center flex flex-col justify-center">No Address Found</div>}
          </div>
        </CardContent>
      </Card>
      <AddEditAddressDialog open={open} setOpen={setOpen} address={selectedAddress} refetch={fetchAddresses} />
    </>
  );
}
