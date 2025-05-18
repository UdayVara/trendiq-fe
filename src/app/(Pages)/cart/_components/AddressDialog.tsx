"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

export function AddressSelectorDialog({
  addresses,
  setDefaultAddress,
  defaultAddress,
}: any) {
  const [open, setOpen] = useState(false);

  const handleConfirm = (selected: any) => {
    setDefaultAddress(selected || null);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full max-w-md p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium">Delivery Address</h3>
            {defaultAddress ? (
              <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                <p>{defaultAddress.name}</p>
                <p>
                  {defaultAddress.address}, {defaultAddress.pincode}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No address selected
              </p>
            )}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-primary" size="sm">
                Change
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Select delivery address</DialogTitle>
                <DialogDescription>
                  Choose from your saved addresses or add a new one.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <RadioGroup
                  value={JSON.stringify(defaultAddress)}
                  onValueChange={(val)=>{setDefaultAddress(JSON.parse(val))}}
                  className="space-y-3"
                >
                  {addresses.map((address: any) => (
                    <div
                      key={address.id}
                      className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-accent"
                    >
                      <RadioGroupItem
                        value={JSON.stringify(address)}
                        id={`address-${address.id}`}
                        className="mt-1"
                      />
                      <div
                        className="flex-1 cursor-pointer"
                        // onClick={() => setDefaultAddress(JSON.stringify(address)}
                      >
                        <Label
                          htmlFor={`address-${address.id}`}
                          className="font-medium cursor-pointer"
                        >
                          {address.name}
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>{address.name}</p>
                          <p>
                            {address.address}, {address.pincode}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                
              </div>
              <DialogFooter className="flex flex-row justify-between sm:justify-between">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={()=>handleConfirm(defaultAddress)}>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
