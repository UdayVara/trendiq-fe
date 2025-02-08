import CheckoutDialog from "@/components/Layout/Dialogs/CheckoutDialog"
import { Button } from "@/components/ui/button"



export default function OrderSummary({ cartItems }:any) {
  const subtotal = cartItems.reduce((total:any, item:any) => total + item?.product_inventory?.price * item.quantity, 0)
  const discount = Math.round(cartItems.reduce((total:any, item:any) => total + ((item?.product_inventory?.discount * item?.product_inventory?.price) / 100) * item.quantity, 0)) // Example shipping cost
  const total = subtotal - discount +100
  return (
    <div className="space-y-6">
 <div className="pl-2">
  <div className="address-header flex flex-row items-start justify-between">

                  <h2 className="font-semibold text-lg mb-2 ">Delivery Address</h2>
                  <Button variant={"ghost"} className="hover:bg-transparent text-primary p-0" size={"sm"}>Change</Button>
  </div>
                  <div className="text-sm space-y-1 text-muted-foreground pl-2">
                    <p className="font-medium text-foreground">John Smith</p>
                    <p>123 Main Street, Apartment 4B</p>
                    <p>Mumbai, Maharashtra 400001</p>
                    <p>Phone: +91 98765 43210</p>
                  </div>
                  
                </div>
    <section
      aria-labelledby="summary-heading"
      className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0"
    >
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900 mb-4">
        Order Summary
      </h2>

      <dl className="space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">₹ {subtotal}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Discount</span>
          </dt>
          <dd className="text-sm font-medium text-green-600">₹ {discount}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
          </dt>
          <dd className="text-sm font-medium text-gray-900">₹ 100</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="text-lg font-medium text-gray-900">Order total</dt>
          <dd className="text-lg font-medium text-gray-900">₹ {total}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <CheckoutDialog />
      </div>
    </section>

      </div>
  )
}

