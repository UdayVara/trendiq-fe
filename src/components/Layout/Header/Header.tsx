import Link from 'next/link'
import UserDropDown from './UserDropDown'
import { auth } from '@/auth'
import PublicNavigator from './PublicNavigator'
import GenderToggle from './GenderToggle'
import MobileGenderButtons from './MobileGenderButtons'

export default async function Header({hideOptions = false}: {hideOptions?: boolean}) {
  const res = await auth()
  return (
    <>
      <MobileGenderButtons />
    <header className="border-b bg-white relative">
      <div className="container  top-0  mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-red-600">
          TrendIQ
        </Link>
         
        <nav className="flex items-center gap-2 lg:gap-4">
          <GenderToggle />
         
          {
            (res?.user && !hideOptions) ? <UserDropDown /> : <PublicNavigator />
          }
        </nav>
      </div>
      
    </header>
    </>
  )
}

