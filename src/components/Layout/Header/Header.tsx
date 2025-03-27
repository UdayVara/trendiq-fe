import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import UserDropDown from './UserDropDown'
import { auth } from '@/auth'
import PublicNavigator from './PublicNavigator'

export default async function Header({hideOptions = false}: {hideOptions?: boolean}) {
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
          {(res?.user && !hideOptions)   && <Button variant={"ghost"} className='text-red-600 hover:text-red-700 hover:bg-red-50' asChild><Link href="/cart"> <UserPlus className='w-5 h-5 mr-2'/>Cart</Link></Button>}
          {
            (res?.user && !hideOptions) ? <UserDropDown /> : <PublicNavigator />
          }
        </nav>
      </div>
    </header>
  )
}

