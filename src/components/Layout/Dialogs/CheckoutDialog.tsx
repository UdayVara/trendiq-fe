"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import valid from "card-validator";



const formSchema = z.object({
  cardnumber: z.string().min(12, "Invalid card number"),
  cvv: z.string().min(3, "Invalid CVV").max(3, "Invalid CVV"),
  expiry: z.string().min(4, "Invalid expiry date").max(4, "Invalid expiry date"),
});

function CheckoutDialog() {
  const dialogTriggerRef = React.useRef<HTMLButtonElement>(null);
  const [cardType, setCardType] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    try {
      console.log(values);
      toast.success("Form submitted successfully!");
      dialogTriggerRef.current?.click();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
console.log(cardType)
  return (
    <Dialog >
      <DialogTrigger ref={dialogTriggerRef} className="w-full">
        <Button className="w-full">Proceed to Checkout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Enter your card details to complete the transaction securely.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-4 w-full"
          >
            <FormField
              control={form.control}
              name="cardnumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2 border p-2 rounded">
                      <input
                        {...field}
                        placeholder="Card Number"
                        className="outline-none flex-1"
                        onChange={(e) => {
                          field.onChange(e);
                          const numberValidation = valid.number(e.target.value);
                          setCardType(numberValidation.card ? numberValidation.card.type : "");
                        }}
                      />
                      {cardType &&  (
                        <img src={`/assets/${cardType}.png`} alt="Card provider" onError={() => setCardType("")} className="h-6 w-8 object-contain" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="CVV" type="number" {...field} onChange={(e) => field.onChange(e.target.value.slice(0, 3))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MMYY"
                          maxLength={7}
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.slice(0, 4))}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutDialog;
