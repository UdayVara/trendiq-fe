"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axiosInstance from "@/lib/axios";
import ButtonLoader from "../Loader/ButtonLoader";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

function CheckoutDialog({setOpen}:{setOpen:Dispatch<SetStateAction<boolean>>}) {
  const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        const response = await axiosInstance.post("/stripe/create-payment-intent");

        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          toast.error("Failed to get payment intent.");
        }
      } catch (error) {
        console.error("Payment Intent Error:", error);
        toast.error("Error creating payment intent.");
      }
    }

    fetchClientSecret();
  }, []);

  return (
    <Dialog defaultOpen onOpenChange={(val)=>{
      if(!loading){
        setOpen(val)
      }
    }}>
      <DialogTrigger ref={dialogTriggerRef} className="w-full">
        
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>Enter your card details to complete the transaction securely.</DialogDescription>
        </DialogHeader>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm loading={loading} setLoading={setLoading} dialogTriggerRef={dialogTriggerRef} clientSecret={clientSecret} />
          </Elements>
        ) : (
          <p>Loading payment details...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PaymentForm({ dialogTriggerRef, clientSecret ,loading,setLoading}: { dialogTriggerRef: React.RefObject<HTMLButtonElement | null>; clientSecret: string ,setLoading: React.Dispatch<React.SetStateAction<boolean>>,loading:boolean}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const form = useForm();

  async function onSubmit() {
    setLoading(true);
    if (!stripe || !elements) {
      toast.error("Stripe failed to initialize.");
      return;
    }

    try {
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card details missing.");
      return;
    }
  

    // ✅ Pass the actual clientSecret value
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) {
      toast.error(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      const completeOrder = await axiosInstance.post("/stripe/complete-payment",{
        intentId:paymentIntent?.id,
        shippingId:"cd9ee255-8aad-4b98-afcd-79328f48039e"
      });
      if(completeOrder.data.statusCode == 201){
        toast.success("Payment Successful!");
        dialogTriggerRef.current?.click();
        router.replace("/")
      }else{
        toast.error("Failed to complete payment");
      }
      
    }
  } catch (error:any) {
    toast.error(error?.message || "Payment failed");
  }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4 w-full">
        <FormItem>
          <FormLabel>Card Details</FormLabel>
          <FormControl>
            <div className="border p-2 rounded">
              <CardElement options={{ style: { base: { fontSize: "16px" } }, hidePostalCode: true  }} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button type="submit" disabled={!stripe || loading}>
          Submit {loading && <ButtonLoader /> }
        </Button>
        {loading && <h6 className="text-center my-0 py-0">Do not close this page</h6>}
      </form>
    </Form>
  );
}

export default CheckoutDialog;
