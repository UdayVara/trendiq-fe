import { getCart } from '@/api/cart.actions'
import CartContainer from './_components/CartContainer'



export default async function CartPage() {
  const cartItems = await getCart()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
       
        <CartContainer data={cartItems} />
    
    </div>
  )
}

