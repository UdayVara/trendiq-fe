"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const formSchema = z.object({
  name: z.string(),
  pincode: z.string(),
  address: z.string(),
});

function AddEditAddressDialog({
  open,
  setOpen,
  address,
  refetch
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  address?: any | null;
  refetch:() => Promise<void>
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: address?.name || "",
      pincode: address?.pincode || "",
      address: address?.address || "",
    },

  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (address) {
        const res = await axiosInstance.patch("address", {
            ...values,
            addressId:address?.id
          });
  
          if (res.data?.statusCode == 201) {
              setOpen(false)
              toast.success(res?.data?.message || "Address Added Successfully");
              form.reset()
              refetch()
          } else {
            toast.error(res.data?.message || "Internal Server Error");
          }
      } else {
        const res = await axiosInstance.post("address", {
          ...values,
        });

        if (res.data?.statusCode == 201) {
            setOpen(false)
            toast.success(res?.data?.message || "Address Added Successfully");
            form.reset()
            refetch()
        } else {
          toast.error(res.data?.message || "Internal Server Error");
        }
      }
    } catch (error: any) {
      console.error("Form submission error", error);
      toast.error(
        error?.message || "Failed to submit the form. Please try again."
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!address ? "Add" : "Edit"} Address</DialogTitle>
          <DialogDescription>
            Manage Your Shipping Address at one place
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-full  mx-auto pb-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name of location"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="pincode" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your Full Address here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEditAddressDialog;
