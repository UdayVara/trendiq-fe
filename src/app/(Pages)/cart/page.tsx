import { getCart } from '@/api/cart.actions'
import CartContainer from './_components/CartContainer'
import PageContainer from '@/components/Layout/PageContainer'



export default async function CartPage() {
  const cartItems = await getCart()
  return (
    <div className="">
      <PageContainer>

      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
       
        <CartContainer data={cartItems} />
      </PageContainer>
    
    </div>
  )
}

