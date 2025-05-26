"use client"
import { Button } from '@/components/ui/button'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function PublicNavigator() {
    const url = usePathname()
    
  return (
    <Button variant={"outline"} color='white' className='text-red-600 hover:text-red-700 hover:bg-red-50' asChild><Link href={url?.endsWith("/signin") ? "/signup" : "/signin"}> <UserPlus className='w-5 h-5 mr-2'/>{url?.endsWith("/signin") ? "Signup" : "Login"}</Link></Button>
  )
}

export default PublicNavigator