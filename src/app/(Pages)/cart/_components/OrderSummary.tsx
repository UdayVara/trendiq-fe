import CheckoutDialog from "@/components/Layout/Dialogs/CheckoutDialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import { AddressSelectorDialog } from "./AddressDialog";

export default function OrderSummary({addresses,cartSummary }: any) {
  const [defaultAddress,setDefaultAddress] = useState(addresses.find((address: any) => address.isDefault));
  const [loading,setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleGetCheckoutLink = async() =>{
    setLoading(true)
    try {
      const res = await axiosInstance.post("/stripe/create-payment-intent",{
        shippingId:defaultAddress?.id
      });

      if(res.data?.statusCode == 200){
        setLoading(false)
        window.open(res.data.url, "_blank")
      }else{
        toast.error(res.data.message || "Failed to Crate Session")
      }
    } catch (error:any) {
      toast.error(error?.message || "Something went wrong")
    }
    setLoading(false)
  }
  return (
    <div className="space-y-6">
      <AddressSelectorDialog  defaultAddress={defaultAddress} setDefaultAddress={setDefaultAddress} addresses={addresses}/>
      <section
        aria-labelledby="summary-heading"
        className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0"
      >
        <h2
          id="summary-heading"
          className="text-lg font-medium text-gray-900 mb-4"
        >
          Order Summary
        </h2>

        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">₹ {cartSummary?.amount}</dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="flex items-center text-sm text-gray-600">
              <span>Discount</span>
            </dt>
            <dd className="text-sm font-medium text-green-600">₹ {cartSummary?.discount}</dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="flex text-sm text-gray-600">
              <span>Tax estimate ( CGST + SGST )</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">₹ {cartSummary?.gst}</dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="text-lg font-medium text-gray-900">Order total</dt>
            <dd className="text-lg font-medium text-gray-900">₹ {cartSummary?.finalAmount}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <Button
            className="w-full"
            onClick={() => {
              handleGetCheckoutLink();
            }}
          >
            Proceed to Checkout {loading &&  
<div
  className="w-6 h-6 border-t-2 border-transparent border-t-white rounded-full animate-spin"
></div>
}
          </Button>
        </div>

        {open && <CheckoutDialog setOpen={setOpen} addressId={defaultAddress?.id}/>}
      </section>
    </div>
  );
}
