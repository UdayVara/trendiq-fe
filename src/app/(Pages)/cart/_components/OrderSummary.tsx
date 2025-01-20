import { Button } from "@/components/ui/button"

interface OrderSummaryProps {
  cartItems: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
}

export default function OrderSummary({ cartItems }: OrderSummaryProps) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 10 // Example shipping cost
  const tax = subtotal * 0.1 // Example tax rate of 10%
  const total = subtotal + shipping + tax

  return (
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
          <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
          </dt>
          <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button className="w-full">
          Proceed to Checkout
        </Button>
      </div>
    </section>
  )
}

