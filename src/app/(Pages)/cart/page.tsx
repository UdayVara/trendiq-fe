import { getCart } from '@/api/cart.actions'
import CartItem from './_components/CartItem'
import OrderSummary from './_components/OrderSummary'
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react'



export default async function CartPage() {
  const cartItems = await getCart()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cartItems.data?.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-base text-gray-500">Looks like you haven't added any items to your cart yet.</p>
          <div className="mt-8">
            <Button size="lg" className="text-base font-medium">
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section aria-labelledby="cart-heading" className="lg:col-span-2">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className='flex flex-col gap-y-6'>
              {cartItems?.data.map((item:any) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </section>
          <OrderSummary cartItems={cartItems?.data} />
        </div>
      )}
    </div>
  )
}

