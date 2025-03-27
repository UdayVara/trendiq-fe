import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  useState } from "react";
import AddEditAddressDialog from "./_components/AddEditAddressDialog";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Address } from "@/types/profile";
import CustomConfirmDialog from "@/components/Layout/Dialogs/CustomConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import FullPageLoader from "@/components/Layout/Loader/FullPageLoader";

export default function MyAddresses() {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const query = useQueryClient();

  const deleteAddress = async (addressId: string) => {
    try {
      const res = await axiosInstance.delete(`address/${addressId}`);
      if (res.data?.statusCode == 201) {
        toast.success(res?.data?.message || "Address Deleted Successfully");
        query.invalidateQueries({ queryKey: ["addresses"] });
      } else {
        toast.error(res?.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const updateDefaultMutation = useMutation({
    mutationFn: async (addressId: string) => {
      return axiosInstance.patch(`address/default/${addressId}`);
    },
    onSuccess: (res) => {
      if (res.data?.statusCode == 201) {
        toast.success(res?.data?.message || "Address Updated Successfully");
        query.invalidateQueries({ queryKey: ["addresses"] });
      } else {
        toast.error(res?.data?.message || "Something went wrong");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => {
      return axiosInstance.get("address").then((res) => res.data);
    },
  });

  return (
    <>
      {isLoading  && <FullPageLoader />}
      <Card className="h-full border-none shadow-lg">
        <CardHeader className=" p-0 bg-white rounded-t-lg">
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
        <CardContent className={`bg-white  rounded-b-lg pt-4`}>
          <div
            className={` gap-3 grid   ${data?.data && data?.data?.length > 0 ? "lg:grid-cols-2" : "grid-cols-1"}  `}
          >
            {data?.data && data?.data.length > 0 ? (
              data?.data.map((address: Address) => (
                <Card key={address.id} className={`${updateDefaultMutation.isPending && updateDefaultMutation.variables == address.id ? "shadow-sm shadow-primary animate-ping animate-pulse" : "shadow-sm"}  relative`}>
                  {address.isDefault ? (
                    <Badge className="absolute bg-red-100 text-red-800 top-3 right-2">
                      Default
                    </Badge>
                  ) : (
                    <div className="absolute top-1 right-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <RadioGroup className="absolute top-1 right-2">
                              <RadioGroupItem
                                onClick={() => {
                                  updateDefaultMutation.mutate(address.id);
                                }}
                                className="w-5 h-5"
                                value={address.id}
                              />
                            </RadioGroup>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            sideOffset={28}
                            className="transition-all duration-200"
                          >
                            <p>Set as default</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                  <CardHeader className="my-0 py-0 mt-4">
                    <CardTitle className="text-xl">{address.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <p>{address.address}</p>
                    Gujrat, Ahmedabad 380054
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedAddress(address);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <CustomConfirmDialog
                      title="Delete Address"
                      description="Are you sure you want to delete this address?"
                      btnText="Delete"
                      action={() => deleteAddress(address.id)}
                    />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="min-h-[200px] text-center flex flex-col justify-center">
                No Address Found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <AddEditAddressDialog
        open={open}
        setOpen={setOpen}
        address={selectedAddress}
        refetch={refetch}
      />
    </>
  );
}
