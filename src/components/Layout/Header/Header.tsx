import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import UserDropDown from './UserDropDown'
import { auth } from '@/auth'

export default async function Header() {
  const res = await auth()
  return (
    <header className="border-b bg-white relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-red-600">
          TrendIQ
        </Link>
        <div className="flex-grow mx-4 max-w-xl">
          <Input type="search" placeholder="Search for fashion items..." className="w-full md:inline hidden" />
        </div>
        <nav className="flex items-center gap-4">
          {res?.user   && <Button variant={"ghost"} className='text-red-600 hover:text-red-700 hover:bg-red-50' asChild><Link href="/cart"> <UserPlus className='w-5 h-5 mr-2'/>Cart</Link></Button>}
          {
            res?.user ? <UserDropDown /> : <Button variant={"ghost"} className='text-red-600 hover:text-red-700 hover:bg-red-50' asChild><Link href="/signin"> <UserPlus className='w-5 h-5 mr-2'/>Login</Link></Button>
          }
        </nav>
      </div>
    </header>
  )
}

