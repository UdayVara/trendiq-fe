import Link from 'next/link'
import { auth } from '@/auth'
import PublicNavigator from './PublicNavigator'
import GenderToggle from './GenderToggle'
import MobileGenderButtons from './MobileGenderButtons'
import {  ShoppingCart, User } from 'lucide-react'
import { ProductSearchToggle } from './ProductSearchToggle'

export default async function Header({hideOptions = false}: {hideOptions?: boolean}) {
  const res = await auth()
  return (
    <>
      {/* <MobileGenderButtons /> */}
    <header className="border-b flex flex-col w-full bg-white relative">
      <div className="container  top-0  mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-red-600">
          TrendIQ
        </Link>
         
        <nav className="flex items-center gap-2 lg:gap-4">
          <GenderToggle />
         
          {
            (res?.user && !hideOptions) ? <>
            <ProductSearchToggle />
            <Link href="/cart" className='text-gray-600  flex flex-row items-center justify-centergrow md:mx-0.5 mx-1.5'>
            <ShoppingCart size={20} color='#4b5563' /></Link>
            <Link href="/profile" className='text-gray-600 flex flex-row items-center justify-center grow md:mx-0.5 mx-1.5'>
            <User size={20} color='#4b5563' className='text-gray-600 '/></Link>
            </>: <><ProductSearchToggle /><PublicNavigator /></>
          }
        </nav>
      </div>
      <MobileGenderButtons />
    </header>
    </>
  )
}

