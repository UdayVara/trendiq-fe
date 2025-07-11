import Link from 'next/link'
import { auth } from '@/auth'
import PublicNavigator from './PublicNavigator'
import GenderToggle from './GenderToggle'
import MobileGenderButtons from './MobileGenderButtons'
import {  ShoppingCart, User } from 'lucide-react'
import { ProductSearchToggle } from './ProductSearchToggle'
import CartCount from './CartCount'
import RightSideNavbar from './RightSideNavbar'

export default async function Header({hideOptions = false}: {hideOptions?: boolean}) {
  const res = await auth()
  return (
    <>
      {/* <MobileGenderButtons /> */}
    <header className="border-b flex max-h-max items-end flex-col w-full bg-white relative">
      <div className="container  top-0  mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-red-600">
          TrendIQ
        </Link>
         
        <RightSideNavbar>
          <GenderToggle />
         
          {
            (res?.user && !hideOptions) ? <>
            <ProductSearchToggle />
            <Link href="/cart" className='text-gray-600  flex flex-row items-center justify-center  grow md:mx-0.5 mx-1.5 relative'>

            <ShoppingCart size={20} color='#4b5563' />
            <CartCount />
            </Link>
            <Link href="/profile" className='text-gray-600 flex flex-row items-center justify-center grow md:mx-0.5 mx-1.5'>
            <User size={20} color='#4b5563' className='text-gray-600 '/></Link>
            </>: <><ProductSearchToggle /><PublicNavigator /></>
          }
        </RightSideNavbar>
      </div>
      <MobileGenderButtons />
    </header>
    </>
  )
}

