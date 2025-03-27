import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft } from "lucide-react";
// import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { Dispatch } from "react";

function SingleOrder({
  order,
  setSelected,
}: {
  order: any;
  setSelected: Dispatch<any>;
}) {
  console.log("Order", order);
  return (
    <div className="pb-2">
      <div className="mb-6 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <h4
            onClick={() => {
              setSelected(null);
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to orders</span>
          </h4>
          <h2 className="text-lg font-medium">Order Details</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-sm font-medium">Order #{order.orderId}</h3>
          <Badge variant={order.status === "pending" ? "outline" : "default"}>
            {order.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Placed on {moment(order.createdAt).format("MMM DD, YYYY")}
        </p>
      </div>

      {/* Order Timeline */}
      {/* <div className="mb-8 bg-muted/30 p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-4">Order Status</h3>
      <div className="relative">
        {order.timeline.map((step:any, index:any) => (
          <div key={index} className="flex mb-6 last:mb-0">
            <div className="mr-4 relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  step.completed ? "bg-primary text-primary-foreground" : "bg-muted border",
                )}
              >
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              {index < order.timeline.length - 1 && (
                <div
                  className={cn(
                    "absolute top-8 left-4 w-0.5 h-6",
                    step.completed ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
              )}
            </div>
            <div>
              <p className="font-medium text-sm">{step.status}</p>
              <p className="text-xs text-muted-foreground">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div> */}

      {/* Order Items */}
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.products.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 p-3 border rounded-lg">
              <div className="flex-shrink-0">
                <Image
                  src={item?.imageUrl}
                  alt={item?.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{item?.title}</h4>
                <div className="grid w-max grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
                  <p className="text-muted-foreground">Color:</p>
                  <p>{item?.color}</p>
                  <p className="text-muted-foreground">Size:</p>
                  <p>{item?.size?.name}</p>
                  <p className="text-muted-foreground">Quantity:</p>
                  <p>{item?.quantity}</p>
                </div>
              </div>
              <div className="flex-shrink-0 font-medium">₹{item.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <div>
          <h3 className="text-sm font-medium mb-3">Shipping Address</h3>
          <div className="p-3 border rounded-lg">
            <p className="font-medium">{order.address.name}</p>
            <p>{order.address.address}</p>
          </div>
        </div>

        {/* Payment Information */}
        <div>
          <h3 className="text-sm font-medium mb-3">Payment Information</h3>
          <div className="p-3 border rounded-lg">
            <p className="mb-2">Card</p>
            <Separator className="my-3" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  ₹{order.finalAmount - +(order.finalAmount * 0.18).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{(+order.finalAmount * 0.18).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{order.finalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-8 flex justify-end gap-3">
        <Button variant="outline">Need Help?</Button>
        <Button>Track Order</Button>
      </div>
    </div>
  );
}

export default SingleOrder;
